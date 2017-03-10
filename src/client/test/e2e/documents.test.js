describe('Document list', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:8080/#/home');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('PeopleHistory');
	});

});
