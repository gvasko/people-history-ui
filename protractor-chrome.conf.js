
exports.config = {
      capabilities: {
            'browserName': 'chrome'
      },
      framework: 'jasmine2',
      onPrepare: function() {
            var jasmineReporters = require('jasmine-reporters');
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                  consolidateAll: true,
                  savePath: 'testresults',
                  package: 'chrome',
                  filePrefix: 'chrome'
            }));
      },
      specs: ['src/client/test/e2e/documents.test.js']
};
