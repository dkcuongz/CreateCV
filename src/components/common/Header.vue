<template>
  <!--HEADER-->
  <header class="border-bottom-header background-header">
    <nav class="uk-navbar" id="navbar" data-uk-navbar="">
      <div class="uk-navbar-left">
        <router-link class="uk-navbar-item logo-header" to="/"
          ><label class="label-header">SSSlack</label></router-link
        >
      </div>
      <div class="uk-navbar-right uk-margin-right">
        <ul class="uk-navbar-nav">
          <li>
            <a>
              <el-dropdown class="setting-header">
                <span class="el-dropdown-link">
                  <label class="label-user">{{ username }}</label>
                  <i class="el-icon-user-solid"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    >Change Password</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click.native="signOut()"
                    >Logout</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- <nav class="uk-navbar" id="navbar-1" data-uk-navbar="">
      <div class="uk-navbar-left">
        <el-menu
          default-active="1"
          class="left-main header-toggle"
          :collapse="$root.isCollapse"
          :unique-opened="true"
        >
          <el-menu-item
            index="0"
            @click.native="$root.isCollapse = !$root.isCollapse"
          >
            <img src="\img\bar-left.png" v-if="!$root.isCollapse" />
            <img src="\img\bar-toogle.png" v-else />
          </el-menu-item>
        </el-menu>
        <div class="uk-navbar-item user-info-nav uk-text-nowrap" attrName="screenLabel">
          <i :class="currentRouteIcon"></i>{{ currentRouteName }}
        </div>
      </div>
    </nav> -->
  </header>
  <!--/HEADER-->
</template>

<script>
// VUEJSスクリプト処理の開始
export default {
  data() {
    return {
      username: null,
    };
  },
  async created() {
    this.username = this.ME.userName;
  },
  methods: {
    // ログアウトを実行する
    async signOut() {
      // VueXストアドで保存されるユーザー情報を削除する
      this.$store.dispatch('common/setUser', null);
      // ログイン画面に遷移する
      this.$router.push('/login');
    },
  },
  computed: {
    // ヘッダーに画面名を表示する
    currentRouteName() {
      return this.$route.meta.screenName ? this.$route.meta.screenName : '';
    },
    // ヘッダーに画面アイコンを表示する
    currentRouteIcon() {
      return this.$route.meta.icon ? this.$route.meta.icon : 'el-icon-menu';
    },
  },
};
// VUEJSスクリプト処理の終了
</script>
