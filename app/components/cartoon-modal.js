import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  height: 0,
  marginTopOffset: 0,

  onInit: Ember.on('didRender', function () {
    const height = this.$('.help').height();
    const marginTopOffset = height - 20;

    this.setProperties({
      height,
      marginTopOffset
    });

    const currentHelp = `show_help_${this.get('kind')}`;
    const currentUser = this.get('session.currentUser');
    const currentSetting = currentUser.get(currentHelp);
    this.$('.help').css({
      'margin-top': currentSetting ? 0 : -marginTopOffset
    });
  }),

  actions: {
    toggleHelp () {
      // Debounce by running in Ember.run
      Ember.run(this, function () {
        const currentHelp = `show_help_${this.get('kind')}`;
        const currentUser = this.get('session.currentUser');
        const currentSetting = currentUser.get(currentHelp);
        const marginTopOffset = this.get('marginTopOffset');
        this.$('.help').css({
          'margin-top': currentSetting ? 0 : -marginTopOffset
        });
        currentUser.set(currentHelp, !currentSetting);
        this.get('store').findRecord(
          'user',
          currentUser.get('id')
        ).then((user) => user.save());
      }, 0);
    }
  }
});
