angular.module('Soju')

.factory('CmsContentService', ['$http', function ($http) {

    return {
        getContent: function () {

            return $http

            .get('/api/content')
            .then(function (response) {
                
                return response.data;

            });
            
        }

    };

}]);
