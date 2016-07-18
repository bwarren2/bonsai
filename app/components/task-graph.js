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
    // Used in edgehandle callbacks below:
    const comp = this;

    RSVP.all(this.get('data').map(
      (task, idx) => task.get('afters').then((afters) => afters.map(
        (after, jdx) => ({
          data: {
            id: `edge-${jdx}-${idx}`,
            source: task.get('id'),
            target: after.get('id')
          }
        })
      ))
    )).then((resolvedEdges) => {
      const nodes = this.get('data').map(
        (task) => ({
          data: {
            id: task.get('id'),
            title: task.get('title')
          }
        })
      );
      const edges = _.flatten(resolvedEdges);
      // cytoscape comes from bower installs, so is globally available.
      const cy = cytoscape({
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
              'text-valign': 'center',
              'color': '#fff',
              'text-outline-color': '#666',
              'text-outline-width': 2,
              'label': 'data(title)'
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
        },

        userZoomingEnabled: false,
        userPanningEnabled: false
      });
      cy.edgehandles({
        toggleOffOnLeave: true,
        complete (sourceNode, targetNodes) {
          comp.sendAction('addAfter', sourceNode.id(), targetNodes[0].id());
        }
      });
    });
  }
});
