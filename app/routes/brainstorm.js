import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthenticatedData from '../mixins/authenticated-data';

export default Ember.Route.extend(AuthenticatedRouteMixin, AuthenticatedData, {
  previousTransition: null,

  actions: {
    willTransition (transition) {
      const previousTransition = this.get('previousTransition');
      if (previousTransition) {
        previousTransition.retry();
      } else {
        const duration = 3 * 1000;
        const destination = {
          top: 17,
          right: 40,
          scale: 0.3
        };
        const finalDestination = {
          right: -1000
        };

        const jqSelect = Ember.$('.task-card');
        const initialWidth = jqSelect.outerWidth();
        const initialHeight = jqSelect.outerHeight();
        jqSelect.css({
          'width': initialWidth,
          'height': initialHeight
        });

        d4.selectAll('.task-card')
          .style('position', 'fixed')
          .transition()
          .duration(1500)
          .style('right', `${destination.right}px`)
          .style('top', `${destination.top}px`)
          .style('transform-origin', 'right')
          .style('transform', `scale(${destination.scale})`)
          .transition()
          .duration(duration)
          .style('right', `${finalDestination.right}px`)
        ;

        this.set('previousTransition', transition);
        transition.abort();
        Ember.run.later(this, () => {
          transition.retry();
        }, duration);
      }
    }
  }
});
