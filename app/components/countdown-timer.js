import Ember from 'ember';
import moment from 'moment';


export default Ember.Component.extend({
  addAMinuteCount: 0,
  usedUpAddAMinute: Ember.computed('addAMinuteCount', function () {
    return this.get('addAMinuteCount') >= 2;
  }),

  startTimer () {
    console.debug('startTimer');
    const containingElement = this.$(this.get('element')).children('.countdown-area');
    const element = containingElement.children('.timer-area');
    let duration = moment.duration(0, 'seconds');
    const interval = 1;

    // TODO: Use Ember.run?
    duration = this.tickTimer(duration, interval, element, containingElement);
    this.clock = setInterval(() => {
      duration = this.tickTimer(duration, interval, element, containingElement);
      if (this.durationDone(duration)) {
        this.finishTimer(true);
      }
    }, interval * 1000);
  },

  finishTimer (stalled) {
    clearInterval(this.clock);
    this.sendAction('timerDone', stalled);
  },

  tickTimer (oldDuration, interval, element, containingElement) {
    const duration = moment.duration(oldDuration.asSeconds() + interval, 'seconds');
    const minutes = `0${duration.minutes()}`.slice(-2);
    const seconds = `0${duration.seconds()}`.slice(-2);
    element.text(`${minutes}:${seconds}`);
    containingElement.removeClass('alert alert-success alert-warning alert-danger');
    containingElement.addClass(this.getClassForDuration(duration));
    return duration;
  },

  durationDone (duration) {
    return duration.asSeconds() === this.get('duration');
  },

  getClassForDuration (duration) {
    const seconds = duration.asSeconds();
    const maxDuration = this.get('duration');
    const mediumBorder = maxDuration / 2;
    const longBorder = mediumBorder + maxDuration / 4;
    let kind;
    if (seconds < mediumBorder) {
      kind = 'success';
    } else if (seconds >= mediumBorder && seconds < longBorder) {
      kind = 'warning';
    } else {
      kind = 'danger';
    }
    return `alert alert-${kind}`;
  },

  didInsertElement () {
    this.startTimer();
  },

  actions: {
    addMinute () {
      if (!this.get('usedUpAddAMinute')) {
        const duration = this.get('duration');
        const addAMinuteCount = this.get('addAMinuteCount');
        this.set('duration', duration + 60);
        this.set('addAMinuteCount', addAMinuteCount + 1);
      }
    },

    done () {
      const task = this.get('task');
      task.complete();
      task.set('refined', true);
      task.save();
      this.finishTimer(false);
    },

    defer () {
      const task = this.get('task');
      task.set('refined', true);
      task.save();
      this.finishTimer(false);
    }
  }
});
