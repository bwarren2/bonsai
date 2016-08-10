import Ember from 'ember';
import FilteredTasksMixin from 'bonsai/mixins/filtered-tasks';
import { module, test } from 'qunit';

module('Unit | Mixin | filtered tasks');

// Replace this with your real tests.
test('it works', function(assert) {
  let FilteredTasksObject = Ember.Object.extend(FilteredTasksMixin);
  let subject = FilteredTasksObject.create();
  assert.ok(subject);
});
