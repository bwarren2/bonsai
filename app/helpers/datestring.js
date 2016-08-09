import Ember from 'ember';

export function datestring(params) {
  const today = params[0];
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();

  if (dd<10) {
    dd = '0' + dd;
  }
  if (mm<10) {
    mm = '0' + mm;
  }

  return `${yyyy}-${mm}-${dd}`;
}

export default Ember.Helper.helper(datestring);
