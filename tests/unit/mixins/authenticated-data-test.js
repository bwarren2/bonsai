import Ember from 'ember';
import AuthenticatedDataMixin from 'bonsai/mixins/authenticated-data';
import { module, test } from 'qunit';

module('Unit | Mixin | authenticated data');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthenticatedDataObject = Ember.Object.extend(AuthenticatedDataMixin);
  let subject = AuthenticatedDataObject.create();
  assert.ok(subject);
});
