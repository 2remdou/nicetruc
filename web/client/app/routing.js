/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
   $stateProvider
       .state('villes',{
           url:'/villes',
           templateUrl: '/client/app/views/ville.html',
           controller: 'VilleController'
       })
       .state('quartiers',{
           url:'/quartiers',
           templateUrl: '/client/app/views/quartier.html',
           controller: 'QuartierController'
       })
       .state('categories',{
           url:'/categories',
           templateUrl: '/client/app/views/categorie.html',
           controller: 'CategorieController'
       })
       .state('carburants',{
           url:'/carburants',
           templateUrl: '/client/app/views/carburant.html',
           controller: 'CarburantController'
       })
       .state('boitiers',{
           url:'/boitiers',
           templateUrl: '/client/app/views/boitier.html',
           controller: 'BoitierController'
       })
       .state('marques',{
           url:'/marques',
           templateUrl: '/client/app/views/marque.html',
           controller: 'MarqueController'
       })
       .state('modeles',{
           url:'/modeles',
           templateUrl: '/client/app/views/modele.html',
           controller: 'ModeleMarqueController'
       })
       .state('annonces',{
           url:'/annonces',
           templateUrl: '/client/app/views/annonceVoiture.html',
           controller: 'AnnonceController'
       })
       .state('voitures',{
           url:'/voitures',
           templateUrl: '/client/app/views/searchVoiture.html',
           controller: 'SearchVoitureController'
       })

   ;
});