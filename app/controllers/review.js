import Ember from 'ember';
import { datestring } from 'bonsai/helpers/datestring';

export default Ember.Controller.extend({
  countData: Ember.computed('model.@each.completed_at', function(){
    var min_date = new Date();
    min_date.setDate(min_date.getDate() - 14);
    var counts = _.countBy(
      this.get('model').filter(function(d){
        return d.get('completed_at')!==null && d.get('completed_at')>=min_date;
      }).map( function(d){
        return datestring([d.get('completed_at')]);
      })
    );
    var keys = Object.keys(counts);
    var data = keys.map(function(key){
      return {
        label:key,
        value:counts[key],
      }
    })
    return data;
  }),
  actions: {
    reject (task) {
      task.uncomplete();
    },

    approve (task) {
      task.approve();
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
