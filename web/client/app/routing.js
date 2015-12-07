/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(function($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.otherwise("/");
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('nicetruc');
    });
   $stateProvider
       .state('nicetruc',{
           url:'/',
           views:{
               'nav':{
                   templateUrl: 'client/app/views/index.html',
                   controller: 'IndexController'
               }
           }
       })
       .state('nicetruc.main',{
           url: 'main',
           views:{
               'content':{
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
       .state('nicetruc.resetting',{
           url: 'resetting',
           views:{
               'content':{
                   templateUrl: 'client/app/views/resetting.html',
                   controller: 'ResettingController'
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
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
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
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
       .state('nicetruc.editVoiture',{
           url:'editVoiture/:voitureId',
           views:{
               'content':{
                   templateUrl: 'client/app/views/editVoiture.html',
                   controller: 'EditVoitureController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
               }
           }
       })
       .state('nicetruc.voitureByUser',{
           url:'listVoiture',
           views:{
               'content':{
                   templateUrl: 'client/app/views/voitureByUser.html',
                   controller: 'VoitureByUserController'
               }
           }
       })


   ;
});