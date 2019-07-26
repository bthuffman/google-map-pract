function myTest() {
  alert('Welcome to custom js');
}

var map;
var service;
var infowindow;

function initMap() {
  //assigning the starting location to Albuqeurque
  var albuquerque = new google.maps.LatLng(35.096887, -106.654439);
  // console.log("initMap is here");
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: albuquerque, zoom: 15});

   var request = {
    location: albuquerque,
    radius: '50000',
    type: ['restaurant']
  };

   service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let randomNumber = getRandomInt(10);
// console.log(randomNumber);

let place = results[randomNumber];
createMarker(results[randomNumber]);

  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

$(function() {
  alert('Hello, custom js');
});

// const googleMapsScript = document.createElement('script');
// googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDOkdAi3ANRGBDqXWXaaliEJlLLm1I9h0&callback=initMap';
// document.head.appendChild(googleMapsScript);