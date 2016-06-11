import React from 'react'
import Buoy from './Buoy.jsx';


// A <BuoyList /> is a <table> that contains rows of <Buoy /> data.
// Users can check their favorite buoys, and this data is persisted through cookies.
const BuoyList = React.createClass({

    // Persist the user's most recent faved buoy's GUID.
    // This GUID is used to notify the parent so the map can be updated to reflect the new faved buoy.
    getInitialState: function() {
        return {
            guid: ''
        }
    },

    // Handler that updates state with the current faved buoy's GUID.
    handleFaveChange: function(guid) {
        this.props.onFaveChange(guid);
        this.setState({ guid: guid});
    },

    // Render a <table> containing all the buoys listed in the RSS feed.
    render: function() {
        let buoyNodes = this.props.buoyData.map((buoy) => {
            return (
                <Buoy
                    buoy = {buoy}
                    key  = {buoy.guid}
                    onFaveChange = {this.handleFaveChange}
                />
            );
        });

        return (
            <div id="buoy-list">
                <table id="buoy-list-table">
                    <thead>
                        <tr>
                            <th className="th-name">Name</th>
                            <th className="th-latitude">Lat</th>
                            <th className="th-longitude">Long</th>
                            <th className="th-fave">Fave</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buoyNodes}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = BuoyList;
