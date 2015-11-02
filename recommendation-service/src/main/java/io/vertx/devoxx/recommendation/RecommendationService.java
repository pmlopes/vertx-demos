package io.vertx.devoxx.recommendation;

import io.vertx.codegen.annotations.ProxyGen;
import io.vertx.codegen.annotations.VertxGen;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.serviceproxy.ProxyHelper;

/**
 * @author <a href="mailto:plopes@redhat.com">Paulo Lopes</a>
 */
@VertxGen
@ProxyGen
public interface RecommendationService {

  static RecommendationService createProxy(Vertx vertx, String address) {
    return ProxyHelper.createProxy(RecommendationService.class, vertx, address);
  }

  void vote(String name, boolean plus, Handler<AsyncResult<JsonObject>> resultHandler);

  void get(String name, Handler<AsyncResult<JsonObject>> resultHandler);
}
