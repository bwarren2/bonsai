import Ember from 'ember';
import _ from 'lodash/lodash';

const { RSVP } = Ember;

export default Ember.Component.extend({
  didRender () {
    // Ember's path component shenanigans break SVG marker IDs, so we need to
    // prepend the path component we actually see right now, to make markers
    // work.
    // const currentPath = history.state.path;
    const element = this.get('element');
    this.$(element).addClass('cy');

    /* */
    RSVP.all(this.get('data').map((task, idx) => {
      return task.get('afters').then((afters) => afters.map(
        (after, jdx) => {
          return {
            data: {
              id: `edge-${jdx}-${idx}`,
              source: task.get('title'),
              target: after.get('title')
            }
          };
        }
      ));
    })).then((resolvedEdges) => {
      const nodes = this.get('data').map(
        (task) => ({ data: { id: task.get('title') } })
      );
      const edges = _.flatten(resolvedEdges);
      // cytoscape comes from bower installs, so is globally available.
      cytoscape({
        container: element,
        elements: [
          ...nodes,
          ...edges
        ],

        style: [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'text-valign': 'bottom',
              'label': 'data(id)'
            }
          },

          {
            selector: 'edge',
            style: {
              // The default haystack edges don't support arrows on the ends,
              // so:
              'curve-style': 'bezier',
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ],

        layout: {
          name: 'dagre'
        }
      });
    });
    /* */
  }
});
