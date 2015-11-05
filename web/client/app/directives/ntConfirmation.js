/**
 * Created by touremamadou on 01/11/2015.
 */

app.directive('ntConfirmation',[function(){
    return {
        restrict : 'A',
        templateUrl : 'client/app/views/boiteConfirmation.html',
        link : function(scope,element,attrib){
            element.on('click',function(e){
                element.confirmation({});
            })
        }
    }
}]);