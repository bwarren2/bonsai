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
  )
});
