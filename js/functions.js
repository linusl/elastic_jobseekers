/**
 * Created by linusl on 2014-03-27.
 */

var age = function(birthdate) {

    var birth = new Date(birthdate);
    var curr  = new Date();
    var diff = curr.getTime() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

};

var formatHighlight = function(item) {

    return "<b><em>" + item + "</b></em>";

};

