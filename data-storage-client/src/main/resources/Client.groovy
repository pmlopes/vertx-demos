import io.vertx.devoxx.groovy.data.DataStorageService

def service = DataStorageService.createProxy(vertx, "devoxx.places")

service.getAllPlaces({
    /**
     * To implement
     */
  result ->
    if (result.failed()) {
      println "Cannot retrieve the list of places : " + result.cause()
    } else {
      def list = result.result()
      list.each { map -> println map["name"] }
    }
})



