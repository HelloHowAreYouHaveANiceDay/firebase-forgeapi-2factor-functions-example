const functions = require('firebase-functions');
const querystring = require('querystring')
const axios = require('axios')

exports.getToken = functions.https.onRequest((request, response) => {
    // the forge auth endpoint
    const url = 'https://developer.api.autodesk.com/authentication/v1/authenticate'
    // pull credentials from the environment config
    const clientId = functions.config().forge.client_id
    const clientSecret = functions.config().forge.secret
    // additional scopes and scope docs can be found in
    // the forge api documentation
    const scope = 'data:read'


    // make the call
    axios({
        url,
        method: 'post',
        data: querystring.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials',
            scope: scope
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((forgeResponse) => {
        // pass through the forge response with the token
        return response.status(200).send(forgeResponse.data)
    }).catch((err) => {
        response.status(500).send(err)
    })
});
