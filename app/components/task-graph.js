import d3 from 'd3';
import Ember from 'ember';
import _ from 'lodash/lodash';
const { RSVP } = Ember;

export default Ember.Component.extend({
  didRender () {
    // Ember's path component shenanigans break SVG marker IDs, so we need to
    // prepend the path component we actually see right now, to make markers
    // work.
    const currentPath = history.state.path;
    const elementId = `#${this.get('elementId')}`;
    const vis = d3.select(elementId).append("svg");

    const w = 200,
      h = 200;
    vis.attr("width", w)
      .attr("height", h);

    // Mutate data for just the moment:
    // We need to put the data on the objects so that the call to .afters below
    // will pick it up correctly.
    this.get('data').forEach(
      (task) => {
        task.x = Math.random() * w;
        task.y = Math.random() * h;
      }
    );

    RSVP.all(this.get('data').map((task) => {
      return task.get('afters').then((afters) => afters.map(
        (after) => ({
          source: {
            x: task.x,
            y: task.y
          },
          target: {
            x: after.x,
            y: after.y
          }
        })
      ));
    })).then((resolvedEdges) => {
      const nodes = this.get('data').map(
        (task) => ({
          x: task.x,
          y: task.y
        })
      );
      const edges = _.flatten(resolvedEdges);
      // Set up svg elements:
      vis.append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 1)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "gray");

      vis.selectAll("circle .nodes")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "nodes")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", "5px")
        .attr("fill", "black");

      vis.selectAll(".line")
        .data(edges)
        .enter()
        .append("line")
      // TODO offset these by the length of the arrow + the radius of the circle.
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 2)
        .attr("marker-end", `url(${currentPath}#arrow)`);
    });
  }
});
