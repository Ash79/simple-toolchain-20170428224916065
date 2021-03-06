'use strict';

angular.module('Soju')
.filter('trusted', ['$sce', function ($sce) {

    return function (url) {
        
        return $sce.trustAsResourceUrl(url);
    
    };

}]);
