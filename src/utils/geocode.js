 const request = require("request")

 const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhbnRhbnUzNCIsImEiOiJjanoxNG5iMnMwaHo4M2VteWMzdDV0MWVkIn0.he9kwQ_FO0hXa7aK8Z6GTw&limit=1'
    request({url, json: true}, (error, {body}={}) => {
        if(error){
        callback("Unable to connect to lcation services", undefined)
        } else if(body.features.length === 0){
            callback("Unable to find location. Tru another search", undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode