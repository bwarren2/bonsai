import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('brainstorm');
  this.route('refine');
  this.route('plan');
  this.route('execute');
  this.route('review');
  this.route('login');
});

export default Router;
