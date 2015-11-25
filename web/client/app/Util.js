/**
 * Created by mdoutoure on 24/11/2015.
 */

var displayAlert = function(message,typeAlert,scope){
    var response={};
    response.data = [{texte:message,'typeAlert':typeAlert}];
    successRequest(response,scope);

}
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
    };

    var extractId = function(object){
        if(typeof object !== "undefined"){
            if(object.hasOwnProperty('id')){
                return object.id;
            }
        }
        return null;
    };

    var deleteProperty = function(object,property){
        if(object.hasOwnProperty(property)){
            delete  object[property];
        }
    };