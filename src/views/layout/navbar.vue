<template>
  <el-header>
    <!--logo-->
    <router-link
      to="/"
      class="logo"
    >
      <img src="../../assets/images/logo.png">

      <span>GitLab</span>
    </router-link>

    <!--navbar left-->
    <ul
      class="navbar"
      style="float: left"
    >
      <li>
        <el-dropdown
          trigger="click"
          placement="bottom-start"
        >
          <span class="el-dropdown-link item">
            Projects
            <i
              class="el-icon-arrow-down el-icon--right"
              style="margin-left: 0"
            />
          </span>

          <el-dropdown-menu
            slot="dropdown"
            style="min-width: 180px"
          >
            <el-dropdown-item>Your projects</el-dropdown-item>
            <el-dropdown-item>Starred projects</el-dropdown-item>
            <el-dropdown-item>Explore projects</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>

      <li>
        <router-link to="/">
          Groups
        </router-link>
      </li>

      <li>
        <router-link to="/">
          Activity
        </router-link>
      </li>

      <li>
        <router-link to="/">
          Milestones
        </router-link>
      </li>

      <li>
        <router-link to="/">
          Snippets
        </router-link>
      </li>

      <li
        class="split"
        v-show="$store.getters.getUser.accessLevel === 'Admin'"
      />

      <li>
        <router-link
          to="/admin"
          class="admin-area"
          v-show="$store.getters.getUser.accessLevel === 'Admin'"
        >
          <el-tooltip
            effect="dark"
            content="Admin area"
          >
            <i class="el-icon-monitor" />
          </el-tooltip>
        </router-link>
      </li>
    </ul>

    <!--avatar-->
    <el-dropdown
      style="float: right"
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

    <!--navbar right-->
    <ul
      class="navbar"
      style="float: right;margin-right: 20px;"
    >
      <li style="line-height: 18px;">
        <el-dropdown
          trigger="click"
        >
          <span
            class="el-dropdown-link item"
            style="display: inline-block;width: 55px;height: 32px;padding: 0;margin: 4px 0 0 0"
          >
            <i
              class="el-icon-circle-plus"
              style="float: left;font-size: 20px;margin-top: 5px;margin-left: 13px"
            />
            <i
              class="el-icon-arrow-down el-icon--right"
              style="margin-left: 0;float: left;margin-top: 8px;"
            />
          </span>

          <el-dropdown-menu
            slot="dropdown"
            style="min-width: 180px"
          >
            <el-dropdown-item>New project</el-dropdown-item>
            <el-dropdown-item>New group</el-dropdown-item>
            <el-dropdown-item>New snippet</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>

      <li style="line-height: 37px;">
        <el-input
          size="small"
          placeholder="Search"
          suffix-icon="el-icon-search"
          v-model="key"
          clearable
          class="search"
        />
      </li>

      <li>
        <router-link to="/">
          <el-tooltip
            effect="dark"
            content="Issues"
          >
            <i
              class="el-icon-copy-document"
              style="font-size: 20px"
            />
          </el-tooltip>
        </router-link>
      </li>

      <li>
        <router-link to="/">
          <el-tooltip
            effect="dark"
            content="Merge requests"
          >
            <i
              class="el-icon-s-operation"
              style="font-size: 20px"
            />
          </el-tooltip>
        </router-link>
      </li>

      <li>
        <router-link to="/">
          <el-tooltip
            effect="dark"
            content="Todos"
          >
            <i
              class="el-icon-circle-check"
              style="font-size: 20px"
            />
          </el-tooltip>
        </router-link>
      </li>
    </ul>
  </el-header>
</template>

<script>
    export default {
        data() {
            return {
                key: ''
            };
        },
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

    .navbar {
      height: 40px;
      list-style: none;
      margin: 0 0 0 90px;
      padding: 0;

      li {
        float: left;

        a, .item {
          padding: 8px;
          margin: 4px 2px;
          color: #e5e5e5;
          border-radius: 4px;
          height: 32px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          line-height: 1.42857143;
        }

        a:hover, .item:hover {
          background-color: rgba(209, 209, 240, 0.2);
        }

        a.admin-area {
          i {
            font-size: 20px;
          }
        }

      }

      li.split {
        width: 1px;
        height: 26px;
        background: #555;
        margin: 7px 8px 0 8px;
      }

      .search {
        width: 220px;
        margin: 0 10px;

        input {
          background: #494992;
          border: none;
          outline: none;
          color: #e1e1e1;
        }
      }
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