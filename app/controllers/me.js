import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  successMessage: false,
  errors: null,

  old_password: null,
  new_password1: null,
  new_password2: null,

  actions: {
    updatePassword () {
      const old_password = this.get('old_password');
      const new_password1 = this.get('new_password1');
      const new_password2 = this.get('new_password2');
      const host = config.APP.API_HOST;
      const namespace = config.APP.API_NAMESPACE;
      const user_id = this.get('model').get('id');
      const set_password_url = `${host}/${namespace}/users/${user_id}/set_password/`;
      this.get('session').authorize('authorizer:token',
        (headerName, headerValue) => {
          const headers = {};
          headers[headerName] = headerValue;
          Ember.$.ajax({
            url: set_password_url,
            headers,
            method: 'POST',
            data: {
              old_password,
              new_password1,
              new_password2
            }
          }).then(
            () => {
              console.log('successfully set password');
              this.set('successMessage', true);
              this.set('errors', null);
              this.set('old_password', null);
              this.set('new_password1', null);
              this.set('new_password2', null);
            },
            (errors) => {
              console.log('error setting password');
              this.set('errors', errors.responseJSON);
              this.set('successMessage', false);
            }
          );
        }
      );
    }
  }
});
