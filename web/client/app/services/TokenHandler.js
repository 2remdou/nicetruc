/**
 * Created by touremamadou on 11/10/2015.
 */
app.factory('TokenHandler', ['$http', 'Base64','$cookies', function ($http, Base64,$cookies) {
    var tokenHandler = {};
    var token = 'none';

    tokenHandler.set = function (newToken) {
        token = newToken;
    };

    tokenHandler.get = function () {
        return token;
    };

    // Generate random string of length
    tokenHandler.randomString = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    tokenHandler.getCredentials = function (username, secret) {
        // Generate nonce
        var nonce = tokenHandler.randomString(30);

        // Creation time of the token
        var created = formatDate(new Date());

        // Generating digest from secret, creation and nonce
        var hash = CryptoJS.SHA1(nonce + created + secret);
        var digest = hash.toString(CryptoJS.enc.Base64);

        // Base64 Encode digest
        var b64nonce = Base64.encode(nonce);

        return 'UsernameToken Username="' + username + '", PasswordDigest="' + digest + '", Nonce="' + b64nonce + '", Created="' + created + '"';
    };

    tokenHandler.clearCredentials = function () {
        // Clear token from cache
        $cookies.remove('user');
        $cookies.remove('email');
        $cookies.remove('secret');
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
