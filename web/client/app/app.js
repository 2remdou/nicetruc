/**
 * Created by touremamadou on 20/08/2015.
 */
var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap.tabs',
    'restangular',
    'angularFileUpload',
    'ngFileUpload',
    'ngCookies'
]);

var successRequest = function(response,scope){
    scope.$emit('showMessage',response.data);
};

var errorRequest = function(response,scope){
        scope.$emit('showMessage',response.data);
}