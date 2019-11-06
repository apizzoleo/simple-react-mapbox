import React,{Component} from 'react';
import MapGL,{Source, Layer}  from 'react-map-gl';
import _ from "lodash";
// import MapGL  from 'react-map-gl';
import {request,json as requestJson} from 'd3-request';
import { stopLayer, lineLayer, dataLayer, imgLayer, modDataLayer } from './map-style';
// import {fromJS} from 'immutable';

// const dataLayer = fromJS({
//     version: 8,
//     sources: {
//         points: {
//             type: 'geojson',
//             data: {
//               "type": "FeatureCollection",
//               "features": [
//                   {
//                       "type": "Feature",
//                       "properties": {
//                           "level": 3
//                       },
//                       "geometry": {
//                           "type": "Point",
//                           "coordinates": [
//                               12.500381469726562,
//                               41.91709605960302
//                           ]
//                       }
//                   },
//                   {
//                       "type": "Feature",
//                       "properties": {
//                           "level":4
//                       },
//                       "geometry": {
//                           "type": "Point",
//                           "coordinates": [
//                               12.520122528076172,
//                               41.91147545749747
//                           ]
//                       }
//                   },
//                   {
//                       "type": "Feature",
//                       "properties": {
//                           "level":5
//                       },
//                       "geometry": {
//                           "type": "Point",
//                           "coordinates": [
//                               12.504158020019531,
//                               41.89371621291292
//                           ]
//                       }
//                   }
//               ]
//           }
//         }
//     },
//     layers: [
//         {
//             id: 'my-layer',
//             type: 'circle',
//             source: 'points',
//             paint: {
//                 'circle-color': '#f00',
//                 'circle-radius': 4
//             }
//         }
//     ]
// });

const svgPathToImage = ({ path, width, height }) => {
  // debugger;
  // return new Promise(resolve => {
  //   const image = new Image(width, height);
  //   image.addEventListener('load', () => resolve(image));
  //   image.src = path;
  // })
  const image = new Image(width, height);
  image.src = path;
  return image;
};

// This does a lookup of the symbol's name to find its string value
const symbolAsInlineImage = ({ name, width, height }) =>
  svgPathToImage({ path: 'images:image/svg+xml;charset=utf-8;base64,' + btoa(name), width, height });

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state =  {
      loadImage: false,
      // insert your mapbox token
      mapboxApiAccessToken: 'pk.eyJ1IjoiYXBpenpvbGVvIiwiYSI6ImNqbWtkd240eTBhOXQza21taTJhcW9hbWgifQ.uMey3ZGAytPjd4x-94Osxg',
      data: null,
      viewport: {
        latitude: 41.8919300,
        longitude: 12.5113300,
        zoom: 8,
        bearing: 0,
        pitch: 0
      },
      layers:{
        spLayer: stopLayer,
        lnLayer: lineLayer
      },
      hoveredFeature: null
    };

    this._loadData = this._loadData.bind(this);
    this._loadMap = this._loadMap.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onHover = this._onHover.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
  }

  componentDidMount() {
    requestJson('data/network7391.geojson', (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
  }

  _loadData = data => {
    this.setState({data});
  };

  _loadMap = () => {

  }

  _onClick(event) {
    // either
    const featureLines = event.features.find(f => f.layer.id === 'line-layer');
    const featureStop = event.features.find(f => f.layer.id === 'stop-layer');
    // or
    // const point = [event.center.x, event.center.y];
    // const feature = this.mapRef.queryRenderedFeatures(point, { layers: ['clusters'] })[0];

    if (featureLines || featureStop) {
      // look up cluster expansion zoom

      const lineRef = featureLines.properties.lineRef;
      const { layers:{spLayer,lnLayer} } = this.state;

      _.set(lnLayer,'filter',['==','lineRef',lineRef]);
      _.set(spLayer,'filter',['==','lineRef',lineRef]);

      this.setState({layers:{lnLayer,spLayer}})

    }
    else {
      const { layers:{spLayer,lnLayer} } = this.state;
      _.unset(lnLayer,'filter');
      _.unset(spLayer,'filter');
      this.setState({layers:{lnLayer,spLayer}})
    }
  }
  _onHover = event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'line-layer');
    if(hoveredFeature) debugger;
    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>LineRef: {hoveredFeature.properties.lineRef}</div>
        </div>
      )
    );
  }
  render() {
    // const { mapboxApiAccessToken,data } = this.state;

    const { mapboxApiAccessToken,data,loadImage,layers:{spLayer,lnLayer}} = this.state;

    return (
      <div id="map">
      <MapGL
        ref={this.map}
        interactiveLayerIds={['stop-layer','line-layer']}
        onLoad={this._loadMap}
        onClick={this._onClick}
        onHover={this._onHover}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle="mapstyle/basic-v9.json"
        {...this.state.viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => this.setState({viewport})}>
            <Source type="geojson" data={data}>
               <Layer {...spLayer} />
               <Layer {...lnLayer} />
           </Source>
           {this._renderTooltip()}
      </MapGL>
      </div>
    );
  }
}