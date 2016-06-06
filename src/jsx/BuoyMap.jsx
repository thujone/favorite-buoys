import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import {render} from 'react-dom';
import BuoyMarker from './BuoyMarker.jsx';

// Some default properties required by Google Maps.
const defaultProps = {
    center: { lat: 42.4, lng: -71 },
    zoom: 6,
    options: {
        scrollwheel: false
    },
    bootstrapUrlKeys: {
        key: 'AIzaSyD5A61YYCBDPCVJC9NtjlLkC2WcIRPd2D8'
    }
};

// A Google Maps <BuoyMap /> contains many <BuoyMarkers />.
const BuoyMap = React.createClass({

    // Replace ths event with the "pure" render version, which will pick up on Marker events.
    shouldComponentUpdate: function() {
        return shouldPureComponentUpdate;
    },

    // Render a <GoogleMap /> component, which will contain a bunch
    // of <BuoyMarker /> markers for faved buoys.
    render: function() {
        let faveBuoyData = this.props.faveBuoyData;
        let faveMarkers = [];

        if (faveBuoyData.length > 0) {
            faveMarkers = faveBuoyData.map(function(item) {
                return (
                    <BuoyMarker
                        key  = {item.guid}
                        lat  = {item.lat}
                        lng  = {item.long}
                        text = {item.label}
                    > </BuoyMarker>
                )
            });
        }

        return (
            <div id="buoy-map">
                <GoogleMap
                    bootstrapURLKeys = {defaultProps.bootstrapUrlKeys}
                    defaultCenter    = {defaultProps.center}
                    defaultZoom      = {defaultProps.zoom}
                    options          = {defaultProps.options}
                >
                    {faveMarkers}
                </GoogleMap>
            </div>
        );
    }
});

module.exports = BuoyMap;