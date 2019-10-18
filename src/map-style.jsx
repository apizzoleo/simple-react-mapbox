export const dataLayer =  {
  id: 'circle-layer',
  type: 'circle',
  paint: {
      'circle-color': {
        property: 'level',
        stops: [
          [1, '#cc0000'],
          [2, '#ffcc00'],
          [3, '#009900']
        ]
      },
      'circle-radius': 4
  }
};

export const modDataLayer =  {
  id: 'mod-circle-layer',
  type: 'circle',
  paint: {
      'circle-color': {
        property: 'level',
        stops: [
          [1, '#cc00ff'],
          [2, '#ffccff'],
          [3, '#0099ff']
        ]
      },
      'circle-radius': 4
  }
};

export const imgLayer =  {
  id: 'img-layer',
  "type": "symbol",
  "layout": {
    "icon-image": "allarme-red-11",
    "icon-size": 1
    }
};