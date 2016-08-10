import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  session: Ember.inject.service('session'),
  helpShowing: false,
  activeDeck: null,

  tasks: Ember.computed('model.tasks', 'activeDeck', function () {
    const activeDeck = this.get('activeDeck');
    if (activeDeck) {
      return this.get('model.tasks').filter((task) => {
        return task.get('deck.id') === activeDeck.get('id');
      });
    }
    return this.get('model.tasks');
  }),

  activateKeyboard: Ember.on('init', function () {
    this.set('keyboardActivated', true);
  }),

  toggleHelp: Ember.on(keyDown('shift+Slash'), function () {
    if (this.get('helpShowing')) {
      this.hideHelp();
    } else {
      this.showHelp();
    }
  }),

  showHelp () {
    this.set('helpShowing', true);
  },

  hideHelp () {
    this.set('helpShowing', false);
  },

  nextMode: Ember.on(keyDown('cmd+Enter'), function () {
    // TODO go to next
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },

    setActiveDeck (deck) {
      this.set('activeDeck', deck);
    }
  }
});
