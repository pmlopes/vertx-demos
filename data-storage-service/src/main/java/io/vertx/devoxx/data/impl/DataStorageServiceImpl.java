package io.vertx.devoxx.data.impl;

import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.devoxx.data.DataStorageService;
import io.vertx.devoxx.data.Place;
import io.vertx.ext.mongo.MongoClient;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author <a href="http://escoffier.me">Clement Escoffier</a>
 */
public class DataStorageServiceImpl implements DataStorageService {

  public static final String COLLECTION = "places";
  private final MongoClient mongo;

  public DataStorageServiceImpl(Vertx vertx, JsonObject config) {
    this.mongo = MongoClient.createShared(vertx, config, "places");
  }

  @Override
  public void getAllPlaces(Handler<AsyncResult<List<Place>>> resultHandler) {
    /**
     * To be implemented.
     */
    mongo.find(COLLECTION, new JsonObject(), ar -> {
      if (ar.failed()) {
        resultHandler.handle(Future.failedFuture(ar.cause()));
      } else {
        List<Place> places = ar.result().stream().map(Place::new).collect(Collectors.toList());
        resultHandler.handle(Future.succeededFuture(places));
      }
    });
  }

  @Override
  public void getPlacesForCategory(String category, Handler<AsyncResult<List<Place>>> resultHandler) {
    mongo.find(COLLECTION, new JsonObject().put("category", category), ar -> {
      if (ar.failed()) {
        resultHandler.handle(Future.failedFuture(ar.cause()));
      } else {
        List<Place> places = ar.result().stream().map(Place::new).collect(Collectors.toList());
        resultHandler.handle(Future.succeededFuture(places));
      }
    });
  }

  @Override
  public void getPlacesForTag(String tag, Handler<AsyncResult<List<Place>>> resultHandler) {
    /**
     * To be implemented.
     */
    mongo.find(COLLECTION, new JsonObject().put("tags", tag), ar -> {
      if (ar.failed()) {
        resultHandler.handle(Future.failedFuture(ar.cause()));
      } else {
        List<Place> places = ar.result().stream().map(Place::new).collect(Collectors.toList());
        resultHandler.handle(Future.succeededFuture(places));
      }
    });
  }

  @Override
  public void addPlace(Place place, Handler<AsyncResult<Void>> resultHandler) {
    /**
     * To be implemented.
     */
    mongo.insert(COLLECTION, place.toJson(), s -> {
      if (s.failed()) {
        resultHandler.handle(Future.failedFuture(s.cause()));
      } else {
        resultHandler.handle(Future.succeededFuture());
      }
    });
  }

  public void close() {
    mongo.close();
  }
}
