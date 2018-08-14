const ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    LiveApi = require('notificare').LiveApi;

module.exports = api;

console.log(process.env);

const httpGateway = new LiveApi(process.env.PRIVATE_KEY, process.env.PUBLIC_KEY).httpGateway;

api.get('/liveapi', function(request) {
    if (!request.normalizedHeaders['x-notificare-public-key'] || !request.queryString.challenge) {
        return new ApiBuilder.ApiResponse('missing parameters', {'Content-type': 'text/plain'}, 400);
    } else {
        try {
            return new ApiBuilder.ApiResponse(httpGateway.verify(request.normalizedHeaders['x-notificare-public-key'], request.queryString.challenge), {'Content-type': 'text/plain'}, 200);
        } catch (err) {
            throw new ApiBuilder.ApiResponse(err.message, {'Content-type': 'text/plain'}, 400);
        }
    }
});

api.post('/liveapi', function(request) {
    if (!request.headers['x-notificare-public-key'] || !request.normalizedHeaders['x-notificare-signature']) {
        return new ApiBuilder.ApiResponse('missing parameters', {'Content-type': 'text/plain'}, 400);
    } else {
        try {
            if (!httpGateway.validate(request.normalizedHeaders['x-notificare-public-key'], request.rawBody, request.normalizedHeaders['x-notificare-signature'])) {
                console.log('invalid signature');
                return new ApiBuilder.ApiResponse('invalid signature', {'Content-type': 'text/plain'}, 400);
            } else {
                console.log('received event: %j', request.rawBody);
                return 'message received';
            }
        } catch (err) {
            console.log('error: %s', err.message);
            throw new ApiBuilder.ApiResponse(err.message, {'Content-type': 'text/plain'}, 400);
        }
    }
});