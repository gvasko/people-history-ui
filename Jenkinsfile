def dockerContext = 'PeopleHistory-dockerctx.tar.gz'

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
		sh "tar -czvf $dockerContext . --exclude=*.zip --exclude=node_modules --exclude=*.log"
		archiveArtifacts artifacts: '*.zip', fingerprint: true
		stash includes: '*.tar.gz', name: 'DockerContext'
}
node('docker') {
	stage 'Deploy for E2E testing'
		unstash 'DockerContext'
		sh "docker build -t gvasko/PeopleHistory:latest - < $dockerContext"
}
