/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('ImageService',function($rootScope,Restangular){

    var _imageService = Restangular.all('images/');

    this.list = function(){
        $rootScope.$broadcast('image.list');
        return _imageService.getList();
    }

    this.create = function(image){
        _imageService.post(image,{},{'Content-Type': undefined}).then(function(){
            $rootScope.$broadcast('image.create');
        });
    };

    this.update = function(image){
        image.put().then(function(){
           $rootScope.$broadcast('image.update');
        });
    };

    this.delete = function(image){
        image.remove().then(function(){
            $rootScope.$broadcast('image.delete');
        })
    }
});