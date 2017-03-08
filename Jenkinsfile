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
		sh "tar -C PeopleHistory -czvf $dockerContext . --exclude=.git --exclude=node_modules --exclude=*.log"
		archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
		stash includes: '*.tar.gz', name: 'DockerContext'
}
node('docker') {
	stage 'Deploy for E2E testing'
		unstash 'DockerContext'
		sh "docker build -t gvasko/people-history-ui:latest - < $dockerContext"
		def containerId = sh(script: 'docker run -dt --name peoplehistory-$BUILD_NUMBER gvasko/people-history-ui', returnStdout: true).trim()
		def jqCmd = 'jq -r \'.[0].Containers."' + containerId + '".IPv4Address\''
		def networkText = sh(script: "docker network inspect bridge", returnStdout: true).trim()
		def slurper = new groovy.json.JsonSlurper()
		def networks = slurper.parseText(networkText)
		def localIP = networks[0].Containers."$containerId".IPv4Address
		println localIP
}
