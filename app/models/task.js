import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  completed: attr('boolean'),
  blocks: hasMany('task', { inverse: 'blockers' }),
  blockers: belongsTo('task', { inverse: 'blocks' }),

  blocksCount: Ember.computed('blocks', function () {
    return this.get('blocks').length;
  }),

  blockersCount: Ember.computed('blockers', function () {
    return this.get('blockers').length;
  }),

  addBlocks: function (task) {
    task.set('blockers', this);
    this.get('blocks').pushObject(task);
  },

  clearBlocks: function () {
    this.get('blocks').then((blocks) => {
      blocks.forEach((block) => {
        block.set('blockers', null);
      });
      this.get('blocks').removeObjects(blocks);
    });
  }
});
