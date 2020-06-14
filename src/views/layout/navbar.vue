<template>
  <el-header>
    <router-link
      to="/"
      class="logo"
    >
      <img src="../../assets/images/logo.png">

      <span>GitLab</span>
    </router-link>

    <router-link
      to="/admin"
      class="admin-area"
      v-show="$store.getters.getUser.accessLevel === 'Admin' && !$route.fullPath.startsWith('/admin')"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="Admin area"
      >
        <i class="el-icon-monitor" />
      </el-tooltip>
    </router-link>

    <el-dropdown
      trigger="click"
      @command="handleCommand"
    >
      <span>

        <img
          v-if="$store.getters.getUser.avatar"
          class="avatar"
          :src="axios.defaults.baseURL + $store.getters.getUser.avatar"
        >

        <img
          v-else
          class="avatar"
          src="../../assets/images/avatar.png"
        >

        <i class="el-icon-arrow-down el-icon--right" />
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          disabled
          style="line-height: 20px;color: #333;"
        >
          {{ $store.getters.getUser.fullName }}
          <br>
          @{{ $store.getters.getUser.username }}
        </el-dropdown-item>

        <el-dropdown-item
          divided
          command="0"
        >
          Settings
        </el-dropdown-item>

        <el-dropdown-item command="1">
          Sign out
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
  export default {
    methods: {
      handleCommand: function (command) {
        if (command === '0') {
          this.$router.push({
            path: '/profile'
          });
        } else if (command === '1') {
          this.axios.get('users/signOut').finally(() => {
            localStorage.removeItem('token');
            this.$store.commit('setUser', {});
            this.$router.push({
              path: '/users/sign_in'
            });
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  .el-header {
    background: linear-gradient(to right, #292961, #393982);
    line-height: 40px;
    height: 40px !important;

    .logo {
      display: inline-block;
      height: 40px;
      width: 90px;
      color: #e2e2e2;
      font-size: 18px;
      float: left;

      img {
        height: 24px;
        float: left;
        margin-top: 8px;
      }

      span {
        float: left;
        margin-left: 6px;
      }
    }

    .admin-area {
      float: left;
      color: #fff;
      margin-left: 100px;
      font-size: 20px;
    }

    .avatar {
      float: left;
      width: 26px;
      height: 26px;
      margin-top: 7px;
      border-radius: 50%;
      border: 1px solid #d1d1f0;
      box-shadow: 0 1px 5px rgba(27, 31, 35, .15);
    }

    .el-dropdown {
      float: right;

      span {
        color: #e2e2e2;
        cursor: pointer;
      }

      .el-loading-mask {
        background: none;
      }
    }
  }
</style>