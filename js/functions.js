/**
 * Created by linusl on 2014-03-27.
 */

searchApp.service('utilsService', function () {

    this.age = function(birthdate) {

        var birth = new Date(birthdate);
        var curr  = new Date();
        var diff = curr.getTime() - birth.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    };

    this.formatHighlight = function(item) {

        return "<b><em>" + item + "</em></b>";

    };

});