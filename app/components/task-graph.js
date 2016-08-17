import Ember from 'ember';
import _ from 'lodash/lodash';
import toposort from '../toposort';

const { RSVP } = Ember;

export default Ember.Component.extend({
  graphReady: false,
  zoomLevel: 1,
  panPosition: {
    x: 50,
    y: 50
  },

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
    const element = this.$('.cy');
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
            },
            position: {
              x: task.get('graph_x'),
              y: task.get('graph_y')
            },
            classes: task.get('isCompleted') ? 'complete' : ''
          })
        );
        const edges = _.flatten(resolvedEdges);
        return { nodes, edges };
      }).then((hash) => {
        const { nodes, edges } = hash;

        // cytoscape comes from bower installs, so is globally available.
        const cy = this.cy = cytoscape({
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
              selector: 'node.complete',
              style: {
                'text-opacity': 0.7,
                'opacity': 0.3
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

          layout: { name: 'preset' }
        });

        // Events:
        cy.on('tap', 'edge', (evt) => {
          const sourceNodeId = evt.cyTarget.data().source;
          const targetNodeId = evt.cyTarget.data().target;
          comp.sendAction('removeAfter', sourceNodeId, targetNodeId);
        });
        cy.on('free', 'node', (evt) => {
          this.saveNodePosition(evt.cyTarget);
        });
        cy.on('pan', () => {
          this.set('panPosition', cy.pan());
        });
        cy.on('zoom', () => {
          this.set('zoomLevel', cy.zoom());
        });
        cy.on('mouseover', 'node', (evt) => {
          const task = this.get('data').find((task) => task.get('id') === evt.cyTarget.id());
          this.$('#task-details').html(task.get('details'));
        });
        cy.on('mouseout', 'node', () => {
          this.$('#task-details').html('');
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
        cy.pan(this.get('panPosition'));
        cy.zoom(this.get('zoomLevel'));
      });
    });
  },

  saveNodePosition (node) {
    const nodeId = node.id();
    const { x, y } = node.point();
    const task = this.get('data').find(
      (elem) => elem.get('id') === nodeId
    );
    task.setProperties({
      graph_x: x,
      graph_y: y
    });
    task.save();
  },

  doLayout (name) {
    this.cy.layout({ name });
    // Save new layout:
    this.cy.nodes().forEach((node) => {
      this.saveNodePosition(node);
    });
  },

  actions: {
    cleanUp () {
      if (Boolean(this.cy)) {
        this.doLayout('dagre');
      }
    },

    zoomIn () {
      if (Boolean(this.cy)) {
        const zoom = this.cy.zoom() + 0.2;
        this.cy.zoom(zoom);
      }
    },

    zoomOut () {
      if (Boolean(this.cy)) {
        const zoom = this.cy.zoom() - 0.2;
        this.cy.zoom(zoom);
      }
    },

    resetPanZoom () {
      if (Boolean(this.cy)) {
        this.cy.pan({
          x: 50,
          y: 50
        });
        this.cy.zoom(1);
      }
    }
  }
});
