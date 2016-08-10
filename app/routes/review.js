import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthenticatedData from '../mixins/authenticated-data';

export default Ember.Route.extend(AuthenticatedRouteMixin, AuthenticatedData);
