'use strict';

/* Controllers */

app.controller('POIListController', function ($scope, $http, eventBus) {


  // place map in antwerpen center
  var map = L.map('map').setView([51.21796, 4.42079], 13);
  var marker;

  L.tileLayer('http://localhost:8000/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }).addTo(map);


  //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
  //  maxZoom: 18,
  //  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  //  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  //  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //  id: 'mapbox.streets'
  //}).addTo(map);

  // initialize the POIs
  $scope.pois = [];

  // connect to the event bus
  eventBus.open(function () {
    // request the resource from the server
    $http.get('http://localhost:8080/places').success(function (data) {
      // load recommendations
      data.forEach(function (el) {
        $scope.pois.push(el);
        eventBus.send('poi.recommendation.load', {_id: el._id}, {}, function (err, msg) {
          if (!err) {
            $scope.pois.filter(function (val) {
              return val._id === msg.body._id;
            }).forEach(function (el) {
              el.thumbsUp = msg.body.up || el.thumbsUp;
              el.thumbsDown = msg.body.down || el.thumbsDown;
              el.thumbs = (el.thumbsUp || 0) - (el.thumbsDown || 0);
            });
          }
        });
      });

      eventBus.registerHandler('poi.recommendation', {}, function (err, msg) {
        if (!err) {
          $scope.pois.filter(function (val) {
            return val._id === msg.body._id;
          }).forEach(function (el) {
            el.thumbsUp = msg.body.up || el.thumbsUp;
            el.thumbsDown = msg.body.down || el.thumbsDown;
            el.thumbs = (el.thumbsUp || 0) - (el.thumbsDown || 0);
          });
        }
      });
    });
  });

  // declare helpers
  $scope.showInMap = function (poi) {
    if (marker) {
      marker.setLatLng([poi.latitude, poi.longitude]);
    } else {
      marker = L.marker([poi.latitude, poi.longitude]).addTo(map);
    }

    marker.bindPopup("<b>" + poi.name + "</b><br />" + poi.address).openPopup();
    map.setView([poi.latitude, poi.longitude], 16);
  };

  $scope.thumbs = function (poi, up) {
    eventBus.send('poi.recommendation.vote', {_id: poi._id, thumbs: up});
  };
});