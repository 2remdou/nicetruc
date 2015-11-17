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
    'ngAnimate',
    'ui.bootstrap'
]);

var successRequest = function(response,scope){
    scope.$emit('showMessage',response.data);
};

var log = function(message){
  console.log(message);
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
    if(typeof object !== "undefined"){
        if(object.hasOwnProperty('id')){
            return object.id;
        }
    }
    return null;
}