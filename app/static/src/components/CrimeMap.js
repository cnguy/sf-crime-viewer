import React from 'react';
import BaseComponent from './BaseComponent';

let map;
const config = {
    initialLat: 37.7622550270122,
    initialLon: -122.446837820235,
    mapZoomLevel: 13
};

let markers = [];
const api_base_link = 'api/v1/crimes/';

function loadJSON(callback, api_link) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', api_link, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init(api_params, callback) {
    loadJSON(function (response) {
        const data = JSON.parse(response);
        callback(data);
    }, api_base_link + api_params);
}

class CrimeMap extends BaseComponent {
    renderMap(data) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: config.mapZoomLevel,
            center: new google.maps.LatLng(config.initialLat, config.initialLon),
        });

        for (let crime of data) {
            markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(
                    crime.location.latitude,
                    crime.location.longitude
                ),
                title: crime.category
            }));
        }

        const markerCluster = new MarkerClusterer(map, markers, {
            gridSize: 100,
            minimumClusterSize: 5,
            imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
        });
    }

    componentDidMount() {
        init('', this.renderMap);
    }

    render() {
        // Clear markers. and reset markers[].
        for (let marker of markers) {
            marker.setMap(null);
        }
        markers = [];

        // Logic for determining what api endpoint to use.
        let api_params = '';

        if (this.props.data.year != 'all') {
            // my api <= year -> category
            api_params += 'years/' + this.props.data.year;

            if (this.props.data.category != 'all') {
                api_params += '/categories/' + this.props.data.category;
            }
        } else if (this.props.data.category != 'all') {
            api_params += 'categories/' + this.props.data.category;
        }

        init(api_params, this.renderMap);

        const style = {
            width: "100vw",
            height: "100vh"
        };
        
        return (
            <div id="map" style={style}></div>
        );
    }
}

export default CrimeMap;