# Map Render Verticle

This is a simple demo of a verticle that consumes messages addressed to "map-render" on the eventbus and generates a PNG
tile according to the slippy map spec (e.g.: google maps, openstreepmap, etc...)

In order to speedup the startup a index of a area to render should be created before hand. A index is just a serialized
version of a OSM data extract. see [wiki](http://wiki.openstreetmap.org/wiki/Downloading_data).