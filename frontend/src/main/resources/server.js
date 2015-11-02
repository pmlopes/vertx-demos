var RedisClient = require('vertx-redis-js/redis_client');
var Router = require('vertx-web-js/router');
var SockJSHandler = require('vertx-web-js/sock_js_handler');
var StaticHandler = require('vertx-web-js/static_handler');
var DataStorageService = require('devoxx-workshop-js/data_storage_service');
var RecommendationService = require('devoxx-workshop-js/recommendation_service');

// the event bus
var eb = vertx.eventBus();

// create a http router
var router = Router.router(vertx);

// create a redis connection
var redis = RedisClient.create(vertx, {host: 'localhost'});

// create services
var store = DataStorageService.createProxy(vertx, 'devoxx.places');
var recommendation = RecommendationService.createProxy(vertx, 'devoxx.recommendations');

// Allow events for the designated addresses in/out of the event bus bridge
var opts = {
  inboundPermitteds:  [
    {address: 'poi.recommendation.vote'},
    {address: 'poi.recommendation.load'}
  ],
  outboundPermitteds: [
    {address: 'poi.recommendation'}
  ]
};

// Register to listen for messages coming IN to the server
eb.consumer('poi.recommendation.vote').handler(function (message) {

  var body = message.body();

  recommendation.vote(body.name, body.thumbs, function(res, err) {
    if (!err) {
      eb.publish('poi.recommendation', res);
    }
  });
});

// Register to listen for messages coming IN to the server
eb.consumer('poi.recommendation.load').handler(function (message) {

  var body = message.body();

  console.log('>' + JSON.stringify(body));

  recommendation.get(body.name, function(res, err) {
    console.log('<' + JSON.stringify(res));

    if (!err) {
      message.reply(res);
    }
  });
});

// Create the event bus bridge and add it to the router.
router.route('/eventbus/*').handler(SockJSHandler.create(vertx).bridge(opts).handle);

// handle request to places
router.get('/places').handler(function (ctx) {
  store.getAllPlaces(function (res, err) {
    if (err) {
      ctx.fail(err);
    } else {
      ctx.response().putHeader('Content-Type', 'application/json').end(JSON.stringify(res));
    }
  })
});

// Serve the static resources
router.route().handler(StaticHandler.create().handle);

vertx.createHttpServer().requestHandler(router.accept).listen(8080);