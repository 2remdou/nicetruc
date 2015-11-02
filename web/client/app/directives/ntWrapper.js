/**
 * Created by touremamadou on 01/11/2015.
 */

app.directive('ntWrapper',['$rootScope',function($rootScope){
    return {
        restrict : 'A',
        scope:{},
        link : function(scope,element,attrib){

            scope .$on('enable-wrapper',function(){
                console.log("enable");
                element.addClass('wrapper');
            });

            scope.$on('disable-wrapper',function(){
                element.removeClass('wrapper');

            });
        }
    }
}]);