/**
 * Created by linusl on 2014-03-26.
*/

// define your module that depends on the elasticsearch module.
var searchApp = angular.module('searchApp', [
    'elasticsearch',
    'ngSanitize',
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'searchController',
            templateUrl: 'views/jobseeker.html'
        })
}]);;

// the "elasticClient" service is created by a factory-Method registered on the the module as
// follows.
searchApp.factory('elasticClient', ['esFactory', function(esFactory) {

    // currently I completely do not understand why I haven't to call "esFactory.factory", as this is the defined
    // method on "esFactory" in elasticsearch.angular.js which returns an instance of "Client", but maybe somebody will
    // explain that fact.

    // this will actually create a "Client"-Instance which you can configure as you wish.
    return esFactory({
        host: 'localhost:9200',
        sniffOnStart: true,
        sniffInterval: 300000,
        log: 'trace'
    });
}]);



