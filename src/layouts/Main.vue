<template>
  <div>
    <loading
      :active.sync="$root.isLoading"
      color="#C51555"
      loader="bars"
      background-color="#DDEBEE"
      v-model="$root.isLoading"
    ></loading>
    <!-- <Header></Header> -->
    <router-view :key="$route.fullPath" />
    <!-- /内容 -->
  </div>
</template>
<script>
// コンポーネントをインポートする
import Loading from 'vue-loading-overlay';
// stylesheetをインポートする
import 'vue-loading-overlay/dist/vue-loading.css';
// LeftMenuコンポーネントをインポートする
// import Header from '../components/common/Header.vue';

// VUEJSスクリプト処理の開始
export default {
  components: {
    Loading,
    // Header,
  },
};
// VUEJSスクリプト処理の終了
</script>
