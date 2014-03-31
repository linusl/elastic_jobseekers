/**
 * Created by linusl on 2014-03-28.
 */
searchApp.controller('NavController', function NavController($scope, $location) {
    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };
});