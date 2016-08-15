import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    closeHelp () {
      const currentUser = this.get('session.currentUser');
      currentUser.set('show_help', false);
      this.get('store').findRecord(
        'user',
        currentUser.get('id')
      ).then((user) => user.save());
    }
  }
});
