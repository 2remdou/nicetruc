/**
 * Created by touremamadou on 23/08/2015.
 */
app.directive('ntVoiture',function(){
    return {
        restrict: 'E',
        scope: {
            voiture : '=',
        },
        templateUrl:'client/app/views/ntVoiture.html',
        link: function(scope,elem,attrs){


        }
    };

});