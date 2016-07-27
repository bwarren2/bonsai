/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bonsai',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.API_HOST = 'http://localhost:8000';
    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:8000/api/token-auth/',
      authorizationPrefix: 'Token '
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://some-heroku-app.herokuapp.com';
  }

  return ENV;
};
