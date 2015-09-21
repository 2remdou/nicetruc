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
         var standardRoute = ['villes/','categories/','marques/','boitiers/','carburants/','modeles/'];
         if(operation === 'put' || operation=== 'post'){
             if(standardRoute.indexOf(what) !==-1){
                 delete element.id;
                 delete element.visible;
                 if(element.hasOwnProperty('voitures')){
                     delete element.voitures;
                 }
                 if(element.hasOwnProperty('modeleMarques')){
                     delete element.modeleMarques;
                 }
             }
             else if(what === 'quartiers/'){
                 var id=element.ville.id;
                 delete  element.ville;
                 delete  element.id;
                 delete  element.visible;
                 element.ville = id;
             }
             else if(what === 'modelemarques/'){
                 var idMarque=element.marque.id;
                 var idModele=element.modele.id;
                 delete  element.marque;
                 delete  element.modele;
                 delete  element.id;
                 delete  element.visible;
                 element.marque = idMarque;
                 element.modele = idModele;
             }
         }
         return element;
     });
});
