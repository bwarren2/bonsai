import Ember from 'ember';
import { initializeAnimationLoop, boom } from '../particle-effect';

export default Ember.Component.extend({
  animationLoopInitialized: false,

  didRender () {
    const context2D = this.$("canvas").get(0).getContext("2d");
    initializeAnimationLoop(context2D);
  },

  totalTasks: Ember.computed(
    'tasks.[]',
    function () {
      return this.get('tasks.length');
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
        // TODO this introduces a race, as the component re-renders before the
        // animation can complete.
        boom();
      }
      return value;
    }
  )
});
