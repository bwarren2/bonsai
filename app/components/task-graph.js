import Ember from 'ember';
import _ from 'lodash/lodash';
import toposort from '../toposort';

const { RSVP } = Ember;

export default Ember.Component.extend({
  graphReady: false,

  /*
   * Returns a promise of [ [ from, to ], ... ]
   */
  getFullGraphInEdgeForm () {
    return RSVP.all(this.get('data').map(
      (task) => task.get('afters').then((afters) => afters.map(
        (after) => [ task.get('id'), after.get('id') ]
      ))
    )).then((resolvedEdges) => {
      return _.flatten(resolvedEdges);
    });
  },

  /*
   * This has to run after getFullGraphInEdgeForm has pinned the graph on the
   * component
   */
  wouldCreateCycle (taskId, targetId) {
    const graph = [...this.graph];
    graph.push([ taskId, targetId ]);
    try {
      toposort(graph);
      return false;
    } catch (e) {
      console.warn('would create cycle', graph, e);
      return true;
    }
  },

  didRender () {
    if (this.get('graphReady')) {
      this.renderGraph();
    } else {
      // Because animations take time, and then screw with the canvas click
      // events, we wait.
      Ember.run.later(() => {
        this.renderGraph();
      }, 1000);
    }
  },

  renderGraph () {
    this.set('graphReady', true);
    // Super-brittle, related to task-graph.hbs:
    const element = this.$(this.get('element')).children().children('.cy');
    element.addClass('activated');

    // Used in edgehandle callbacks below:
    const comp = this;
    this.getFullGraphInEdgeForm().then((graph) => {
      // Ugly hack.
      this.graph = graph;
    }).then(() => {
      const edgePromises = this.get('data').map(
        (task, idx) => task.get('afters').then((afters) => afters.map(
          (after, jdx) => ({
            data: {
              id: `edge-${jdx}-${idx}`,
              source: task.get('id'),
              target: after.get('id')
            }
          })
        ))
      );

      RSVP.all(edgePromises).then((resolvedEdges) => {
        const nodes = this.get('data').map(
          (task) => ({
            data: {
              id: task.get('id'),
              title: task.get('title')
            }
          })
        );
        const edges = _.flatten(resolvedEdges);
        return { nodes, edges };
      }).then((hash) => {
        const { nodes, edges } = hash;
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
          handleSize: 15,
          handleColor: 'rgba(255, 0, 0, 0.3)',
          hoverDelay: 0,

          edgeType (sourceNode, targetNode) {
            const cycle = comp.wouldCreateCycle(sourceNode.id(), targetNode.id());
            if (!cycle) {
              return 'flat';
            }
            return null;
          },

          complete (sourceNode, targetNodes) {
            const sourceNodeId = sourceNode.id();
            const targetNodeId = targetNodes[0].id();
            comp.sendAction('addAfter', sourceNodeId, targetNodeId);
          }
        });
      });
    });
  }
});
