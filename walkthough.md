


# Step 1 - Data Storage Service
 
== Compilation
 
```
cd data-storage-service
mvn clean install docker:build
```

== Execution

```
docker run --name some-mongo -d -p 27017:27017 mongo
docker run -d --link some-mongo:mongo vertx-devoxx/data-storage-service
```

# Step 2 - Initial Provisioning

== Compilation

```
cd ..
cd data-provisioning
mvn clean package
```

== Execution

Edit the `src/main/conf/config.json`:

* `localhost` on linux
* the docker machine IP on mac


```
java -jar target/data-provisioning-1.0-SNAPSHOT-fat.jar --conf src/main/conf/config.json
```

`CTRL+C` when done.

## Bonus

1. Download RoboMongo (http://robomongo.org/)
2. Connect to mongo
3. Visualize the imported data (places - Collections - double click on places)

# Step 3 - First service client

This step uses Groovy and just displays the list of stored places using the event bus service.

== Compilation

```
cd ..
cd data-storage-client
mvn clean package docker:build
```

== Execution

```
docker run -t -i vertx-devoxx/data-storage-client
```

# Step 4 - Map Renderer Service

Let's look in the engine... Not a proxy service but deal directly with the event bus.

== Compilation

```
cd ..
cd map-render-service
mvn clean package docker:build
```

== Execution

```
docker run -d vertx-devoxx/map-render-service
```

# Step 5 - Map Server

== Compilation

```
cd ..
cd map-server
mvn clean package docker:build
```

== Execution

```
docker run 


