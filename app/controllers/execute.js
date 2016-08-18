import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';
import _ from 'lodash';
import { initializeAnimationLoop, boom } from '../particle-effect';

export default Ember.Controller.extend(FilteredTasks, {
  activeDeck: Ember.computed.alias('application.activeDeck'),
  animationLoopInitialized: false,

  totalTasks: Ember.computed(
    'activeDeck',
    'tasks.[]',
    'tasks.@each.isCompleted',
    function () {
      const activeDeck = this.get('activeDeck');
      if (activeDeck) {
        return Ember.RSVP.resolve(activeDeck.get('task_set.length'));
      } else {
        const deckTaskLists = this.get('decks').map((deck) => deck.get('task_set'));
        return Ember.RSVP.all(deckTaskLists).then((taskLists) => {
          return _.sum(taskLists.map((elem) => elem.length));
        });
      }
    }
  ),

  completedTasks: Ember.computed(
    'activeDeck',
    'tasks.[]',
    'tasks.@each.isCompleted',
    function () {
      const activeDeck = this.get('activeDeck');
      if (activeDeck) {
        return activeDeck.get('task_set').then((taskSet) => {
          return taskSet.filter(
            (elem) => elem.get('isCompleted')
          ).length;
        });
      } else {
        const deckTaskLists = this.get('decks').map((deck) => deck.get('task_set'));
        return Ember.RSVP.all(deckTaskLists).then((taskLists) => {
          return _.sum(taskLists.map(
            (elem) => elem.filter((elem) => elem.get('isCompleted')).length
          ));
        });
      }
    }
  ),

  remainingTasks: Ember.computed(
    'totalTasks',
    'completedTasks',
    function () {
      return Ember.RSVP.hash({
        totalTasks: this.get('totalTasks'),
        completedTasks: this.get('completedTasks')
      }).then((hash) => {
        const {
          totalTasks,
          completedTasks
        } = hash;
        return totalTasks - completedTasks;
      });
    }
  ),

  percentCompleted: Ember.computed(
    'totalTasks',
    'completedTasks',
    function () {
      return Ember.RSVP.hash({
        completedTasks: this.get('completedTasks'),
        totalTasks: this.get('totalTasks')
      }).then((hash) => {
        const {
          completedTasks,
          totalTasks
        } = hash;
        if (totalTasks > 0) {
          return Math.round((completedTasks / totalTasks) * 100)
        } else {
          return 0;
        }
      });
    }
  ),

  actions: {
    complete (task) {
      task.set('pendingCompletion', true);
      this.get('remainingTasks').then((remainingTasks) => {
        if (remainingTasks <= 1) {
          if (!this.get('animationLoopInitialized')) {
            const context2D = $(".progress-container canvas").get(0).getContext("2d");
            initializeAnimationLoop(context2D);
            this.set('animationLoopInitialized', true);
          }
          boom();
        }
      });
      // Run later to allow animation to complete.
      Ember.run.later(this, () => {
        task.set('pendingCompletion', false);
        task.complete();
      }, 500);
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
