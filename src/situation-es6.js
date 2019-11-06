const json = {

    "situations": [
      {
            "countryRef": "ITA",
            "participantRef": "MOP",
            "situationNumber": "03217769-f3f6-11e9-9406-576a760cd111",
            "progress": "open",
            "scopeType": "stopPoint",
            "severity": "slight",
            "affects": {
                "allOperators": false,
                "operators": [],
                "stopPoints": [
                    {
                        "stopPointRef": "TNPNTS00000000000008",
                        "stopPointName": "ISOLA",
                        "location": {
                            "latitude": 41,
                            "longitude": 10,
                            "precision": null
                        },
                        "affectedModes": null,
                        "placeRef": null,
                        "placeName": null,
                        "accessibilityAssessment": null,
                        "connectionLinks": null
                    }
                ],
                "networks": [],
                "lines": [],
                "vehicleJourneys": [],
                "stopPlaces": [],
                "places": null
            },
        }, {
            "countryRef": "ITA",
            "participantRef": "MOP",
            "situationNumber": "03217769-f3f6-11e9-9406-576a760cd222",
            "progress": "open",
            "scopeType": "stopPoint",
            "severity": "slight",
            "affects": {
                "allOperators": false,
                "operators": [],
                "stopPoints": [
                    {
                        "stopPointRef": "TNPNTS00000000000008",
                        "stopPointName": "ISOLA",
                        "location": {
                            "latitude": 42,
                            "longitude": 10,
                            "precision": null
                        },
                        "affectedModes": null,
                        "placeRef": null,
                        "placeName": null,
                        "accessibilityAssessment": null,
                        "connectionLinks": null
                    },
                  {
                        "stopPointRef": "TNPNTS00000000000009",
                        "stopPointName": "ISOLA",
                        "location": {
                            "latitude": 40,
                            "longitude": 10,
                            "precision": null
                        },
                        "affectedModes": null,
                        "placeRef": null,
                        "placeName": null,
                        "accessibilityAssessment": null,
                        "connectionLinks": null
                    }
                ],
                "networks": [],
                "lines": [],
                "vehicleJourneys": [],
                "stopPlaces": [],
                "places": null
            },
        },
      {
            "countryRef": "ITA",
            "participantRef": "MOP",
            "situationNumber": "03217769-f3f6-11e9-9406-576a760cdxxx",
            "progress": "close",
             "severity": "slight",
            "scopeType": "stopPoint"
        },
    ]
}

filterSituation = (affects) => affects.progress === 'open'; // && affects !== null && affects.stopPoints !== null
getStopPoints = (situation) => situation.stopPoints;
const situations = json.situations.filter(filterSituation);
// console.log(situations);

/*
const modSituations = situations.map(s => { return { "situationNumber": s.situationNumber,"stopPoints": s.affects.stopPoints}} );
console.log(modSituations);
*/
const allSituations = situations.map(s => s.affects.stopPoints.map( p => { return {
  "situationNumber": s.situationNumber,
  "severity": s.severity,
  "progress": s.progress,
  "location": p.location
  }})).flat();

const geoTemplate = {
            "type": "Feature",
            "geometry": {
                "type": "Point"
            }
        }

const mainGeoJSOn = {
    "type": "FeatureCollection",
    "features": []
}
// console.log(allSituations)
const allFeatures = allSituations.map(s => {
  return{...{properties: {situationNumber: s.situationNumber,"severity":  s.severity,
   "progress": s.progress},...geoTemplate,...{geometry:{coordinates: Object.values(s.location).slice(0,2), "type": "Point"}  }}
}});

// console.log(allFeatures)
mainGeoJSOn.features = allFeatures;
console.log(JSON.stringify(mainGeoJSOn));