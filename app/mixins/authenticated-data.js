import Ember from 'ember';

export default Ember.Mixin.create({
  model () {
    return Ember.RSVP.hash({
      currentUser: this.get('session.currentUser'),
      tasks: this.store.findAll('task')
    }).catch(() => {
      return {
        currentUser: null,
        tasks: []
      };
    });
  }
});
