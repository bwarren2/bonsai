import Ember from 'ember';

export function cartoonSelect(params, namedArgs) {
  const kind = namedArgs['kind'];
  switch (kind) {
    case 'brainstorm':
      return "https://imgs.xkcd.com/comics/business_idea.png";
    case 'refine':
      return "https://imgs.xkcd.com/comics/is_it_worth_the_time.png";
    case 'plan':
      return "https://imgs.xkcd.com/comics/planning.png";
    case 'execute':
      return "https://imgs.xkcd.com/comics/set_theory.png";
    case 'review':
      return "https://imgs.xkcd.com/comics/reviews.png";
    default:
      return "https://petenelson.com/wp-content/uploads/2011/08/failtboat.jpg";
  }
}

export default Ember.Helper.helper(cartoonSelect);
