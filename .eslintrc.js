var path = require('path');

module.exports = {
  globals: {
    "document": true,
    "cytoscape": true,
    "dagre": true,
    "cydagre": true,
    "window": true,
    "d3": true,
    "-Promise": true
  },
  extends: [
    require.resolve('ember-cli-eslint/coding-standard/ember-application.js')
  ]
};
