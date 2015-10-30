var RedisClient = require('vertx-redis-js/redis_client');
var Router = require('vertx-web-js/router');
var SockJSHandler = require('vertx-web-js/sock_js_handler');
var StaticHandler = require('vertx-web-js/static_handler');

// the event bus
var eb = vertx.eventBus();

// create a http router
var router = Router.router(vertx);

// create a redis connection
var redis = RedisClient.create(vertx, {host: 'localhost'});

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

  redis.hincrby(body._id, body.thumbs ? 'up' : 'down', 1, function(res, err) {
    if (!err) {
      redis.hgetall(body._id, function(res, err) {
        if (!err) {
          res._id = body._id;
          eb.publish('poi.recommendation', res);
        }
      });
    }
  });
});

// Register to listen for messages coming IN to the server
eb.consumer('poi.recommendation.load').handler(function (message) {

  var body = message.body();

  redis.hgetall(body._id, function(res, err) {
    if (!err) {
      res._id = body._id;
      message.reply(res);
    }
  });
});

// Create the event bus bridge and add it to the router.
router.route('/eventbus/*').handler( SockJSHandler.create(vertx).bridge(opts).handle);

// Serve the static resources
router.route().handler(StaticHandler.create().handle);

vertx.createHttpServer().requestHandler(router.accept).listen(8080);