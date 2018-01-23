exports.config = {
  specs: [
    './test/e2e/**/*.js'
  ],
  mochaOpts: {
    timeout: 20000
  },
  maxInstances: 1,
  host: 'selenium',
  port: 4444,
  baseUrl: 'http://consensus',
  capabilities: [{
    browserName: 'chrome'
  }],
  reporters: ['spec']
}
