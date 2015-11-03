/**
 * Created by touremamadou on 01/11/2015.
 */

app.directive('ntPopover',[function(){
    return {
        restrict : 'A',
        link : function(scope,element,attrib){
            element.on('mouseenter',function(){
                element.on('shown.bs.popover',function(){
                });
                //element.popover('show');
            });
            element.on('mouseleave',function(){
                element.popover('hide');
            });
        }
    }
}]);