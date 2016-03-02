/**
 * Created by touremamadou on 01/03/2016.
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
                    cible = $('#btnClose');
                    //$(cible).trigger('click');
                    // $('body').removeClass('modal-open')
                    // $('.modal-backdrop').removeClass('in')
                    // $('.modal-backdrop').removeClass('modal-backdrop')
                }
            });
        }
    };

});