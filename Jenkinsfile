def dockerContext = 'PeopleHistory-dockerctx.tar.gz'

node('nodejs') {
	stage 'Checkout'
		dir('PeopleHistory') {
			checkout scm
		}

	stage 'Resolve dependencies'
		dir('PeopleHistory') {
			sh 'npm install'
			sh 'bower install'
		}

	stage 'Test on PhantomJS'
		dir('PeopleHistory') {
			sh 'npm run ci-test-phantomjs'
		}

	stage 'Archiving'
		sh "tar -czvf $dockerContext PeopleHistory --exclude=node_modules --exclude=*.log"
		archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
		stash includes: '*.tar.gz', name: 'DockerContext'
}
node('docker') {
	stage 'Deploy for E2E testing'
		unstash 'DockerContext'
		sh "docker build -t gvasko/PeopleHistory:latest - < $dockerContext"
}
