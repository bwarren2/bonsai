import Ember from 'ember';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import { initializeAnimationLoop, boom } from '../particle-effect';

export default Ember.Component.extend(InboundActions, {
  animationLoops: [],

  didRender () {
    this._super(...arguments);
    const context2D = this.$("canvas").get(0).getContext("2d");
    const animationLoop = initializeAnimationLoop(context2D);
    const animationLoops = this.get('animationLoops');
    animationLoops.push(animationLoop);
    this.set('animationLoops', animationLoops);
  },

  willDestroyElement () {
    this._super(...arguments);
    const animationLoops = this.get('animationLoops');
    animationLoops.forEach((animationLoop) => {
      clearInterval(animationLoop);
    });
    this.set('animationLoop', []);
  },

  totalTasks: Ember.computed(
    'tasks.[]',
    function () {
      return this.get('tasks.length');
    }
  ),

  taskPercentage: Ember.computed(
    'totalTasks',
    function () {
      return 100 / this.get('totalTasks');
    }
  ),

  completedTasks: Ember.computed(
    'tasks.[]',
    'tasks.@each.isCompleted',
    function () {
      return this.get('tasks').filter(
        (elem) => elem.get('isCompleted')
      ).length;
    }
  ),

  remainingTasks: Ember.computed(
    'totalTasks',
    'completedTasks',
    function () {
      const totalTasks = this.get('totalTasks');
      const completedTasks = this.get('completedTasks');
      return totalTasks - completedTasks;
    }
  ),

  percentCompleted: Ember.computed(
    'totalTasks',
    'completedTasks',
    function () {
      const completedTasks = this.get('completedTasks');
      const totalTasks = this.get('totalTasks');
      let value;
      if (totalTasks > 0) {
        value = Math.round((completedTasks / totalTasks) * 100)
      } else {
        value = 0;
      }
      if (value === 100) {
        boom();
      }
      return value;
    }
  ),

  actions: {
    incrementCount () {
      // Increase percentCompleted from current to current + taskPercentage,
      // over animationDuration milliseconds.
      const duration = this.get('animationDuration');
      const percentCompleted = this.get('percentCompleted') / 100;
      const taskPercentage = this.get('taskPercentage') / 100;
      const progressBarWidth = this.$('.progress').outerWidth();
      const originPixelWidth = (
        progressBarWidth * percentCompleted
      );
      const destinationPixelWidth = (
        progressBarWidth * taskPercentage
          + progressBarWidth * percentCompleted
      );
      d4.select(this.$('.progress-bar').get(0))
        .style('width', `${originPixelWidth}px`)
        .transition()
        .duration(duration)
        .style('width', `${destinationPixelWidth}px`)
      ;
    }
  }
});
