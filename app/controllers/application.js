import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  session: Ember.inject.service(),
  activeDeck: Ember.inject.service(),
  showAddTaskModal: Ember.inject.service(),

  helpShowing: false,
  activeDeckId: Ember.computed.alias('activeDeck.deck'),

  activateKeyboard: Ember.on('init', Ember.observer(
    'session.currentUser.enable_keyboard_shortcuts',
    function () {
      const keyboardActivated = this.get('session.currentUser.enable_keyboard_shortcuts');
      this.set('keyboardActivated', keyboardActivated);
    }
  )
  ),

  keyboardToggleHelp: Ember.on(keyDown('shift+Slash'), function () {
    if (this.get('helpShowing')) {
      this.hideHelp();
    } else {
      this.showHelp();
    }
  }),

  routeOrder: [
    'brainstorm',
    'refine',
    'plan',
    'execute',
    'review'
  ],

  keyboardPrevMode: Ember.on(keyDown('ArrowLeft'), function () {
    const routes = this.get('routeOrder');
    const routeName = this.get('currentRouteName');
    const idx = routes.findIndex((elem) => elem === routeName);
    const prevIdx = idx - 1;
    if (idx >= 0 && prevIdx >= 0) {
      const prevRouteName = routes[prevIdx];
      this.transitionToRoute(prevRouteName);
    }
  }),

  keyboardNextMode: Ember.on(keyDown('ArrowRight'), function () {
    const routes = this.get('routeOrder');
    const routeName = this.get('currentRouteName');
    const idx = routes.findIndex((elem) => elem === routeName);
    const nextIdx = idx + 1;
    const maxIndex = routes.length - 1;
    if (idx >= 0 && nextIdx >= 0 && idx <= maxIndex && nextIdx <= maxIndex) {
      const nextRouteName = routes[nextIdx];
      this.transitionToRoute(nextRouteName);
    }
  }),

  keyboardShowAddTaskModal: Ember.on(keyDown('KeyA'), function () {
    this.set('showAddTaskModal.taskModalOpen', true);
  }),

  showHelp () {
    this.set('helpShowing', true);
  },

  hideHelp () {
    this.set('helpShowing', false);
  },

  actions: {
    invalidateSession () {
      this.get('session').invalidate();
    }
  }
});
