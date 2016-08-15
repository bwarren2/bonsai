import Ember from 'ember';

export function cartoonSelect(params, namedArgs/*, hash*/) {
  var kind = namedArgs['kind'];
  if (kind==='brainstorm') {
    return "https://imgs.xkcd.com/comics/business_idea.png";
  } else if(kind==='refine'){
    return "https://imgs.xkcd.com/comics/is_it_worth_the_time.png";
  } else if(kind==='plan'){
    return "https://imgs.xkcd.com/comics/planning.png";
  }else if(kind==='execute'){
    return "https://imgs.xkcd.com/comics/set_theory.png";
  }else if(kind==='review'){
    return "https://imgs.xkcd.com/comics/reviews.png";
  } else{
    return "https://petenelson.com/wp-content/uploads/2011/08/failtboat.jpg";
  }
}

export default Ember.Helper.helper(cartoonSelect);
