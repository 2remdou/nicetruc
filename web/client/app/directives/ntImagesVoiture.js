/**
 * Created by touremamadou on 23/08/2015.
 */
app.directive('ntImagesVoiture',function(){
    return {
        restrict: 'E',
        scope: {
            imagePrincipale : '=',
            images : '='
        },
        templateUrl:'client/app/views/ntImagesVoiture.html',
        link: function(scope,elem,attrs){

            scope.selectImage = function(image){
                $('#ntImagePrincipale').attr('src',image.downloadUrl);
            };

            $('#ntImagePrincipale').mouseenter(function(){
                $('#ntImagePrincipale').zoom();
            });


        }
    };

});