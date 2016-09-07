import Ember from 'ember';

export function getCartoonHelpTitle(params) {
  const mode = params[0];

  switch (mode) {
    case "brainstorm":
      return "Brainstorm";
    case "refine":
      return "Refine";
    case "plan":
      return "Plan";
    case "execute":
      return "Execute";
    case "review":
      return "Review";
    default:
      return "Who knows!";
  }
}

export default Ember.Helper.helper(getCartoonHelpTitle);
