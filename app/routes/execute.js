import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.findAll('task').then((records) => {
      // We have to filter, because we can't query against computed properties.
      return records.filter((record) => {
        return !record.get('hasBefores');
      });
    });
  }
});
