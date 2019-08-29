import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 向上派发？
Vue.prototype.$dispatch = function(eventName, data) {
  let parent = this.$parent;
  while (parent) {
    if (parent) {
      parent.$emit(eventName, data);
      parent = parent.$parent;
    } else {
      break;
    }
  }
}

// 广播
Vue.prototype.$boardcast = function(eventName, data) {
  boardcast.call(this, eventName, data);
}

function boardcast(eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data);
    if (child.$children.length) {
      boardcast.call(child, eventName, data);
    }
  })
}

// bus
class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks.forEach(cb => cb(args))
    }
  }
}
Vue.prototype.$bus = new Bus();


new Vue({
  render: h => h(App),
}).$mount('#app')
