import Ember from 'ember';

const {
  run: { later },
  RSVP
} = Ember;

export default Ember.Controller.extend({
  actions: {
    fetchData() {

      let promise = new RSVP.Promise(function(resolve){
        later(()=>{
          resolve({ result: 'Transaction Data'});
        }, 3000);
      });

      promise.then((data)=>{
        this.set('data', data);
      });

      return promise;
    },
    timerExpired(message) {
      alert(`Expired ${message}`);
    }
  }
});
