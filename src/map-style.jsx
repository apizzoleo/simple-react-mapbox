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
    "icon-image":  [
      'step', // arg 1
      ['get', 'level'], // arg 2
      'allarme-red-11', // arg 3
      1, 'allarme-red-11', // rest of the expression is arg 4
      2, 'allarme-green-11',
      3, 'allarme-yellow-11'
     ],
    "icon-size": 1
    }
};