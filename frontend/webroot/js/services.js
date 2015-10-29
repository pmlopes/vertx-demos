'use strict';

/* Services */

/**
 * EvenBus Service wraps the eventbus api in a  angularJS friendly way
 */
app.factory('eventBus', function ($rootScope) {

  var eb = null;

  return {
    open: function (callback) {
      eb = new EventBus(window.location.protocol + '//' + window.location.host + '/eventbus');
      eb.onopen(function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      });
    },
    send: function (address, message, headers, callback) {
      eb.send(address, message, headers, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      });
    },
    publish: function (address, message, headers) {
      eb.send(address, message, headers);
    },
    onerror: function (callback) {
      eb.onerror(function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      });
    },
    registerHandler: function (callback) {
      eb.registerHandler(function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      });
    },
    unregisterHandler: function (callback) {
      eb.unregisterHandler(function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      });
    },
    close: function (callback) {
      eb.close(function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      });
    }
  };
});