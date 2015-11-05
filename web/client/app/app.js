/**
 * Created by touremamadou on 20/08/2015.
 */
var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap.tabs',
    'restangular',
    'angularFileUpload',
    'ngCookies',
    'angularSpinner',
    'ngDialog'
]);

var successRequest = function(response,scope){
    scope.$emit('showMessage',response.data);
};

var errorRequest = function(response,scope){
/*
    if(response.status==400){
        response.data = [{texte:"Ooops, il est ou l'administrateur ??? Erreur vraiment etonnante",'typeAlert':'danger'}];
    }
    else if(response.status==404){
        if(response.data.hasOwnProperty('data')){
            response.data = response.data.data;
        }
    }
    scope.$emit('showMessage',response.data);
*/
}

var extractId = function(object){
    if(object.hasOwnProperty('id')){
        return object.id;
    }
    return null;
}