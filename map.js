var defCenter = [0, 0];
var dataSource = 'test.geojson';
var tileLayer = 'BASEMAP_URL';

var map = L.map('map').setView(defCenter, 13);
L.tileLayer(tileLayer, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://mapbox.com">Mapbox</a>'
        }).addTo(map);

var points = null;
var activePoint = 0;

function flipCoordinates(x) {return [x[1], x[0]];}

function gotoPoint(i) {
    if (i < 0) {
        i = 0;
    } else if (i > points.length - 1) {
        i = points.length - 1;
    }

    map.flyTo(flipCoordinates(points[i].geometry.coordinates));

    $("#title").text(points[i].properties.title);
    $("#description").html(points[i].properties.description);

    activePoint = i;
}

function gotoNext() {gotoPoint(activePoint + 1);}
function gotoPrev() {gotoPoint(activePoint - 1);}

$.ajax({
    dataType: 'json',
    url: dataSource,
    success: function(data) {
        points = data.features;
        var dataLayer = new L.geoJson(data).addTo(map);

        var coords = points.map(function(x) { return flipCoordinates(x.geometry.coordinates) });
        var line = new L.polyline(coords, {
            color: 'black',
            weight: 3
        }).addTo(map);

        // TODO: clicking on marker goes to point

        // fly to first point in set
        gotoPoint(activePoint);
    },
    error: function() {
        console.error("Couldn't load data layer from " + dataSource);
    }
});

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // left
            gotoPrev();
            break;
        case 39:
            // right
            gotoNext();
            break;
    }
};
