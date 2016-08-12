import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  session: Ember.inject.service('session'),
  helpShowing: false,
  activeDeck: null,

  activateKeyboard: Ember.on('init', Ember.observer(
    'session.currentUser.enable_keyboard_shortcuts',
    function () {
      const keyboardActivated = this.get('session.currentUser.enable_keyboard_shortcuts');
      this.set('keyboardActivated', keyboardActivated);
    }
  )
  ),

  toggleHelp: Ember.on(keyDown('shift+Slash'), function () {
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

  prevMode: Ember.on(keyDown('ArrowLeft'), function () {
    const routes = this.get('routeOrder');
    const routeName = this.get('currentRouteName');
    const idx = routes.findIndex((elem) => elem === routeName);
    const prevIdx = idx - 1;
    if (idx >= 0 && prevIdx >= 0) {
      const prevRouteName = routes[prevIdx];
      this.transitionToRoute(prevRouteName);
    }
  }),

  nextMode: Ember.on(keyDown('ArrowRight'), function () {
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

  showHelp () {
    this.set('helpShowing', true);
  },

  hideHelp () {
    this.set('helpShowing', false);
  },

  actions: {
    invalidateSession () {
      this.get('session').invalidate();
    },

    setActiveDeck (deck) {
      this.set('activeDeck', deck);
    }
  }
});
