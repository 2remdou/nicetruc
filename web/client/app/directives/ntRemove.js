/**
 * Created by mdoutoure on 13/11/2015.
 */
app.directive('ntRemove',[function(){
    return {
        restrict : 'A',
        link : function(scope,element,attrib){
            element.on('click',function(e){
                $(element).parent().parent().fadeOut("slow",function(){
                });

            })
        }
    }
}]);