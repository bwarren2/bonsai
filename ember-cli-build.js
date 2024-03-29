/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-bootstrap': {
      importBootstrapTheme: true
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import(app.bowerDirectory + '/cytoscape/dist/cytoscape.min.js');
  app.import(app.bowerDirectory + '/lodash/lodash.min.js');
  app.import(app.bowerDirectory + '/graphlib/dist/graphlib.core.min.js');
  app.import(app.bowerDirectory + '/dagre/dist/dagre.core.min.js');
  app.import(app.bowerDirectory + '/cytoscape-dagre/cytoscape-dagre.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
    destDir: '/assets/bootstrap'
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
    destDir: '/assets/bootstrap'
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
    destDir: '/assets/bootstrap'
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
    destDir: '/assets/bootstrap'
  });
  app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
    destDir: '/assets/bootstrap'
  });

  app.import(app.bowerDirectory + '/d4/d4.js');
  app.import('vendor/bootsketch/bootsketch.css');
  app.import('vendor/cytoscape-edgehandles/cytoscape-edgehandles.js');

  return app.toTree();
};
