/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
   $stateProvider
       .state('main',{
           url:'/',
           templateUrl: 'client/app/views/main.html'
       })
       .state('inscription',{
           url:'/inscription',
           templateUrl: 'client/app/views/inscription.html'
       })
       .state('connexion',{
           url:'/connexion',
           templateUrl: 'client/app/views/connexion.html'
       })
        .state('test',{
                   url:'/test',
                   templateUrl: 'client/app/views/test.html'
               })

   ;
});