import React,{Component} from 'react';
import MapGL,{Source, Layer}  from 'react-map-gl';
// import MapGL  from 'react-map-gl';
import {request,json as requestJson} from 'd3-request';
import { dataLayer, imgLayer, modDataLayer } from './map-style';
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
      // data: null,
      viewport: {
        latitude: 41.8919300,
        longitude: 12.5113300,
        zoom: 8,
        bearing: 0,
        pitch: 0
      }
    };

    this._loadData = this._loadData.bind(this);
    this._loadMap = this._loadMap.bind(this);
  }

  componentDidMount() {
    requestJson('data/map.geojson', (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
  }

  _loadData = data => {
    this.setState({data});
  };

  _loadMap = () => {
    console.log(this.map.current);

    // this.map.current.getMap().loadImage("images/iconmonstr-star-3-16.png",(error,image)=> {
    //   if (error) throw error;
    //   this.map.current.getMap().addImage('airicon-11',image);
    //   setTimeout(() => {
    //     this.setState({loadImage: true});
    //     console.log(this.map.current.getMap().listImages());
    //   },3000);
    // });

    // request("images/iconmonstr-star-3.svg").get((response)=> {
    //   debugger;
    //   const svg = response.responseText;
    //   let blob = new Blob([svg], {type: 'image/svg+xml'});
    //   let url = URL.createObjectURL(blob);
    //   let image = document.createElement('img');
    //   image.src = url;
    //   image.addEventListener('load', () => URL.revokeObjectURL(url), {once: true});
    //   this.map.current.getMap().addImage('airport-11',{width: 24, height: 24, data: image});
    //   setTimeout(() => {
    //     this.setState({loadImage: true});
    //     console.log(this.map.current.getMap().listImages());
    //   },3000);
    // });

        // this.map.current.getMap().addImage('airicon-11',svgPathToImage({path: "images/iconmonstr-star-3-16.png",height: 16,width: 16}));
    // console.log(this.map.current.getMap().hasImage('airicon-11'));
    // while(!this.map.current.getMap().hasImage('airicon-11')){};



  }

  render() {
    // const { mapboxApiAccessToken,data } = this.state;
    const { mapboxApiAccessToken,data,loadImage } = this.state;
    return (
      <div id="map">
      <MapGL
        ref={this.map}
        onLoad={this._loadMap}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle="mapstyle/basic-v9.json"
        {...this.state.viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => this.setState({viewport})}>
            <Source type="geojson" data={data}>
              <Layer {...dataLayer} />
              <Layer {...modDataLayer} />
              <Layer {...imgLayer} />
           </Source>
           {loadImage ? <Source type="geojson" data={data}>

             <Layer {...imgLayer} />
          </Source> : null }
      </MapGL>
      </div>
    );
  }
}