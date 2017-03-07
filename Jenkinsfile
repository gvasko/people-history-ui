node('nodejs') {
	stage 'Checkout'
		checkout scm

	stage 'Resolve dependencies'
		sh 'npm install'
		sh 'bower install'

	stage 'Test on PhantomJS'
		sh 'npm run ci-test-phantomjs'

	stage 'Archiving'
		sh 'zip PeopleHistory-$BUILD_NUMBER -r .'
		archiveArtifacts artifacts: '*.zip', fingerprint: true

}
