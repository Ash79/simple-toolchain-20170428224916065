'use strict';

angular.module('Soju')
.factory('featureToggle', ['$rootScope', function ($rootScope) {

    return {
        features: {
            'auth': false,
            'cms_content': false
        },
        init: function () {

            $rootScope.features = this.features;

        }
    };

}]);
