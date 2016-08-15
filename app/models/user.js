import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  username: attr('string'),
  display_name: attr('string'),
  enable_keyboard_shortcuts: attr('boolean'),
  show_help: attr('boolean')
});
