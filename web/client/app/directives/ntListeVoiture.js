/**
 * Created by touremamadou on 23/08/2015.
 */
app.directive('ntListeVoiture',function(){
    return {
        restrict: 'E',
        scope: {
            voitures : '=',
        },
        templateUrl:'client/app/views/ntListeVoiture.html',
        link: function(scope,elem,attrs){


        }
    };

});