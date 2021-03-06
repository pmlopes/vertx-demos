# map-render/server

This demo is made of 3 parts

* map-render - renders png tiles of maps
* map-server - serves the maps using a simple HTTP server
* frontend - a js + npm vert.x frontend

## Build

```
mvn clean install
```

## Run

### Run map-render

```
java -jar map-render/target/map-render-1.0.0-SNAPSHOT-fat.jar --cluster
```

repeat the above as many times as you like...

### Run map-server

```
java -jar map-server/target/map-server-1.0.0-SNAPSHOT-fat.jar --cluster
```

### Run the web frontend

For the frontend we need a running redis server in order to store the
recommendation, for this we can quickly launch an ephemeral redis server
using docker:

```
sudo docker run -p 6379:6379 redis
```

And the just use npm

```
cd frontend
npm start
```

Then open a browser to [http://localhost:8080](http://localhost:8080).