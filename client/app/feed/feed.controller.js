'use strict';

angular.module('Soju')

.controller('FeedController', ['$scope', 'nytFeed', '$mdSidenav', function ($scope, nytFeed, $mdSidenav) {
    
    $scope.techNews = nytFeed.results;

    $scope.toggleList = function () {

        $mdSidenav('left').toggle();

    };
    
}]);
