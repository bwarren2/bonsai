import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model (params) {
    const host = config.APP.API_HOST;
    const namespace = config.APP.API_NAMESPACE;
    const url = `${host}/${namespace}/auth/activate/`;
    const headers = {};
    const data = params;
    return Ember.$.ajax({
      url,
      headers,
      method: 'POST',
      data
    }).then(
      () => ({ success: true }),
      () => ({ success: false })
    );
  }
});
