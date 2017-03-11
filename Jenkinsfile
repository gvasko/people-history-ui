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
		stash includes: './*.* src/client/test/e2e/**', name: 'E2ETesting'
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
	return localIP.split("/")[0];
}

def app
def chrome
def firefox

node('docker') {
	try {
		stage 'Deploy for E2E testing'
			unstash 'DockerContext'
			sh "docker build -t gvasko/people-history-ui:latest - < $dockerContext"

			unstash 'E2ETesting'

			app = runContainerWithName('gvasko/people-history-ui', "peoplehistory-${env.BUILD_NUMBER}")
			def appIP = getLocalIPOfContainer(app)
			chrome = runContainerWithName('selenium/standalone-chrome', "chrome-${env.BUILD_NUMBER}")
			def chromeIP = getLocalIPOfContainer(chrome)
			firefox = runContainerWithName('selenium/standalone-firefox', "firefox-${env.BUILD_NUMBER}")
			def firefoxIP = getLocalIPOfContainer(firefox)

		stage 'Run E2E tests'
			parallel (
				chrome: {
					npm run e2e-test-chrome -- --baseUrl="$appIP" --seleniumAddress="http://$chromeIP:4444/wd/hub"
				},
				firefox: {
					npm run e2e-test-firefox -- --baseUrl="$appIP" --seleniumAddress="http://$firefoxIP:4444/wd/hub"
				}
			)
	}
	finally {
		stage 'Finalizing and archiving'
			if (app) {
				stopContainer(app)
			}
			if (chrome) {
				stopContainer(chrome)
			}
			if (firefox) {
				stopContainer(firefox)
			}
			junit 'testresults/*.xml'
	}
}


