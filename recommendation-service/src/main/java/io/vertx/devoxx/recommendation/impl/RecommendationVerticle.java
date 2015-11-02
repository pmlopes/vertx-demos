package io.vertx.devoxx.recommendation.impl;

import io.vertx.core.AbstractVerticle;
import io.vertx.devoxx.recommendation.RecommendationService;
import io.vertx.serviceproxy.ProxyHelper;

public class RecommendationVerticle extends AbstractVerticle {

  private RecommendationServiceImpl service;

  @Override
  public void start() throws Exception {
    service = new RecommendationServiceImpl(vertx, config());
    ProxyHelper.registerService(RecommendationService.class, vertx, service, "devoxx.recommendations");
  }

  @Override
  public void stop() throws Exception {
    service.close();
  }
}
