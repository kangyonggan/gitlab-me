<template>
  <div>
    <el-row>
      <el-col
        :span="12"
        style="margin-top: 20px;"
      >
        <el-card>
          <div slot="header">
            <span>Profile</span>
          </div>
          <div class="card-body">
            <img
              v-if="user.avatar"
              :src="axios.defaults.baseURL + user.avatar"
              class="avatar"
            >
            <img
              class="avatar"
              v-else
              :src="defaultAvatar"
            >
            <div class="info">
              <div class="item">
                ID:
                <span class="value">
                  {{ user.id }}
                </span>
              </div>
              <div class="item">
                Full name:
                <span class="value">
                  {{ user.fullName }}
                </span>
              </div>
              <div class="item">
                Profile page:
                <router-link :to="'/' + user.username">
                  {{ user.username }}
                </router-link>
              </div>
            </div>
            <div style="clear: both" />
          </div>
        </el-card>
      </el-col>
      <el-col
        style="float: right; margin-top: 20px;"
        :span="11"
      >
        <el-card>
          <div slot="header">
            <span>Access</span>
          </div>
          <div class="card-body">
            <div class="info info-plus">
              <div class="item">
                Projects limit:
                <span class="value">
                  {{ user.projectsLimit }}
                </span>
              </div>
              <div class="item">
                Can create group:
                <span class="value">
                  {{ util.formatYesNo(user.canCreateGroup) }}
                </span>
              </div>
              <div class="item">
                Access level:
                <span class="value">
                  {{ user.accessLevel }}
                </span>
              </div>
            </div>
            <div style="clear: both" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        style="margin-top: 30px;"
        :span="12"
      >
        <el-card>
          <div slot="header">
            <span>Account</span>
          </div>
          <div class="card-body">
            <div class="info info-plus">
              <div class="item">
                Username:
                <span class="value">
                  {{ user.username }}
                </span>
              </div>
              <div class="item">
                Full name:
                <span class="value">
                  {{ user.fullName }}
                </span>
              </div>
              <div class="item">
                Email:
                <span class="value">
                  {{ user.email }}
                </span>
              </div>
              <div class="item">
                Sign up ip:
                <span class="value">
                  {{ user.signUpIp }}
                </span>
              </div>
              <div class="item">
                Sign up time:
                <span class="value">
                  {{ util.formatTimestamp(user.signUpTime) }}
                </span>
              </div>
              <div class="item">
                Last sign in ip:
                <span class="value">
                  {{ user.lastSignInIp }}
                </span>
              </div>
              <div class="item">
                Last sign in time:
                <span class="value">
                  {{ util.formatTimestamp(user.lastSignInTime) }}
                </span>
              </div>
              <div class="item">
                Status:
                <span class="value">
                  {{ util.formatStatus(user.isDeleted) }}
                </span>
              </div>
            </div>
            <div style="clear: both" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import md5Hex from 'md5-hex';

  export default {
    props: {
      user: {
        required: true,
        type: Object
      }
    },
    computed: {
      defaultAvatar() {
        return 'https://www.gravatar.com/avatar/' + md5Hex(this.user.email) + '.jpg?d=identicon';
      }
    }
  };
</script>

<style scoped lang="scss">
  .avatar {
    float: left;
    height: 128px;
    width: 128px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
  }

  .card-body {
    padding-bottom: 15px;
  }

  .info {
    float: left;
    margin-left: 30px;
    min-width: 260px;

    .item {
      width: 100%;
      margin-bottom: 10px;
      line-height: 30px;
      color: #2e2e2e;
      border-bottom: 1px solid #e1e1e1;

      .value, a {
        margin-left: 10px;
        color: #000;
        font-weight: bold;
      }
    }
  }

  .info-plus {
    min-width: 350px;
  }
</style>