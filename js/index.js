/* API KEY value for breezometer data*/
const BREEZE_API_KEY = "b1db2002f7464d81a9707fb36213a0c3";
const GOOGLE_API_KEY = "AIzaSyAyHe7T4ihQEx_jvFqpq2-5qRZ915G0dnE";

/* location constants */
const UCLA_LAT = 34.0689;
const UCLA_LNG = -118.4452;
const UCD_LAT = 38.5382;
const UCD_LNG = -121.7617;
const UCB_LAT = 37.8719;
const UCB_LNG = -122.2585;
const UCI_LAT = 33.6405;
const UCI_LNG = -117.8443;
const UCM_LAT = 37.3642;
const UCM_LNG = -120.4255;
const UCR_LAT = 33.9737;
const UCR_LNG = -117.3281;
const UCSD_LAT = 32.8801;
const UCSD_LNG = -117.2340;
const UCSB_LAT = 34.4208;
const UCSB_LNG = -119.6982;
const UCSC_LAT = 36.9916;
const UCSC_LNG = -122.0583;
//CHANGE BACK TO 9!!!
const NUM_SCHOOLS = 9 ;

//map variables
var valAQI = 0;
var valDescr = "";
var valDomPol = "";

var campuses = [
  ['UCLA', UCLA_LAT, UCLA_LNG, 9],
  ['UCD', UCD_LAT, UCD_LNG, 8],
  ['UCB', UCB_LAT, UCB_LNG, 7],
  ['UCI', UCI_LAT, UCI_LNG, 6],
  ['UCM', UCM_LAT, UCM_LNG, 5],
  ['UCR', UCR_LAT, UCR_LNG, 4],
  ['UCSD', UCSD_LAT, UCSD_LNG, 3],
  ['UCSB', UCSB_LAT, UCSB_LNG, 2],
  ['UCSC', UCSC_LAT, UCSC_LNG, 1],
];

var map;

/* variables */
const myData = {};
var numData = 0;
var obtainedData = false;

/* interface for connecting with API */
var HttpClient = function() {
    this.get = function(aUrl, aCallback, name) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(name, anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send(null);
    }
}

/* function called after getting data from API */
var storeData = function(name, data){
  try{
    temp = JSON.parse(data);
  }catch(e){
    console.log("ERROR: Parsing");
  }
  myData[name] = temp;
  numData++;
  console.log("Data obtained for: "+name);
}

function createElement(text){
  var div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}

/* makes API connection w/airvisual API */
var client = new HttpClient();
async function getData(name, lat, lng){
  var url = 'https://api.breezometer.com/baqi/?lat='+ lat
            + '&lon=' + lng
            + '&key=' + BREEZE_API_KEY;
  await client.get(url, storeData, name);
}

/* get data for all uc campuses */
async function getAllData(){
  await getData('UCLA', UCLA_LAT, UCLA_LNG);
  await getData('UCD', UCD_LAT,UCD_LNG);
  await getData('UCB', UCB_LAT,UCB_LNG);
  await getData('UCI', UCI_LAT,UCI_LNG);
  await getData('UCM', UCM_LAT,UCM_LNG);
  await getData('UCR', UCR_LAT,UCR_LNG);
  await getData('UCSD', UCSD_LAT,UCSD_LNG);
  await getData('UCSB', UCSB_LAT,UCSB_LNG);
  await getData('UCSC', UCSC_LAT,UCSC_LNG);
}

/* pauses execution based on input */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function data(){
  /* wait for all data to be obtained */
  while(!obtainedData){
    if(numData == NUM_SCHOOLS){
      obtainedData = true;
    }
    await sleep(1);
  }
  console.log(myData);
}

//display text on map once a marker is clicked
function displayOnClick(){
  var p = document.getElementById("mapInfo");
  p.style.display = "block";
}

function circColor(aqi) {
  console.log(aqi);
  var p = document.getElementById("circle");
  if (aqi <= 50) {
    p.style.background = "green";
  }
  else if(aqi <= 100) {
    p.style.background = "yellow";
  }
  else if(aqi <= 150) {
    p.style.background = "orange";
  }
  else {
    p.style.background = "red";
  }
}

//this function is automatically called when id=map object is created
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    //location of map center as it starts
    center: {
      lat: 36.011,
      lng: -118.831
    },
    // zoom level (bigger number is more zoomed in)
    zoom: 6,
    // all the styling stuff regarding the map JSON
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      },
      {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#e9bc62"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      },
      {
        "featureType": "road.local",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#b9d3c2"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
      }
    ]
  });
  //creates marker at specified location


   // const icon1: google.maps.Icon = {
   //    anchor: Point(0, 0),
   //    labelOrigin: Point(0,0),
   //    origin: Point(0,0)
   //    scaledSize: Size(10, 10),
   //    size: Size(10, 10),
   //    url: "testic.png"
   // };
   //
   // marker.setIcon(icon1);
   setMarkers(map);


}

function setMarkers(map) {
       // Adds markers to the map.

       // Marker sizes are expressed as a Size of X,Y where the origin of the image
       // (0,0) is located in the top left of the image.

       // Origins, anchor positions and coordinates of the marker increase in the X
       // direction to the right and in the Y direction down.
       var image = {
         url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
         // This marker is 20 pixels wide by 32 pixels high.
         size: new google.maps.Size(20, 32),
         // The origin for this image is (0, 0).
         origin: new google.maps.Point(0, 0),
         // The anchor for this image is the base of the flagpole at (0, 32).
         anchor: new google.maps.Point(0, 32)
       };
       // Shapes define the clickable region of the icon. The type defines an HTML
       // <area> element 'poly' which traces out a polygon as a series of X,Y points.
       // The final coordinate closes the poly by connecting to the first coordinate.
       var shape = {
         coords: [1, 1, 1, 20, 18, 20, 18, 1],
         type: 'poly'
       };

       var campus;
       for (var i = 0; i < campuses.length; i++) {
         campus = campuses[i];
         var newMarker = new google.maps.Marker({
           position: {lat: campus[1], lng: campus[2]},
           map: map,
           icon: image,
           shape: shape,
           title: campus[0],
           zIndex: campus[3]
         });
         //have all the buttons have this effect when clicked
         google.maps.event.addListener(newMarker,'click', function() {
               map.setCenter(this.getPosition());
               map.setZoom(8);
               document.getElementById("insertAQI").innerHTML = myData[this.getTitle()].country_aqi;
               document.getElementById("insertCOND").innerHTML = myData[this.getTitle()].country_description;
               document.getElementById("insertPOL").innerHTML = myData[this.getTitle()].dominant_pollutant_description;
               displayOnClick();
               circColor(myData[this.getTitle()].country_aqi);
         });
     }
   }

getAllData();
data();
