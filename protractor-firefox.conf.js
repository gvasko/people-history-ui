
exports.config = {
      capabilities: {
            'browserName': 'firefox'
      },
      framework: 'jasmine2',
      onPrepare: function() {
            var jasmineReporters = require('jasmine-reporters');
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                  consolidateAll: false,
                  savePath: 'testresults',
                  filePrefix: browserName,
                  modifySuiteName: function(generatedSuiteName, suite) {
                        return browserName + '.' + generatedSuiteName;
                  }
            }));
      },
      specs: ['src/client/test/e2e/documents.test.js']
};
