import Vue from 'vue';
import Vuex from 'vuex';
import createMultiTabState from 'vuex-multi-tab-state';
import createLogger from 'vuex/dist/logger';
import common from './common';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    common,
  },
  strict: debug,
  plugins: debug ? [createLogger(), createMultiTabState()] : [createMultiTabState()],
});
