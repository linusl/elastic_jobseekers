/**
 * Created by linusl on 2014-03-28.
 */
// define your controller, which depends on $scope and a service called "elasticClient"
searchApp.controller('healthController', function($scope, elasticClient) {

    // elasticClient is actually a "Client" in the sense of the documentation and can
    // be used to issue requests to elasticsearch-clusters. How it is configured can be seen
    // below.
    elasticClient.cluster.health(function (err, resp) {
        if (err) {
            $scope.data = err.message;
        } else {
            $scope.data = resp;
        }
    });
});

searchApp.controller('pingController', function($scope, elasticClient) {

    elasticClient.ping({
        requestTimeout: 1000,
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    })
});