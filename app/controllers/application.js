import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  session: Ember.inject.service('session'),
  helpShowing: false,

  activateKeyboard: Ember.on('init', function () {
    console.log('activating keyboard');
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

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
