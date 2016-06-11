import React from 'react'
import ReactDOM from 'react-dom';
import ReactCookie from 'react-cookie';
import BuoyList from './BuoyList.jsx';
import BuoyMap from './BuoyMap.jsx';


const buoyRssUrl = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=42.4N&lon=71W&radius=300';
const pollInterval = 300000;  // 5 minutes, which is how often the feed is updated
const maxCookieAge = 1000000; // Cookie expires after x seconds


// Entry point for the Favorite Buoys app.
// Contains two components: BuoyList and BuoyMap.
// The app uses cookies to store the user's favorite buoys.
const FavoriteBuoys = React.createClass({

    // Keep two state arrays. One for all buoys, the other for faved buoys.
    getInitialState: function() {
        return {
            buoyData: [],
            faveBuoyData: []
        };
    },

    // Load buoy data from RSS feed, and refresh every 5 minutes.
    componentDidMount: function() {
        this.loadBuoyData();
        this.buoyDataInterval = setInterval(this.loadBuoyData, this.props.pollInterval);
    },

    // Clean up on unmount.
    componentWillUnmount: function() {
        this.buoyDataRequest.abort();
        clearInterval(this.buoyDataInterval);
    },

    // The get request for buoy data.
    loadBuoyData: function() {
        this.buoyDataRequest = $.get(
            this.props.buoyRssUrl,
            this.handleBuoyDataResponse,
            'xml'
        );
    },

    // Checks if a buoy is already faved. Faved buoys are set as cookies.
    isFaved: function(guid) {
        return ReactCookie.load(guid) == 'faved';
    },

    // Handle the buoy data response.
    handleBuoyDataResponse: function(response) {
        let buoyData = [],
            faveBuoyData = [];

        // Generate the buoyData and favedBuoyData arrays from the annoying RSS values.
        $(response).find('item').each((i, item) => {
            let buoy = $(item);
            let [lat, long] = buoy.find('georss\\:point, point').text().split(' ');
            let guid = buoy.find('guid').text(),
                name = buoy.find('title').text(),
                link = buoy.find('link').text(),
                fave = this.isFaved(guid, i);

            // Push to the buoyData array
            buoyData.push({
                num:  i + 1,
                guid: guid,
                name: name,
                lat:  lat,
                long: long,
                link: link,
                fave: fave
            });

            // Push to the faveBuoyData array
            if (fave) {
                faveBuoyData.push({
                    guid: guid,
                    label: i + 1,
                    lat: lat,
                    long: long
                });
            }
        });

        // Persist the arrays in state.
        this.setState({
            buoyData: buoyData,
            faveBuoyData: faveBuoyData
        });
    },

    // Monitor checkboxes. Either add or remove cookies and members from the persisted arrays.
    handleFaveChange: function(guid) {
        if (!this.isFaved(guid)) {
            ReactCookie.remove(guid, { path: '/' });
            this.removeFaveBuoy(guid);
        } else {
            ReactCookie.save(guid, 'faved', { path: '/', maxAge: maxCookieAge });
            this.addFaveBuoy(guid);
        }
    },

    // Add a fave buoy to the favedBuoyData state array.
    addFaveBuoy: function(guid) {
        let buoy = this.getBuoy(guid);
        let faveBuoyData = this.state.faveBuoyData;
        faveBuoyData.push({
            guid:  buoy.guid,
            label: buoy.num,
            lat:   buoy.lat,
            long:  buoy.long
        });
        this.setState({
            faveBuoyData: faveBuoyData
        });
    },

    // Remove a fave buoy from the favedBuoyData state array.
    removeFaveBuoy: function(guid) {
        let spliceIndex = -1;
        let faveBuoyData = this.state.faveBuoyData;
        faveBuoyData.forEach((item, i) => {
            if (item.guid == guid) {
                spliceIndex = i;
            }
        });
        faveBuoyData.splice(spliceIndex, 1);
        this.setState({
            faveBuoyData: faveBuoyData
        });
    },

    // Get the metadata for one buoy.
    getBuoy: function(guid) {
        let buoyData = this.state.buoyData;
        for (let i = 0; i < buoyData.length; i++) {
            if (buoyData[i].guid == guid) {
                return buoyData[i];
            }
        }
    },

    // Render the <BuoyList> and <BuoyMap> components.
    render: function() {
        return (
            <div id="favorite-buoys">
                <h1>Favorite Buoys</h1>
                <h2>New England</h2>
                <BuoyList
                    buoyData = {this.state.buoyData}
                    onFaveChange = {this.handleFaveChange}
                />
                <BuoyMap
                    faveBuoyData = {this.state.faveBuoyData}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <FavoriteBuoys buoyRssUrl={buoyRssUrl} pollInterval={pollInterval} />,
    document.getElementById('app')
);
