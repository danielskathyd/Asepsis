//map global
const GOOGLE_API_KEY = "AIzaSyAyHe7T4ihQEx_jvFqpq2-5qRZ915G0dnE";

//map global variable--might move into initMap function later
//var map;

//var markers = [];

//map coordinates
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

//this function is automatically called when id=map object is created
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
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
       for (var i = 0; i < campuses.length; i++) {
         var campus = campuses[i];
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

        });
     }
   }
