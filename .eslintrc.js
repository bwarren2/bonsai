var path = require('path');

module.exports = {
  globals: {
    "document": true,
    "cytoscape": true,
    "dagre": true,
    "cydagre": true,
    "window": true,
    "-Promise": true
  },
  extends: [
    require.resolve('ember-cli-eslint/coding-standard/ember-application.js')
  ]
};
