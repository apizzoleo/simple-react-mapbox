import React,{Component} from 'react';
import ReactMapGL from 'react-map-gl';

export default class Map extends Component {

  state = {
    mapboxApiAccessToken: 'pk.eyJ1IjoiYXBpenpvbGVvIiwiYSI6ImNqbWtkd240eTBhOXQza21taTJhcW9hbWgifQ.uMey3ZGAytPjd4x-94Osxg',
    viewport: {
      width: 600,
      height: 400,
      latitude: 41.8919300,
      longitude: 12.5113300,
      zoom: 8
    }
  };

  render() {
    const { mapboxApiAccessToken } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={mapboxApiAccessToken}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}