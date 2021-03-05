import Vue from 'vue';
import Vuelidate from 'vuelidate';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja';
import Lodash from 'lodash';
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import axios from './boot/axios';
import mixins from './mixins';
import store from './store';
import router from './router';
import App from './App.vue';

dayjs.extend(utc);
dayjs.extend(timezone);

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Element, { size: 'small', zIndex: 3000, locale });
Vue.mixin({
  mixins,
});
Vue.filter('numFormat', numFormat(numeral));

Vue.prototype.$axios = axios;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$lodash = Lodash;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
