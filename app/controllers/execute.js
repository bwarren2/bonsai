import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';
import _ from 'lodash';

export default Ember.Controller.extend(FilteredTasks, {
  activeDeck: Ember.computed.alias('application.activeDeck'),

  percentCompleted: Ember.computed(
    'activeDeck',
    'tasks.[]',
    'tasks.@each.isCompleted',
    function () {
      const activeDeck = this.get('activeDeck');
      if (activeDeck) {
        return activeDeck.get('task_set').then((taskSet) => {
          const totalLength = taskSet.length;
          const completedLength = taskSet.filter(
            (elem) => elem.get('isCompleted')
          ).length;
          return Math.round((completedLength / totalLength) * 100);
        });
      } else {
        const deckTaskLists = this.get('decks').map((deck) => deck.get('task_set'));
        return Ember.RSVP.all(deckTaskLists).then((taskLists) => {
          const totalLength = _.sum(taskLists.map((elem) => elem.length));
          const completedLength = _.sum(taskLists.map(
            (elem) => elem.filter((elem) => elem.get('isCompleted')).length
          ));
          return Math.round((completedLength / totalLength) * 100);
        });
      }
    }
  ),

  actions: {
    complete (task) {
      task.set('pendingCompletion', true);
      // Run later to allow animation to complete.
      Ember.run.later(this, () => {
        task.complete();
      }, 500);
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
