'use strict';

/* Controllers */

app.controller('POIListController', function ($scope, eventBus) {


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
  //
  //// connect to the event bus
  //eventBus.open();

  // initialize the POIs
  $scope.pois = [
    {
      "_id": "e04920d9-38d1-455c-a479-6f7d499ab769",
      "additionDate": "2015-09-24T12:58:15.401Z",
      "addressDisplay": "De Keyserlei 25 2018 Antwerpen, Belgium",
      "lon": 4.418202800000017,
      "lat": 51.2175953,
      "companyTags": [
        "Belgian",
        "Beer",
        "Drink",
        "Food",
        "Tasting"
      ],
      "description": "Bier Central is the place to be for real beer lovers. In this typical Belgian beer bar you can taste as many as 24 beers on draft and 300 bottled beers, all from Belgian soil.",
      "companyName": "Bier Central",
      "companyCategory": "Bars",
      "hiringPageURL": null,
      "logoUID": "65ad24d5-e86f-4bc0-b8c7-88f7d8c356b8"
    },
    {
      "_id": "8bdae21c-e52d-4eb2-b51e-fbfda14dec0a",
      "additionDate": "2015-09-24T13:08:42.714Z",
      "addressDisplay": "Hoogstraat 14 2000 Antwerpen, Belgium",
      "lon": 4.398801400000025,
      "lat": 51.2203321,
      "companyTags": [
        "Belgian",
        "Beer",
        "Drink",
        "Food",
        "Tasting"
      ],
      "description": "Little cafes in Antwerp can say they have more than 300 different beers\r\nin house to which 12 of the vessel.\r\nA stone's throw from the Grand Place is a mecca for like-minded people looking for an original beer. The beers are invariably drawn according to the rules of art and bottles served at the tables as it should!",
      "companyName": "'t Antwaerps Bierhuyske",
      "companyCategory": "Bars",
      "hiringPageURL": null,
      "logoUID": "633eeccd-a451-4d92-b5df-d7db0aa55316"
    },
    {
      "_id": "a7c0afc6-7cf7-49f4-88ae-be1863a14c56",
      "additionDate": "2015-09-24T13:28:32.893Z",
      "addressDisplay": "Grote Markt 3 2000 Antwerpen, Belgium",
      "lon": 4.399633399999971,
      "lat": 51.2213576,
      "companyTags": [
        "Belgian",
        "Beer",
        "Drink",
        "Tasting"
      ],
      "description": "Right next to City Hall is the brown bar of Antwerp. This is not just a café but an institution. After the municipal council will regularly exchange their stories here.",
      "companyName": "Den Engel",
      "companyCategory": "Bars",
      "hiringPageURL": null,
      "logoUID": "ac6e9225-a395-41bc-894e-1a665a80571a"
    }
  ];

  // declare helpers
  $scope.showInMap = function (poi) {
    if (marker) {
      marker.setLatLng([poi.lat, poi.lon]);
    } else {
      marker = L.marker([poi.lat, poi.lon]).addTo(map);
    }

    marker.bindPopup("<b>" + poi.companyName + "</b><br />" + poi.addressDisplay).openPopup();
    map.setView([poi.lat, poi.lon], 16);
  }
});