import React,{Component} from 'react';
import MapGL from 'react-map-gl';

export default class Map extends Component {

  state = {
    // insert your mapbox token
    mapboxApiAccessToken: '',
    viewport: {

      latitude: 41.8919300,
      longitude: 12.5113300,
      zoom: 8
    }
  };

  render() {
    const { mapboxApiAccessToken } = this.state;
    return (
      <div id="map">
      <MapGL
        mapboxApiAccessToken={mapboxApiAccessToken}
        {...this.state.viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => this.setState({viewport})}
      />
      </div>
    );
  }
}