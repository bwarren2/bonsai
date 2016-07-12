import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  completed: attr('boolean'),
  befores: hasMany('task', { inverse: 'afters' }),
  afters: hasMany('task', { inverse: 'befores' }),

  addBefore: function (task) {
    task.get('afters').pushObject(this);
    task.save();
    this.get('befores').pushObject(task);
    this.save();
  },

  clearBefores: function () {
    this.get('befores').then((befores) => {
      befores.forEach((before) => {
        before.get('afters').removeObject(this);
        before.save();
      });
      this.get('befores').removeObjects(befores);
      this.save();
    });
  }
});
