package io.vertx.devoxx.data.impl;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.DeploymentOptions;
import io.vertx.devoxx.data.DataStorageService;
import io.vertx.serviceproxy.ProxyHelper;

public class DataStorageVerticle extends AbstractVerticle {

  private DataStorageServiceImpl service;

  @Override
  public void start() throws Exception {
    service = new DataStorageServiceImpl(vertx, config());
    ProxyHelper.registerService(DataStorageService.class, vertx, service, "devoxx.places");
  }

  @Override
  public void stop() throws Exception {
    service.close();
  }
}
