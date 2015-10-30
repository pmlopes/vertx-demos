var Router = require("vertx-web-js/router");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);

// Serve the static resources
router.route().handler(StaticHandler.create().handle);

vertx.createHttpServer().requestHandler(router.accept).listen(8080);