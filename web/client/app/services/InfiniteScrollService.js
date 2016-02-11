/**
 * Created by touremamadou on 11/02/2016.
 */

app.service('InfiniteScrollService',['VoitureService','$rootScope',
    function(VoitureService,$rootScope){
        var that = this;
        var nombrePage={};

        var loadVoiture = function(page){
            VoitureService.paging(page).then(function(response){
                nombrePage.voiture= Math.ceil(parseInt(response.data.total_count)/parseInt(response.data.num_items_per_page));
                voitures=VoitureService.defineImagePrincipale(response.data.items);
                $rootScope.$broadcast('load.completed.scrollvoiture', ({voitures:voitures}));
            },function(error){

            });
        }

        this.scrollVoiture = function(page){
            if(!nombrePage.hasOwnProperty('voiture')){
                loadVoiture(page);
            } 
            else{
                if(page>nombrePage.voiture){// ne rien faire,si la page demandée n'existe pas
                    $rootScope.$broadcast('load.completed.scrollvoiture', ({voitures:[]}));
                }else{
                    loadVoiture(page);
                }
            }         
        };

    }]);