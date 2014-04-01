/**
 * Created by linusl on 2014-03-28.
 */
searchApp.controller('skillsController', function ($scope, elasticClient, utilsService) {

    $scope.search = function () {

        if(!$scope.queryTerm == '') {
            elasticClient.search({
                index: 'duma_skills',
                size: 50,
                body: {
                    "query": {
                        "match": {
                            _all: {
                                "query": $scope.queryTerm,
                                "fuzziness": "AUTO"
                            }
                        }
                    },
                    "highlight": {
                        "pre_tags" : [""],
                        "post_tags" : [""],
                        "fields": {
                            "skill.skillgroup.name": {},
                            "skill.name": {}
                        }
                    }
                }

            }).then(function (response) {
                $scope.hits = response.hits.hits;
                $scope.total = response.hits.total;
            });
        } else {
            $scope.hits = '';
        }

    };

    $scope.renderTotal = function(total) {

        var totalText = "";
        var skillWord = "skill";


        if (total > 1)
            skillWord = "skills";

        if (total)
            totalText = "Here you go, <strong>" + total + "</strong> nice " + skillWord + ", you're welcome!";
        else
            totalText = "So you want skills, do you?";

        return totalText;

    };

    $scope.renderResult = function(result) {

        var skillName = "";
        var skillGroupName = "";

        if (result.highlight) {

            if (result.highlight['skill.skillgroup.name'])
                skillGroupName = utilsService.formatHighlight(result.highlight['skill.skillgroup.name'][0]);
            else
                skillGroupName = result._source.skill.skillgroup.name;

            if (result.highlight['skill.name'])
                skillName = utilsService.formatHighlight(result.highlight['skill.name'][0]);
            else
                skillName = result._source.skill.name;

        } else {

            skillName = result._source.skill.name;
            skillGroupName = result._source.skillgroup.name;
        }

        return skillName + " - " + skillGroupName;

    };

});