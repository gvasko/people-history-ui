
exports.config = {
      capabilities: {
            'browserName': 'firefox'
      },
      framework: 'jasmine2',
      onPrepare: function() {
            var jasmineReporters = require('jasmine-reporters');
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                  consolidateAll: true,
                  savePath: 'testresults',
                  package: 'firefox',
                  filePrefix: 'firefox'
            }));
      },
      specs: ['src/client/test/e2e/documents.test.js']
};
