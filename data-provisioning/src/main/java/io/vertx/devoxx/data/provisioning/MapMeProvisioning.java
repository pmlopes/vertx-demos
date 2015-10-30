package io.vertx.devoxx.data.provisioning;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpClient;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.devoxx.data.Place;
import io.vertx.ext.mongo.MongoClient;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * @author <a href="http://escoffier.me">Clement Escoffier</a>
 */
public class MapMeProvisioning {

  private final Vertx vertx;
  private final String mongoURL;

  public static void main(String[] args) {
    if (args.length > 1) {
      System.err.println("Only one argument expected (the mongo connection string)");
    }
    if (args.length == 0) {
      new MapMeProvisioning("mongodb://localhost:27017").provision();
    } else {
      new MapMeProvisioning(args[0]).provision();
    }
  }

  public MapMeProvisioning(String url) {
    vertx = Vertx.vertx();
    mongoURL = url;
  }

  private void provision() {
    HttpClient client = vertx.createHttpClient();
    client.getNow(80, "mapme.com", "/api/map/910f1efe-d403-481e-a87e-bd8c9df7a131/places", response ->
        response.bodyHandler(body -> {
              JsonObject json = new JsonObject(body.toString("UTF-8"));
              extractPlaces(json, this::populateDatabase);
            }
        )
    );
  }

  private void populateDatabase(Collection<Place> places) {
    MongoClient mongo = MongoClient.createShared(vertx,
        new JsonObject().put("db_name", "places").put("connection_string", mongoURL),
        "places");

    places.stream().forEach(place ->
        mongo.insert("places", place.toJson(), result -> {
          if (result.failed()) {
            System.err.println("I was not able to insert '" + place.getName() + "' : " + result.cause().getMessage());
          } else {
            System.out.println("Place '" + place.getName() + "' inserted");
          }
        }));
  }

  private void extractPlaces(JsonObject json, Handler<Collection<Place>> resultHandler) {
    Map<String, Place> placesByName = new HashMap<>();
    JsonObject categories = json.getJsonObject("categories");
    categories.stream().forEach(entry -> {
      System.out.println("New category: " + entry.getKey());
      String category = entry.getKey();
      JsonObject cat = (JsonObject) entry.getValue();
      JsonObject tags = cat.getJsonObject("tags");
      tags.stream().forEach(tagEntry -> {
        String tag = tagEntry.getKey();
        JsonArray places = ((JsonObject) tagEntry.getValue()).getJsonArray("places");
        places.stream().forEach(p -> {
          Place place = createPlace((JsonObject) p, tag, category);
          if (placesByName.containsKey(place.getName())) {
            placesByName.get(place.getName()).addTag(tag);
          } else {
            placesByName.put(place.getName(), place);
          }
        });
      });
    });

    resultHandler.handle(placesByName.values());
  }

  private Place createPlace(JsonObject json, String tag, String category) {
    Place place = new Place();
    return place
        .setAddress(json.getString("addressDisplay", ""))
        .setCategory(category)
        .setDescription(json.getString("description", ""))
        .setLatitude(json.getDouble("lat", -1.0))
        .setLongitude(json.getDouble("lon", -1.0))
        .setName(json.getString("companyName"))
        .setTags(Collections.singletonList(tag));
  }
}