import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthenticatedData from '../mixins/authenticated-data';

export default Ember.Route.extend(AuthenticatedRouteMixin, AuthenticatedData, {
  queryParams: {
    s: {
      refreshModel: true
    }
  },

  model(params) {
    const models = this._super(params);
    if (params.s) {
      return models.then((models) => {
        models.tasks = this.store.query('task', params);
        return models;
      });
    } else {
      return models;
    }
  }
});
