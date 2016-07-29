import Ember from 'ember';
import moment from 'moment';


export default Ember.Component.extend({
  startTimer () {
    // TODO: Chillax and let people add time.
    const element = this.$(this.get('element')).children('.countdown-area');
    let duration = moment.duration(0, 'seconds');
    const interval = 1;

    // TODO: This happens after 1s; it should start immediately.
    // TODO: Use Ember.run?
    const clock = setInterval(() => {
      duration = moment.duration(duration.asSeconds() + interval, 'seconds');
      const minutes = `0${duration.minutes()}`.slice(-2);
      const seconds = `0${duration.seconds()}`.slice(-2);
      element.text(`${minutes}:${seconds}`);
      element.addClass(this.getClassForDuration(duration));
      if (this.durationDone(duration)) {
        clearInterval(clock);
        element.append(" Done!");
        this.sendAction('timerDone');
      }
    }, interval * 1000);
  },

  durationDone (duration) {
    return duration.asSeconds() === this.get('duration');
  },

  getClassForDuration (duration) {
    const seconds = duration.asSeconds();
    const max = this.get('duration');
    const mediumBorder = max / 2;
    const longBorder = mediumBorder + max / 4;
    if (seconds < mediumBorder) {
      return 'short';
    } else if (seconds >= mediumBorder && seconds < longBorder) {
      return 'medium';
    } else {
      return 'long';
    }
  },

  didRender () {
    this.startTimer();
  }
});
