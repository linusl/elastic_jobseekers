describe('utils', function () {
	beforeEach(function() {

        module('searchApp');

        inject(function (utilsService) {
            utilsServiceInst = utilsService;
        });
    });

    // Tests the age function in utilsService.
    describe('age', function () {
        it('should give back the age based on birthdate', function () {
            utilsServiceInst.age();
            expect(utilsServiceInst.age('1976-04-09')).toEqual(37);
        })
    });

    // Tests the formatHighlight function in utilsService.
    describe('formatHighlight', function () {
        it('should highlight the given string', function () {
            utilsServiceInst.formatHighlight();
            expect(utilsServiceInst.formatHighlight('Apa')).toEqual('<b><em>Apa</em></b>');
        })
    });

});