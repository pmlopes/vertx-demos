/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

package io.vertx.devoxx.groovy.recommendation;
import groovy.transform.CompileStatic
import io.vertx.lang.groovy.InternalHelper
import io.vertx.core.json.JsonObject
import io.vertx.groovy.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.AsyncResult
import io.vertx.core.Handler
/**
 * @author <a href="mailto:plopes@redhat.com">Paulo Lopes</a>
*/
@CompileStatic
public class RecommendationService {
  private final def io.vertx.devoxx.recommendation.RecommendationService delegate;
  public RecommendationService(Object delegate) {
    this.delegate = (io.vertx.devoxx.recommendation.RecommendationService) delegate;
  }
  public Object getDelegate() {
    return delegate;
  }
  public static RecommendationService createProxy(Vertx vertx, String address) {
    def ret= InternalHelper.safeCreate(io.vertx.devoxx.recommendation.RecommendationService.createProxy((io.vertx.core.Vertx)vertx.getDelegate(), address), io.vertx.devoxx.groovy.recommendation.RecommendationService.class);
    return ret;
  }
  public void vote(String name, boolean plus, Handler<AsyncResult<Void>> resultHandler) {
    this.delegate.vote(name, plus, resultHandler);
  }
  public void get(String name, Handler<AsyncResult<Map<String, Object>>> resultHandler) {
    this.delegate.get(name, new Handler<AsyncResult<io.vertx.core.json.JsonObject>>() {
      public void handle(AsyncResult<io.vertx.core.json.JsonObject> event) {
        AsyncResult<Map<String, Object>> f
        if (event.succeeded()) {
          f = InternalHelper.<Map<String, Object>>result((Map<String, Object>)InternalHelper.wrapObject(event.result()))
        } else {
          f = InternalHelper.<Map<String, Object>>failure(event.cause())
        }
        resultHandler.handle(f)
      }
    });
  }
}
