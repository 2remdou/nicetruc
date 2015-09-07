/**
 * Created by touremamadou on 20/08/2015.
 */
var app = angular.module('app',[
    'ui.router'
]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});