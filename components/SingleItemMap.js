import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={props.markers[0].position}
    onClick={props.onMapClick}
  >
  	{props.markers.map(marker => (
      <Marker key={ marker.key }
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class SingleItemMap extends Component {

	handleMapLoad = this.handleMapLoad.bind(this);

	handleMapLoad(map) {
		this._mapComponent = map;
		if (map) {
		  console.log(map.getZoom());
		}
	}

	render() {
		let location = this.props.item.location.split(',')
		let position = { lat: Number(location[0]), lng: Number(location[1]) }
		return(
			<GettingStartedGoogleMap
	            containerElement={
	              <div id="singleListingMap" />
	            }
	            mapElement={
	              <div style={{ height: `100%` }} />
	            }
	            onMapLoad={this.handleMapLoad}
	            markers={[
					{
						position: position,
						key: this.props.item._id,
					}
				]}
	            defaultCenter={this.props.item.location}
	          />
		)
	}
}



