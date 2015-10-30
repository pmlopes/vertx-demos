import io.vertx.devoxx.groovy.data.DataStorageService

def service = DataStorageService.createProxy(vertx, "devoxx.places")

service.getPlacesForTag("Bier", {
  result ->
    if (result.failed()) {
      println "Cannot retrieve the list of place : " + result.cause()
    } else {
      println result.result();
    }
})



