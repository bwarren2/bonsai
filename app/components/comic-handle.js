import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  classNameBindings: ['flickering'],
  flickering: Ember.computed(
    'session.currentUser.show_help_brainstorm',
    'session.currentUser.show_help_refine',
    'session.currentUser.show_help_plan',
    'session.currentUser.show_help_refine',
    'session.currentUser.show_help_execute',

    function(){
    const currentHelp = `show_help_${this.get('kind')}`;
    const currentUser = this.get('session.currentUser');
    const currentSetting = currentUser.get(currentHelp);

    return currentSetting;
  }),

  actions: {
    toggleHelp () {
      console.log("hi");
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
