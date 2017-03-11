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
		stash includes: './*.*; src/client/test/e2e', name: 'E2ETesting'
}
node('docker') {
	try {
		stage 'Deploy for E2E testing'
			unstash 'DockerContext'
			sh "docker build -t gvasko/people-history-ui:latest - < $dockerContext"

			unstash 'E2ETesting'

			def app = runContainerWithName('gvasko/people-history-ui', "peoplehistory-${env.BUILD_NUMBER}")
			def appIP = getLocalIPOfContainer(app)
			def chrome = runContainerWithName('selenium/standalone-chrome', "chrome-${env.BUILD_NUMBER}")
			def chromeIP = getLocalIPOfContainer(chrome)
			def firefox = runContainerWithName('selenium/standalone-firefox', "firefox-${env.BUILD_NUMBER}")
			def firefoxIP = getLocalIPOfContainer(firefox)

		stage 'Run E2E tests'
			parallel (
				chrome: {
					npm run e2e-test-chrome
				},
				firefox: {
					npm run e2e-test-firefox			
				}
			)

	}
	finally {
		stage 'Finalizing and archiving'
			stopContainer(app)
			stopContainer(chrome)
			stopContainer(firefox)
			junit 'testresults/*.xml'
	}
}

def runContainerWithName(String imageId, String name) {
	def containerId = sh(script: "docker run -dt --name $name $imageId", returnStdout: true).trim()
	return containerId
}

def stopContainer(String containerId) {
	sh "docker stop $containerId && docker rm $containerId"
}

def getLocalIPOfContainer(String containerId) {
	def networkText = sh(script: "docker network inspect bridge", returnStdout: true).trim()
	def slurper = new groovy.json.JsonSlurper()
	def networks = slurper.parseText(networkText)
	def localIP = networks[0].Containers."$containerId".IPv4Address
	return localIP
}

