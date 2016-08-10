import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import AuthenticatedData from '../mixins/authenticated-data';

export default Ember.Route.extend(ApplicationRouteMixin, AuthenticatedData);
