<template>
  <el-header>
    <router-link
      to="/"
      class="logo"
    >
      <img src="../../assets/images/logo.png">

      <span>GitLab</span>
    </router-link>

    <el-dropdown
      trigger="click"
      @command="handleCommand"
    >
      <span>
        {{ $store.getters.getUser.fullName }}

        <i class="el-icon-arrow-down el-icon--right" />
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">
          Profile
        </el-dropdown-item>

        <el-dropdown-item command="1">
          Sign out
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <img
      v-if="$store.getters.getUser.avatar"
      class="avatar"
      :src="axios.defaults.baseURL + $store.getters.getUser.avatar"
    >
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

    .avatar {
      float: right;
      width: 30px;
      height: 30px;
      margin: 8px 10px 0 0;
      border-radius: 50%;
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