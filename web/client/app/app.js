/**
 * Created by touremamadou on 20/08/2015.
 */
var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap.tabs',
    'restangular'
]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

/*
app.config(function($provide) {
    $provide.decorator('tabset', function($delegate) {
        //we now get an array of all the datepickerDirectives,
        //and use the first one
        $delegate[0].templateUrl = 'my/template/url.html';
        return $delegate;
    });
});
*/

/*
app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
    });*/
