import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('brainstorm');
  this.route('refine');
  this.route('plan');
  this.route('execute');
  this.route('review');
  this.route('login');
  this.route('me');
  this.route('archive');
  this.route('splash', { path: '/intro' }, function () {
    this.route('brainstorm');
    this.route('refine');
    this.route('plan');
    this.route('execute');
    this.route('review');
  });
  this.route('signup');
  this.route('activate', {
    path: '/activate/:uid/:token'
  });
});

export default Router;
