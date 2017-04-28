'use strict';

angular.module('Soju')

.controller('CmsContentController', ['$scope', 'CmsContentService', '$mdSidenav', 'featureToggle', function ($scope, CmsContentService, $mdSidenav, featureToggle) {

    $scope.toggleList = function () {

        $mdSidenav('left').toggle();

    };
    $scope.cms_content_feature_toggle = featureToggle.features.cms_content;

    // if the cms_content feature toggle is true make a call to the CmsContentService to call node to retrieve content
    if (featureToggle.features.cms_content) {

        CmsContentService.getContent()
        .then(function (content) {

            $scope.cms_content = content;

        });

    }

}]);

