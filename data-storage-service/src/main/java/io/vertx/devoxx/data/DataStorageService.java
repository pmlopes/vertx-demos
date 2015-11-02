package io.vertx.devoxx.data;

import io.vertx.codegen.annotations.ProxyGen;
import io.vertx.codegen.annotations.VertxGen;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.serviceproxy.ProxyHelper;

import java.util.List;

/**
 * Service exposed on the event bus to provide access to
 * the stored Places.
 */
@VertxGen
@ProxyGen
public interface DataStorageService {

  static DataStorageService createProxy(Vertx vertx, String address) {
    return ProxyHelper.createProxy(DataStorageService.class, vertx, address);
  }

  void getAllPlaces(Handler<AsyncResult<List<Place>>> resultHandler);

  void getPlacesForCategory(String category, Handler<AsyncResult<List<Place>>> resultHandler);

  void getPlacesForTag(String tag, Handler<AsyncResult<List<Place>>> resultHandler);

  void addPlace(Place place, Handler<AsyncResult<Void>> resultHandler);
}
