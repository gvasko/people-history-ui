describe('Document list', function() {
	
	beforeEach(function() {
		browser.get('/#/home');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('PeopleHistory');
	});

});
