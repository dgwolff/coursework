// Google Maps code //

var map;

function initialize() {
  var mapOptions = {
    zoom: 12
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var marker = new google.maps.Marker({
        map: map,
        position: pos,
        title: 'My location'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Your location could not be found';
  } else {
    var content = 'Your browser doesn\'t support geolocation';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(-37.813761, 144.963335),
    content: '<div class="scrollfix">'+ content + '</div>'
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


// Foursquare code //

//Need to take lat & long from geolocation and feed into API request
var latitude = -37.813761;
var longitude = 144.963335;
var ll = latitude + "," + longitude;

//Returns recommended "burger joint" venues
$.getJSON("https://api.foursquare.com/v2/venues/explore", {
  ll: ll,
  radius: 1000,
  query: "burger joint",
  limit: 20,
  time: "any",
  day: "any",
  client_id: "IWVYEGXHSXRTHD3YH432S4V3UGM1CJ1MGLA5Y4BFMISO4IFW",
  client_secret: "EXG1Z3AT2AVHD30FUHVH32AFODU3ZIBUIVBV2FHRWP0KG5UX",
  v: 20152001
}).done(function(data) {
  $.each(data.response.groups, function(i, item) {
      console.log(item);
  });
});

//Returns all venues in the "burgers" category
/*
$.getJSON("https://api.foursquare.com/v2/venues/search", {
  ll: ll,
  radius: 1000,
  limit: 20,
  intent: "browse",
  categoryId: "4bf58dd8d48988d16c941735",
  client_id: "IWVYEGXHSXRTHD3YH432S4V3UGM1CJ1MGLA5Y4BFMISO4IFW",
  client_secret: "EXG1Z3AT2AVHD30FUHVH32AFODU3ZIBUIVBV2FHRWP0KG5UX",
  v: 20152001
}).done(function(data) {
  $.each(data.response.venues, function(i, item) {
      console.log(item);
  });
});
*/

