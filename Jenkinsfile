node('nodejs') {
	stage 'Checkout'
		checkout scm

	stage 'Resolve dependencies'
		npm install
		bower install

	stage 'Test on PhantomJS'
		sh 'npm run ci-test-phantomjs'

}
