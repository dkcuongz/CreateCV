<template>
  <el-menu
    :default-active="defaultActive"
    class="left-main"
    :collapse="$root.isCollapse"
    uk-height-viewport="offset-top: 80px"
    :unique-opened="true"
    size="small"
    menu-trigger="click"
    :router="true"
  >
    <el-menu-item
      attrName="systemName"
      index="/"
    >
      <i class="el-icon-s-data"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
// VUEJSスクリプト処理の開始
export default {
  computed: {
    // 選択中のメニューを取得する
    defaultActive() {
      return this.$route.path;
    },
  },
};
// VUEJSスクリプト処理の終了
</script>
