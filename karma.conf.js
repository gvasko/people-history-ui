
module.exports = function(config) {
	config.set({
		basepath: '',
		frameworks: ['jasmine'],
		files: [
			'src/client/bower_components/jquery/dist/jquery.js',
			'src/client/bower_components/angular/angular.js',
			'src/client/bower_components/angular-mocks/angular-mocks.js',
			'src/client/app/app.module.js',
			'src/client/app/**/*.module.js',
			'src/client/app/**/*.js',
			'src/client/unittest/**/*.test.js'
		],
		exclude: [
		],
		preprocessors: {
		},
		reporters: ['spec'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		hostname: process.env.IP,
		port: process.env.PORT,
		runnerPort: 0,
		singleRun: false
	})
}
