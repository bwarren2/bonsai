import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  username: attr('string'),
  display_name: attr('string'),
  enable_keyboard_shortcuts: attr('boolean'),
  show_help_brainstorm: attr('boolean'),
  show_help_refine: attr('boolean'),
  show_help_plan: attr('boolean'),
  show_help_execute: attr('boolean'),
  show_help_review: attr('boolean')
});
