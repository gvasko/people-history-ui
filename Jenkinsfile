def dockerContext = 'PeopleHistory-dockerctx.tar.gz'
def dockerRegistry = '221820444680.dkr.ecr.eu-central-1.amazonaws.com'

def newTag = 'unknown'

node('docker') {
	newTag = getNextDockerTag()
}

currentBuild.displayName = "#${newTag}-${env.BUILD_NUMBER}"
currentBuild.description = "<a href=\"https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/new?stackName=PeopleHistoryDemo-${newTag}&templateURL=https://s3.eu-central-1.amazonaws.com/gvasko/people-history/people-history-${newTag}.json\" target=\"_blank\"><span><img src=\"https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png\"></span></a>"

node('nodejs') {
	stage('Build') {
		dir('PeopleHistory') {
			checkout scm
			sh 'npm install'
			sh 'bower install'
			sh 'npm run ci-test-phantomjs'
			sh "sed -i 's/@TAG@/$newTag/' src/client/tag.json"
		}
		sh "tar -C PeopleHistory -czvf $dockerContext . --exclude=.git --exclude=node_modules --exclude=*.log"
		archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
		stash includes: '*.tar.gz', name: 'DockerContext'
		stash includes: 'PeopleHistory/resources/*', name: 'Resources'
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

def getNextDockerTag() {
	def imageIdsText = sh(script: "aws ecr list-images --repository-name gvasko/people-history-ui --filter tagStatus=\"TAGGED\" --region eu-central-1", returnStdout: true).trim()
	def slurper = new groovy.json.JsonSlurper()
	def imageIds = slurper.parseText(imageIdsText)
	def lastTag = 0
	for (int i=0; i < imageIds.imageIds.size(); i++) {
		def img = imageIds.imageIds[i]
		def isInteger = (img.imageTag ==~ /\d+/)
		if (isInteger) {
			def imageTagInt = Integer.parseInt(img.imageTag)
			if (imageTagInt > lastTag) {
				lastTag = imageTagInt
			}
		}
	}
	return lastTag + 1	
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

			app = runContainerWithName('gvasko/people-history-ui', "peoplehistory-${env.BUILD_NUMBER}")
			appIP = getLocalIPOfContainer(app)
			chrome = runContainerWithName("$dockerRegistry/selenium/standalone-chrome", "chrome-${env.BUILD_NUMBER}")
			chromeIP = getLocalIPOfContainer(chrome)
			firefox = runContainerWithName("$dockerRegistry/selenium/standalone-firefox", "firefox-${env.BUILD_NUMBER}")
			firefoxIP = getLocalIPOfContainer(firefox)
		}

		def chromeSuccessful = true
		def firefoxSuccessful = true
	    node('nodejs') {
			stage('E2E Test') {
				dir('PeopleHistory') {
					chromeSuccessful = sh(script: "npm run e2e-test-chrome -- --baseUrl=http://$appIP:8080 --seleniumAddress=http://$chromeIP:4444/wd/hub", returnStatus: true) == 0
					firefoxSuccessful = sh(script: "npm run e2e-test-firefox -- --baseUrl=http://$appIP:8080 --seleniumAddress=http://$firefoxIP:4444/wd/hub", returnStatus: true) == 0
    	    		stash includes: 'testresults/*.xml', name: 'TestResults'
				}
			}
		}
		stage('Publish') {
    		unstash 'TestResults'
    		unstash 'Resources'
			junit 'testresults/*.xml'
			if (chromeSuccessful && firefoxSuccessful) {
				sh "docker tag gvasko/people-history-ui:latest $dockerRegistry/gvasko/people-history-ui:latest"
				sh "docker tag gvasko/people-history-ui:latest $dockerRegistry/gvasko/people-history-ui:$newTag"
				sh "docker push $dockerRegistry/gvasko/people-history-ui:$newTag"
				sh "docker push $dockerRegistry/gvasko/people-history-ui:latest"
				def iamUser = sh(script: "cat ~/.aws/credentials | grep 'aws_access_key_id' | tr -d '[:space:]' | cut -d= -f2", returnStdout: true).trim()
				def iamSecret = sh(script: "cat ~/.aws/credentials | grep 'aws_secret_access_key' | tr -d '[:space:]' | cut -d= -f2", returnStdout: true).trim()

				dir('PeopleHistory/resources') {
					sh "sed -i 's%@TAG@%$newTag%g' deploy-to-aws.html"				
					sh "sed -i 's%@APP_DESCRIPTION@%PeopleHistoryDemo-$newTag%' cfn-demo-deploy.json"
					sh "sed -i 's%@IAM_USER@%$iamUser%' cfn-demo-deploy.json"
					sh "sed -i 's%@IAM_SECRET@%$iamSecret%' cfn-demo-deploy.json"
					sh "sed -i 's%@DOCKER_IMAGE@%$dockerRegistry/gvasko/people-history-ui:$newTag%' cfn-demo-deploy.json"
					sh "aws s3 cp cfn-demo-deploy.json s3://gvasko/people-history/people-history-${newTag}.json"
				}
				publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'PeopleHistory/resources', reportFiles: 'deploy-to-aws.html', reportName: 'Deploy to AWS'])
			}
		}
	}
	finally {
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


