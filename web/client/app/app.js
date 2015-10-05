/**
 * Created by touremamadou on 20/08/2015.
 */
var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap.tabs',
    'restangular',
    'angularFileUpload',
    'ngFileUpload'
]);

var generateNameImage = function(){
    var n=Math.floor(Math.random()*11);
    var k = Math.floor(Math.random()* 1000000);
    var m = Math.floor(Math.random()* k*n);
    return m;
}
