# leaflet-travelogue

leaflet-travelogue is a simple plugin for telling stories with interactive maps using [Leaflet](http://leafletjs.com/).  It reads a GeoJSON file and creates a map with points and accompanying descriptions.

# Setup

The following variables must be set in *map.js*:

- dataSource - the GeoJSON file leaflet-travelogue reads for the map points and accompanying information.  The "title" and "description" properties of each point are used in the sidebar.  [Geojson.io](http://geojson.io/) is a nice tool for building the file.

- tileLayer - URL for the basemap


# Use

Use the Previous/Next buttons or arrow keys to fly through the different points.
