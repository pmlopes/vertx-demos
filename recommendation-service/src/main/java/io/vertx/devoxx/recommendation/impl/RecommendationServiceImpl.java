package io.vertx.devoxx.recommendation.impl;

import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.devoxx.recommendation.RecommendationService;
import io.vertx.redis.RedisClient;

/**
 * @author <a href="mailto:plopes@redhat.com">Paulo Lopes</a>
 */
public class RecommendationServiceImpl implements RecommendationService {

  private final RedisClient redis;

  public RecommendationServiceImpl(Vertx vertx, JsonObject config) {
    this.redis = RedisClient.create(vertx, config);
  }

  @Override
  public void vote(String name, boolean plus, Handler<AsyncResult<JsonObject>> handler) {
    redis.hincrby(name, plus ? "up" : "down", 1, hincrby -> {
      if (hincrby.failed()) {
        handler.handle(Future.failedFuture(hincrby.cause()));
      } else {
        redis.hgetall(name, hgetall -> {
          if (hgetall.failed()) {
            handler.handle(Future.failedFuture(hgetall.cause()));
          } else {
            JsonObject result = hgetall.result();
            if (result == null) {
              result = new JsonObject();
            }
            handler.handle(Future.succeededFuture(result.put("name", name)));
          }
        });
      }
    });
  }

  @Override
  public void get(String name, Handler<AsyncResult<JsonObject>> handler) {
    redis.hgetall(name, hgetall -> {
      if (hgetall.failed()) {
        handler.handle(Future.failedFuture(hgetall.cause()));
      } else {
        JsonObject result = hgetall.result();
        if (result == null) {
          result = new JsonObject();
        }
        handler.handle(Future.succeededFuture(result.put("name", name)));
      }
    });
  }

  public void close() {
    redis.close(v -> {});
  }
}