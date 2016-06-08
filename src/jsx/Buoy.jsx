import React from 'react';
import ReactCookie from 'react-cookie';

const maxCookieAge = 1000000;

// A <BuoyList /> contains many <Buoys />. The buoy list is rendered as tabular data.
const Buoy = React.createClass({

    // Store a buoy fave in state, so it can be bubbled up to the grandparent for rendering on the map.
    getInitialState: function() {
        return {
            fave: this.props.buoy.fave
        }
    },

    // If the fave checkbox has been changed, add/remove the appropriate cookie and set the fave in state.
    handleFaveChange: function(event) {
        let checked = event.target.checked,
            buoy = this.props.buoy;

        if (checked) {
            ReactCookie.save(buoy.guid, 'faved', { path: '/', maxAge: maxCookieAge });
        } else {
            ReactCookie.remove(buoy.guid, { path: '/' });
        }

        // Notify the parent of the fave change.
        this.props.onFaveChange(buoy.guid);
        this.setState({ fave: checked });
    },

    // A <Buoy /> is really a row in the <BuoyList /> table.
    render: function() {
        let buoy = this.props.buoy;
        return (
            <tr className={this.state.fave ? 'checked' : ''} key={buoy.guid}>
                <td className="td-name">
                    {buoy.num}.
                    &nbsp;
                    <a href={buoy.link} target="_blank">{buoy.name}</a>
                </td>
                <td className="td-lat">{buoy.lat}</td>
                <td className="td-long">{buoy.long}</td>
                <td className="td-fave">
                  <input type = "checkbox"
                         name = {buoy.guid}
                         value = "true"
                         checked = {this.state.fave}
                         onChange = {this.handleFaveChange}
                  />
                </td>
            </tr>
        )
    }
});

module.exports = Buoy;
