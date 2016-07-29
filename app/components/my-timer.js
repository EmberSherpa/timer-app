import Ember from 'ember';

export default Ember.Component.extend({
  iteration: 0,
  tick: 0,
  maxIterations: 3,
  maxTick: 10,
  didInsertElement() {
    this.startTimer();
  },
  startTimer() {
    this.set('tick', 0);
    let iteration = this.get('iteration');
    let maxIterations = this.get('maxIterations');
    if (iteration < maxIterations) {
      if (iteration === 0) {
        this.nextTick();
      } else {
        let fetch = this.get('fetch');
        if (fetch) {
          fetch().then(()=>{
            this.nextTick();
          })
          .catch(()=>{
            // what's the worse case scenario
          });
        } else {
          this.nextTick();
        }
      }
    } else {
      this.sendAction('timerEnd');
    }
  },
  nextTick() {
    let tick = this.get('tick');
    let maxTick = this.get('maxTick');
    
    Ember.run.later(() => {
      if (tick < maxTick) {
        this.incrementProperty('tick');
        this.nextTick();
        return;
      }
      this.incrementProperty('iteration');
      this.startTimer();
    }, 1000);
  }
});
