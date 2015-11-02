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
      eb.onopen = function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      };
    },
    send: function (address, message, headers, callback) {
      eb.send(address, message, headers, callback && function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(eb, args);
        });
      });
    },
    publish: function (address, message, headers) {
      eb.send(address, message, headers);
    },
    onerror: function (callback) {
      eb.onerror = function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(eb, args);
          }
        });
      };
    },
    registerHandler: function (address, headers, callback) {
      eb.registerHandler(address, headers, callback && function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(eb, args);
        });
      });
    },
    unregisterHandler: function (adress, headers, callback) {
      eb.unregisterHandler(address, headers, callback && function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(eb, args);
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