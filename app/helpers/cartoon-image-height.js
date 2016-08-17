import Ember from 'ember';

export function cartoonImageHeight(params) {
  const mode = params[0];
  let style;
  switch (mode) {
    case "brainstorm":
      style = {
        height: 296
      };
      break;
    case "refine":
      style = {
        height: 464
      };
      break;
    case "plan":
      style = {
        height: 468
      };
      break;
    case "execute":
      style = {
        height: 354
      };
      break;
    case "review":
      style = {
        height: 243
      };
      break;
    default:
      style = {};
      break;
  }
  const ret = Object.keys(style).map(
    (key) => `${key}: ${style[key]}px;`
  ).join(' ');
  console.log(ret);
  return ret;
}

export default Ember.Helper.helper(cartoonImageHeight);
