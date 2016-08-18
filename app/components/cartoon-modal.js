import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  setMarginTop: Ember.on(
    'didRender',
    Ember.observer(
      'help',
      function () {
        const height = this.$('.help').height();
        const marginTopOffset = height - 20;

        const currentHelp = `show_help_${this.get('kind')}`;
        const currentUser = this.get('session.currentUser');
        const currentSetting = currentUser.get(currentHelp);
        this.$('.help').css({
          'margin-top': currentSetting ? 0 : -marginTopOffset
        });
      }
    )
  ),

  actions: {
    toggleHelp () {
      // Debounce by running in Ember.run
      Ember.run(this, function () {
        const currentHelp = `show_help_${this.get('kind')}`;
        const currentUser = this.get('session.currentUser');
        const currentSetting = currentUser.get(currentHelp);
        currentUser.set(currentHelp, !currentSetting);
        this.get('store').findRecord(
          'user',
          currentUser.get('id')
        ).then((user) => user.save());
      }, 0);
    }
  }
});
