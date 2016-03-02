/**
 * Created by touremamadou on 12/02/2016.
 */
app.directive('ntCloseModal',function(){
    return {
        restrict: 'A',
        scope:{
            formIsValid : "="
        },
        link: function(scope,elem,attrs){
            elem.on('click',function(){
                if(scope.formIsValid) {
                    cible = $('#close');
                    $(cible).trigger('click');
                }
            });
        }
    };

});