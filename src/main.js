import Vue from 'vue'
import App from './App.vue'
import VueAutosuggest from 'vue-autosuggest'; 
Vue.use(VueAutosuggest); 

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
