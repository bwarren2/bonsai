import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let credentials = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:token', credentials).catch((error) => {
        this.set('errorMessage', error);
      });
    }
  }
});