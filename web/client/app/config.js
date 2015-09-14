/**
 * Created by touremamadou on 12/09/2015.
 */

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});


app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://127.0.0.1:8000/app_dev.php/api');

     RestangularProvider.addRequestInterceptor(function(element, operation, what, url) {
         if(operation === 'put' || operation=== 'post'){
             if(what === 'villes/'){
                 delete element.id;
                 delete element.visible;
             }
             else if(what === 'quartiers/'){
                 var id=element.ville.id;
                 delete  element.ville;
                 delete  element.id;
                 delete  element.visible;
                 element.ville = id;
             }
         }
         return element;
     });
});
