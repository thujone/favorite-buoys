import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

// Various GMaps marker attributes. Some styles are dynamically generated.
const markerWidth = 22;
const markerHeight = 22;
const buoyMarkerStyle = {
    width: markerWidth,
    height: markerHeight,
    left: -markerWidth / 2,
    top: -markerHeight / 2,
    borderRadius: markerHeight
};

// The GMaps <BuoyMap /> contains many <BuoyMarkers />.
const BuoyMarker = React.createClass({

    // Replace this event handler with the "pure" render version
    shouldComponentUpdate: function() {
        return shouldPureComponentUpdate;
    },

    // A <BuoyMarker /> is really just a styled <div> dropped on a GMap.
    render: function() {
        return (
            <div className="marker" style={buoyMarkerStyle}>
                {this.props.text}
            </div>
        );
    }
});

module.exports = BuoyMarker;