/**
 * Created by touremamadou on 11/10/2015.
 */
app.factory('TokenHandler', ['$http', 'Base64', function($http, Base64) {
    var tokenHandler = {};
    var token = 'none';

    tokenHandler.set = function( newToken ) {
        token = newToken;
    };

    tokenHandler.get = function() {
        return token;
    };

    // Generate random string of length
    tokenHandler.randomString = function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    tokenHandler.getCredentials = function ( username, secret) {
        // Generate nonce
        var nonce = tokenHandler.randomString(30);

        // Creation time of the token
        var created = formatDate(new Date());

        // Generating digest from secret, creation and nonce
        var hash = CryptoJS.SHA1(nonce+created+secret);
        var digest = hash.toString(CryptoJS.enc.Base64);

        // Base64 Encode digest
        var b64nonce = Base64.encode( nonce );

        // Return generated token
        return 'UsernameToken Username="'+username+'", PasswordDigest="'+digest+'", Nonce="'+b64nonce+'", Created="'+created+'"';
    };

    // Token Reinitializer
    tokenHandler.clearCredentials = function () {
        // Clear token from cache
        $cookieStore.remove('username');
        $cookieStore.remove('digest');
        $cookieStore.remove('nonce');
        $cookieStore.remove('created');

        // Clear token variable
        delete $http.defaults.headers.common['X-WSSE'];
    };

    // Token wrapper for resource actions
    tokenHandler.wrapActions = function( resource, actions ) {
        var wrapperResource = resource;

        for ( var i=0; i < actions.length; i++ ) {
            tokenWrapper( wrapperResource, actions[i] );
        }

        return wrapperResource;
    };

    // Token wrapper
    var tokenWrapper = function ( resource, action ) {
        resource['_'+action] = resource[action];
        resource[action] = function ( data, success, error ) {
            if ( (typeof data.username != 'undefined') && (typeof data.secret != 'undefined') ) {
                $http.defaults.headers.common['X-WSSE'] = tokenHandler.getCredentials(data.username, data.secret);
                delete data.username;
                delete data.secret;
            }
            return resource['_'+action](
                data,
                success,
                error
            );
        };
    };

    // Date formater to UTC
    var formatDate = function (d) {
        // Padding for date creation
        var pad = function (num) {
            return ("0" + num).slice(-2);
        };

        return [d.getUTCFullYear(),
                pad(d.getUTCMonth() + 1),
                pad(d.getUTCDate())].join("-") + "T" +
            [pad(d.getUTCHours()),
                pad(d.getUTCMinutes()),
                pad(d.getUTCSeconds())].join(":") + "Z";
    };

    return tokenHandler;
}]);
