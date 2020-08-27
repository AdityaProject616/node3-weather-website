const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRpdHlhbXV0aGFsIiwiYSI6ImNrZGxxN2phdDExMzAyem8wb3d4bzE3ZnQifQ.KkOn1zFKCG33JT3fN5BnvA'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to Connect to Location Service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find the Location! Try another Search', undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;