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
    },

    'ember-simple-auth': {
      authorizer: 'authorizer:token'
    },

    'ember-simple-auth-token': {
      authorizationPrefix: 'Token '
    }
  };

  if (environment === 'development') {
    ENV.APP.API_HOST = 'http://localhost:8000';
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
    ENV.APP.API_HOST = 'https://guarded-hamlet-24304.herokuapp.com';
    ENV.googleAnalytics = {
      webPropertyId: 'UA-81856824-1'
    };
  }

  ENV['ember-simple-auth-token']['serverTokenEndpoint'] = `${ENV.APP.API_HOST}/api/token-auth/`;

  return ENV;
};
