/**
 * Created by linusl on 2014-03-28.
 */
searchApp.controller('searchController', function ($scope, elasticClient, utilsService) {

    $scope.search = function () {

        if(!$scope.queryTerm == '') {

            elasticClient.search({
                index: 'duma',
                size: 50,
                body: {
                    "query": {
                        "multi_match": {
                            "query": $scope.queryTerm,
                            "fields": [
                                "*_name",
                                "user.skill.name",
                                "user.skill.skillgroup.name",
                                "user.town.name"
                            ],
                            "fuzziness": "AUTO"
                        }
                    },
                    "highlight": {
                        "pre_tags" : [""],
                        "post_tags" : [""],
                        "fields": {
                            "first_name": {},
                            "last_name": {},
                            "user.skill.name": {},
                            "user.town.name": {}
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

    $scope.renderResult = function(result) {

        //var resultText = result._score + ": " + result._source.user.first_name + " " + result._source.user.last_name + ", <strong>Age: </strong>" + age(result._source.user.birthdate) + ", <strong>Town: </strong>" + result._source.user.town.name;

        var firstName = "";
        var lastName = "";
        var townName = "";

        if (result.highlight) {

            if (result.highlight.first_name) {
                firstName = utilsService.formatHighlight(result.highlight.first_name[0]);
            }
            else
                firstName = result._source.user.first_name;

            if (result.highlight.last_name) {
                lastName = utilsService.formatHighlight(result.highlight.last_name[0]);
            }
            else
                lastName = result._source.user.last_name;

            if (result.highlight['user.town.name'])
                townName = utilsService.formatHighlight(result.highlight['user.town.name'][0]);
            else
                townName = result._source.user.town.name;

        } else {

            firstName = result._source.user.first_name;
            lastName = result._source.user.last_name;
            townName = result._source.user.town.name;
        }

        return firstName + " " + lastName + ", " + utilsService.age(result._source.user.birthdate) + " years old, in " + townName;

    };

    $scope.renderSkills = function(result) {

        var skillsText = "";
        var highlightedSkills = "";
        var skillsArray = result._source.user.skill.name;

        if (result.highlight && result.highlight['user.skill.name']) {
            var i = 0;
            do {
                highlightedSkills = highlightedSkills + "<li>" + utilsService.formatHighlight(result.highlight['user.skill.name'][i]) + "</li>";
                if (Array.isArray(skillsArray))
                    skillsArray.remove(result.highlight['user.skill.name'][i]);
                else
                    skillsArray = "";
                i += 1;
            } while (i < result.highlight['user.skill.name'].length);

        }

        if (Array.isArray(skillsArray)) {
            skillsText = skillsArray.join("</li><li>");
            skillsText = "<li>" + skillsText + "</li>";
        } else if (skillsArray != "") {
            skillsText = "<li>" + skillsArray + "</li>";
        }

        skillsText = "Skills: <ul>" + highlightedSkills + skillsText + "</ul>";

        return skillsText;
    };

    $scope.renderTotal = function(total) {

        var totalText = "";

        if (total)
            totalText = "Here you go, <strong>" + total + "</strong> kick-ass job seekers, you're welcome!";
        else
            totalText = "So you want job seekers, do you?";

        return totalText;

    };

});