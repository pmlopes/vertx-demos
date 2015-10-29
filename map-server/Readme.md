# Map Server Verticle

This is a simple demo of a verticle that serves slippy tile maps. It expects to be deployed on a cluster running the
map-render verticle.

Once 2 verticles are deployed you can request tiles using the format `http://server:port/zoom/x/y.png`