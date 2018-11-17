/* API KEY value for airvisual data*/
const AIR_API_KEY = "ENTER KEY HERE";

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

/* store getData */
const myData = {};

/* interface for connecting with API */
var HttpClient = function() {
    this.get = function(aUrl, aCallback, name) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(name, anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send();
    }
}

//function called after getting data from API
var storeData = function(name, data){
  try{
    myData[name] = JSON.parse(data);
    console.log("Data obtained for: " + name);
  } catch(e) {
      if (e instanceof SyntaxError) {
          printError(e, true);
      } else {
          printError(e, false);
      }
  }
}

function createElement(text){
  var div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}

//creates client to work with API
var client = new HttpClient();

//makes API connection w/airvisual API
async function getData(name, lat, lng){
  var url = 'http://api.airvisual.com/v2/nearest_city?lat=' + lat
            + '&lon=' + lng
            + '&key=' + AIR_API_KEY;
  client.get(url, storeData, name);
}

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
  console.log(myData);
}
getAllData();
