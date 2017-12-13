exports.config = {
  specs: [
    './test/e2e/**/*.js'
  ],
  maxInstances: 1,
  host: 'selenium',
  port: 4444,
  baseUrl: 'http://consensus',
  capabilities: [{
    browserName: 'chrome'
  }],
  reporters: ['spec']
}
