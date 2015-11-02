/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
   $stateProvider
       .state('nicetruc',{
           url:'/',
           views:{
               'nav':{
                   templateUrl: 'client/app/views/main.html',
                   controller: 'MainController'
               }
           }
       })
       .state('nicetruc.login',{
           url: 'login',
           views:{
               'content':{
                   templateUrl: 'client/app/views/login.html',
                   controller: 'LoginController'
               }
           }
       })
       .state('nicetruc.inscription',{
           url: 'inscription',
           views:{
               'content':{
                   templateUrl: 'client/app/views/inscription.html',
                   controller: 'InscriptionController'
               }
           }
       })
       .state('nicetruc.profil',{
           url: 'profil',
           views:{
               'content':{
                   templateUrl: 'client/app/views/profile.html',
                   controller: 'ProfilController'
               }
           }
       })
       .state('nicetruc.villes',{
           url:'villes',
           views:{
               'content':{
                   templateUrl: 'client/app/views/ville.html',
                   controller: 'VilleController'
               }
           }
       })
       .state('nicetruc.quartiers',{
           url:'quartiers',
           views:{
               'content':{
                   templateUrl: 'client/app/views/quartier.html',
                   controller: 'QuartierController'
               }
           }
       })
       .state('nicetruc.categories',{
           url:'categories',
           views:{
               'content':{
                   templateUrl: 'client/app/views/categorie.html',
                   controller: 'CategorieController'
               }
           }
       })
       .state('nicetruc.carburants',{
           url:'carburants',
           views:{
               'content':{
                   templateUrl: 'client/app/views/carburant.html',
                   controller: 'CarburantController'
               }
           }
       })
       .state('nicetruc.boitiers',{
           url:'boitiers',
           views:{
               'content':{
                   templateUrl: 'client/app/views/boitier.html',
                   controller: 'BoitierController'
               }
           }
       })
       .state('nicetruc.marques',{
           url:'marques',
           views:{
               'content':{
                   templateUrl: 'client/app/views/marque.html',
                   controller: 'MarqueController'
               }
           }
       })
       .state('nicetruc.modeles',{
           url:'modeles',
           views:{
               'content':{
                   templateUrl: 'client/app/views/modele.html',
                   controller: 'ModeleMarqueController'
               }
           }
       })
       .state('nicetruc.annonces',{
           url:'annonces',
           views:{
               'content':{
                   templateUrl: 'client/app/views/annonceVoiture.html',
                   controller: 'AnnonceVoitureController'
               }
           }
       })
       .state('nicetruc.imageAnnonceVoiture',{
           url:'imageAnnonce/:voitureId',
           views:{
               'content':{
                   templateUrl: 'client/app/views/imageAnnonceVoiture.html',
                   controller: 'ImageAnnonceVoitureController'
               }
           }
       })
       .state('nicetruc.voitures',{
           url:'voitures',
           views:{
               'content':{
                   templateUrl: 'client/app/views/searchVoiture.html',
                   controller: 'SearchVoitureController'
               }
           }
       })
       .state('nicetruc.showVoiture',{
           url:'showVoiture/:voitureId',
           views:{
               'content':{
                   templateUrl: 'client/app/views/showVoiture.html',
                   controller: 'ShowVoitureController'
               }
           }
       })


   ;
});