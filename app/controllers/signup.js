import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    signUp () {
      let data = this.getProperties(
        'username',
        'email',
        'password1',
        'password2'
      );
      if (data.password1 !== data.password2) {
        this.set('errorMessage', {
          non_field_errors: ['Your passwords must match.']
        });
        return;
      }
      data.username = data.username.toLowerCase();
      data.password = data.password1;
      delete data.password1;
      delete data.password2;
      const host = config.APP.API_HOST;
      const namespace = config.APP.API_NAMESPACE;
      const url = `${host}/${namespace}/auth/register/`;
      const headers = {};
      Ember.$.ajax({
        url,
        headers,
        method: 'POST',
        data
      }).then(
        (data) => {
          this.set('errorMessage', {});
          this.set('successMessage', "Thanks! Check your email for a confirmation link.");
        },
        (errors) => {
          this.set('errorMessage', errors.responseJSON);
        }
      )
    }
  }
});
