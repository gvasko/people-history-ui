def dockerContext = 'PeopleHistory-dockerctx.tar.gz'
def dockerRegistry = '221820444680.dkr.ecr.eu-central-1.amazonaws.com'

node('nodejs') {
	stage('Build') {
		dir('PeopleHistory') {
			checkout scm
			sh 'npm install'
			sh 'bower install'
			sh 'npm run ci-test-phantomjs'
		}
		sh "tar -C PeopleHistory -czvf $dockerContext . --exclude=.git --exclude=node_modules --exclude=*.log"
		archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
		stash includes: '*.tar.gz', name: 'DockerContext'
		stash includes: 'PeopleHistory/*.*,PeopleHistory/src/client/test/e2e/**', name: 'E2ETesting'
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
	return localIP.split("/")[0];
}

def app
def chrome
def firefox

node('docker') {
	try {
		def appIP
		def chromeIP
		def firefoxIP
		
		stage('Deploy') {
			unstash 'DockerContext'
			sh "docker build -t gvasko/people-history-ui:latest - < $dockerContext"

			unstash 'E2ETesting'

			app = runContainerWithName('gvasko/people-history-ui', "peoplehistory-${env.BUILD_NUMBER}")
			appIP = getLocalIPOfContainer(app)
			chrome = runContainerWithName("$dockerRegistry/selenium/standalone-chrome", "chrome-${env.BUILD_NUMBER}")
			chromeIP = getLocalIPOfContainer(chrome)
			firefox = runContainerWithName("$dockerRegistry/selenium/standalone-firefox", "firefox-${env.BUILD_NUMBER}")
			firefoxIP = getLocalIPOfContainer(firefox)
		}

	    node('nodejs') {
			stage('E2E Test') {
				dir('PeopleHistory') {
					sh "npm run e2e-test-chrome -- --baseUrl=http://$appIP:8080 --seleniumAddress=http://$chromeIP:4444/wd/hub"
					sh "npm run e2e-test-firefox -- --baseUrl=http://$appIP:8080 --seleniumAddress=http://$firefoxIP:4444/wd/hub"
    	    		stash includes: 'testresults/*.xml', name: 'TestResults'
				}
			}
		}
	}
	finally {
		stage('Publish') {
    		unstash 'TestResults'
			junit 'testresults/*.xml'
		}
		stage('Cleanup') {
			if (app) {
				stopContainer(app)
			}
			if (chrome) {
				stopContainer(chrome)
			}
			if (firefox) {
				stopContainer(firefox)
			}
		}
	}
}


