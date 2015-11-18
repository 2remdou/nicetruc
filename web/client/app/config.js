/**
 * Created by touremamadou on 12/09/2015.
 */

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});


    app.config(['RestangularProvider','$injector', 'TokenHandlerProvider', 'AuthHandlerProvider','usSpinnerConfigProvider','$locationProvider',
    function(RestangularProvider,$injector, TokenHandlerProvider, AuthHandlerProvider,usSpinnerConfigProvider,$locationProvider) {

    var TokenHandler = $injector.instantiate(TokenHandlerProvider.$get);
    var AuthHandler = $injector.instantiate(AuthHandlerProvider.$get);

    RestangularProvider.setBaseUrl(window.location.origin+'/api');

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
             else if(what.search('voitures')!==-1){
                 delete element.marque;
                 delete element.modele;
                 delete element.images;
                 delete  element.id;

                 element.modeleMarque = extractId(element.modeleMarque);
                 element.boitier = extractId(element.boitier);
                 element.carburant = extractId(element.carburant);
                 element.imagePrincipale=extractId(element.imagePrincipale);
                 element.user = extractId(element.user);
             }
             else if(what === 'users'){
                 if(element.hasOwnProperty('quartier')){
                     element.quartier = extractId(element.quartier);
                 }
             }
         }
         return element;
     });

    RestangularProvider.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
        if(typeof AuthHandler.email() != 'undefined'){
            headers['X-WSSE'] =
                TokenHandler.getCredentials(
                    AuthHandler.email(),
                    AuthHandler.secret()
                );
        }

        return {
            element: element,
            headers: headers,
            params: params,
            httpConfig: httpConfig
        };
    });


        var opts = {
            lines: 13 // The number of lines to draw
            , length: 28 // The length of each line
            , width: 14 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        }; //loading(spinner)

    usSpinnerConfigProvider.setDefaults(opts);

    }]);

app.run(['$rootScope', 'AuthHandler','$timeout','Restangular',
        function($rootScope,AuthHandler,$timeout,Restangular){

    // initialisation user
    if(typeof $rootScope.user == 'undefined'){
        $rootScope.user = AuthHandler.getUser();
    }

    // verification de l'authentification
    $rootScope.isAuthenticated = function(){
        return typeof AuthHandler.getUser() != 'undefined';
    };

    // verification de l'autorisation
    $rootScope.hasAuthorized = function(){
        if(!$rootScope.isAuthenticated()){

            return false;
        }
        return true;
    };

    $rootScope.isAdmin = function(){
        if($rootScope.isAuthenticated()){
            angular.forEach($rootScope.user.roles,function(role){
               if(role.search('ADMIN')){
                   return true;
               }
            });
        }
        return false;
    };

    $rootScope.$on('showMessage',function(event,messages){
        $timeout(function(){
            $rootScope.showMessage = false;
            $rootScope.messages = {};
        },10000);
        $rootScope.showMessage = true;
        $rootScope.messages = messages;
    });

    $rootScope.$on('hideMessage',function(event){
        $rootScope.showMessage = false;
        $rootScope.messages = {};
    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler){

        scope=$rootScope.$new();

        if(response.status==400 || response.status==500){
            response.data = [{texte:"Ooops, il est ou l'administrateur ??? Erreur vraiment etonnante",'typeAlert':'danger'}];
        }
        else if(response.status==404){
            if(response.data.hasOwnProperty('data')){
                response.data = response.data.data;
            }
        }
        else if(response.status==403){
            response.data = [{texte:"Vous n'avez les autorisations neccessaires pour y acceder",'typeAlert':'danger'}];
        }
        scope.$emit('showMessage',response.data);
    });

}]);
