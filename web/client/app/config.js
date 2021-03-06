/**
 * Created by touremamadou on 12/09/2015.
 */

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});


    app.config(['RestangularProvider','$injector','usSpinnerConfigProvider',
        '$locationProvider','NotificationProvider','$locationProvider','$httpProvider', 'jwtInterceptorProvider',
    function(RestangularProvider,$injector,usSpinnerConfigProvider,
             $locationProvider,NotificationProvider,$locationProvider,$httpProvider, jwtInterceptorProvider) 
    {
        var hasSendRequestForRefresh = false;
        $locationProvider.html5Mode(true); // pour enlever le hastag(#) dans l'url

        jwtInterceptorProvider.tokenGetter = ['jwtHelper','UserService','AuthService',
            function(jwtHelper, UserService,AuthService){
               var token= AuthService.getToken();
               var refreshToken = AuthService.getRefreshToken();

               if(hasSendRequestForRefresh)
                    return;

                if(!token)
                    return;

                if (jwtHelper.isTokenExpired(token)) {
                    hasSendRequestForRefresh=true;
                    UserService.refreshToken().then(function(response){
                        AuthService.authenticated(response);
                        hasSendRequestForRefresh=false;
                    });
                }
                else{
                    return token;
                }
                return token;
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

        RestangularProvider.setBaseUrl(window.location.origin+'/api');

        RestangularProvider.addRequestInterceptor(function(element, operation, what, url) {
         var standardRoute = ['villes/','categories/','marques/','boitiers/','carburants/','modeles/'];

        if(operation === 'put' || operation=== 'post'){
             if(standardRoute.indexOf(what) !==-1){
                 ['id','visible'].forEach(function(property){
                     deleteProperty(element,property);
                 });
                 if(element.hasOwnProperty('voitures')){
                     delete element.voitures;
                 }
                 if(element.hasOwnProperty('modeleMarques')){
                     delete element.modeleMarques;
                 }
             }
            if(what === 'quartiers/'){
                 var id=element.ville.id;
                ['ville','id','visible'].forEach(function(property){
                    deleteProperty(element,property);
                });
                 element.ville = id;
             }
             else if(url.search('modelemarques')!==-1){
                 var idMarque=element.marque.id;
                 var idModele=element.modele.id;

                ['marque','modele','id','visible'].forEach(function(property){
                    deleteProperty(element,property);
                });
                 element.marque = idMarque;
                 element.modele = idModele;
             }
            else if(url.search('marques')!==-1){
                deleteProperty(element,'modeles');
            }
            else if(url.search('voitures')!==-1){

                ['marque','modele','id','images','defaultPathImagePrincipale','postulants'].forEach(function(property){
                    deleteProperty(element,property);
                });
                 //element.modeleMarque = extractId(element.modeleMarque);
                 element.boitier = extractId(element.boitier);
                 element.carburant = extractId(element.carburant);
                 element.imagePrincipale=extractId(element.imagePrincipale);
                 element.categorie=extractId(element.categorie);
                 element.user = extractId(element.user);
             }
             else if(what === 'users'){
                 if(element.hasOwnProperty('quartier')){
                     element.quartier = extractId(element.quartier);
                 }
             }
             else if(url.search('search')!==-1){

                element.marque = extractId(element.marque);
                element.modele = extractId(element.modele);
                element.boitier = extractId(element.boitier);
                element.carburant = extractId(element.carburant);
             }
         }
         return element;
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
            , position: 'fixed' // Element positioning
        }; //loading(spinner)

    usSpinnerConfigProvider.setDefaults(opts);
    
    var optNotication={
        delay: 10000,
        startTop: 50,
        startRight: 20,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'center',
        positionY: 'top',
        replaceMessage: true
    }
        NotificationProvider.setOptions(optNotication);

    }]);

app.run(['$rootScope', 'AuthService','$timeout','Restangular','Permission','UserService',
        '$state','usSpinnerService','Notification','$window',
        function($rootScope,AuthService,$timeout,Restangular,Permission,UserService,$state,
                 usSpinnerService,Notification,$window){

            $rootScope.currentYear = new Date().getFullYear();
            var scope = $rootScope.$new();
    // initialisation user
    if(typeof $rootScope.user == 'undefined'){
        $rootScope.user = AuthService.getUser();
    };

    // verification de l'authentification
    $rootScope.isAuthenticated = function(){
        return UserService.isAuthenticated();
    };

    $rootScope.isAdmin = function(){
        return UserService.isAdmin();
    };

    Permission.defineManyRoles(['ANONYMOUS','ROLE_API','ROLE_ADMIN'], function (stateParams, roleName) {
        return UserService.hasRole(roleName);
    });

    $rootScope.$on('$stateChangePermissionDenied',function(){
        if(UserService.isAuthenticated()){
            displayAlert("Vous n'avez pas les autorisations neccessaires pour acceder à cette ressource",'info',scope);
            $state.go('nicetruc');
        }
        else{
            displayAlert("Veuillez vous identifier, pour avoir accès à cette ressource",'info',scope);
            $state.go('login');
        }
    });

            $rootScope.$on('show.error',function(event,args){

                displayAlert(args.alert.textAlert,args.alert.typeAlert,scope);
                usSpinnerService.stop('nt-spinner');
            });

    $rootScope.$on('showMessage',function(event,messages){
        angular.forEach(messages,function(message){
            var opt= {'message': message.texte}
            if(message.typeAlert==='danger'){
                Notification.error(opt);
            }
            else if(message.typeAlert==='success'){
                Notification.success(opt);
            }
            else if(message.typeAlert==='info'){
                Notification.info(opt);
            }
            else if(message.typeAlert==='warning'){
                Notification.warning(opt);
            }
        });
        /*$timeout(function(){
            $rootScope.showMessage = false;
            $rootScope.messages = {};
        },10000);
        $rootScope.showMessage = true;
        $rootScope.messages = messages;*/
    });

    $rootScope.$on('hideMessage',function(event){
        $rootScope.showMessage = false;
        $rootScope.messages = {};
    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        usSpinnerService.stop('nt-spinner');
        if(response.status === 403) {
            displayAlert("Vous ne disposez des autorisations neccessaires pour effectuer cette action",'danger',scope);
        }
        else if(response.status === 401) {
            AuthService.clear();
            displayAlert("Token expiré, reconnectez vous",'info',scope);
            $state.go('login');
        }
        else if(response.status === 404){
            displayAlert("Aucune ressource trouvée",'info',scope);
        }
        return true;
    });
}]);
