import Ember from 'ember';

export function getCartoonHelp(params) {
  const mode = params[0];

  switch (mode) {
    case "brainstorm":
      return "Just put everything you have to do here, and we'll help you get it done.";
    case "refine":
      return "Clarify and organize what you have to do. If it's quick, do it now.";
    case "plan":
      return "If one thing depends on another before you can do it, map that out here. It'll help you later on!";
    case "execute":
      return "Do whatever you can off of your list.";
    case "review":
      return "Have you gotten done what you wanted to get done? Congratulations!";
    default:
      return "I don't know, I just can't even."
  }
}

export default Ember.Helper.helper(getCartoonHelp);
