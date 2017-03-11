
module.exports = function(config) {
	config.set({
		logLevel: config.LOG_INFO,
		basepath: '',
		frameworks: ['jasmine'],
		files: [
			'src/client/bower_components/jquery/dist/jquery.js',
			'src/client/bower_components/angular/angular.js',
			'src/client/bower_components/angular-mocks/angular-mocks.js',
			'src/client/app/app.module.js',
			'src/client/app/**/*.module.js',
			'src/client/app/**/*.js',
			'src/client/test/unit/**/*.js',
			'src/client/test/integration/**/*.js',
			'src/client/**/*.html'
		],
		exclude: [
		],
		preprocessors: {
			'**/*.html': 'ng-html2js'
		},
		reporters: ['spec'],
		colors: true,
		autoWatch: true,
		browsers: ['PhantomJS', 'Chrome'],
		hostname: process.env.IP,
		port: process.env.PORT,
		runnerPort: 0,
		singleRun: false,
		ngHtml2JsPreprocessor: {
			stripPrefix: 'src/client/',
			moduleName: 'templates'
		}
    });
}
