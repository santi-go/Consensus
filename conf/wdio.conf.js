exports.config = {
  specs: [
    './test/e2e/**/*.js'
  ],
  mochaOpts: {
    timeout: 40000
  },
  maxInstances: 1,
  host: 'selenium',
  port: 4444,
  baseUrl: 'http://consensus:8080',
  capabilities: [{
    browserName: 'chrome'
  }],
  reporters: ['spec']
}
