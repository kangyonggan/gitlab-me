<template>
  <div>
    <div class="height25" />
    <el-alert
      v-if="source==='reset'"
      title="Reset password success"
      description="You have successfully changed the password, please log in with the new password."
      type="warning"
      show-icon
    />
    <div class="height25" />
    <div class="intro">
      <h1>GitLab Mini Edition</h1>
      <h3>Open source software to collaborate on code</h3>
      <p>
        Manage Git repositories with fine-grained access controls that keep your code secure. Perform code reviews and
        enhance collaboration with merge requests. Each project can also have an issue tracker and a wiki.
      </p>
    </div>
    <div class="users-form">
      <el-card>
        <div slot="header">
          <div class="title">
            Sign in
          </div>
        </div>
        <div>
          <el-form
            ref="form"
            label-position="top"
            label-width="80px"
            :model="params"
            :rules="rules"
            v-loading="loading"
          >
            <el-form-item
              label="Username or email"
              prop="username"
            >
              <el-input
                v-model="params.username"
                size="medium"
                @keyup.enter.native="submit"
              />
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password"
            >
              <router-link
                class="forgot"
                to="/users/reset_password"
              >
                Forgot your password?
              </router-link>
              <el-input
                type="password"
                v-model="params.password"
                size="medium"
                @keyup.enter.native="submit"
              />
            </el-form-item>
            <el-radio-group v-model="params.rememberMe">
              <el-checkbox
                label="Remember me"
                name="rememberMe"
              />
            </el-radio-group>
            <router-link to="/users/sign_up">
              Sign up →
            </router-link>
            <el-form-item>
              <el-button
                type="primary"
                size="medium"
                @click="submit"
              >
                Sign in
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                rules: {
                    username: [
                        {required: true, message: 'Username or email is required'}
                    ],
                    password: [
                        {required: true, message: 'Password is required'}
                    ]
                },
                source: ''
            };
        },
        methods: {
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    console.log(this);
                    this.loading = true;
                    this.axios.post('users/signIn', this.params).then(data => {
                        this.$store.commit('setUser', data.user);
                        let redirectUrl = '/';
                        if (data.user.accessLevel === 'Admin') {
                            redirectUrl = '/admin';
                        }
                        this.$router.push({
                            path: redirectUrl
                        });
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        },
        mounted() {
            this.source = this.$route.query.source;
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-card__body {
    padding: 20px 20px 0 20px;
  }

  .height25 {
    height: 25px;
  }

  .intro {
    width: 530px;
    float: left;

    h1 {
      font-weight: 400;
      font-size: 34px;
      color: #2e2e2e;
      line-height: 1.1;
    }

    h3 {
      font-size: 22px;
      color: #2e2e2e;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 10px;
      line-height: 1.1;
    }

    p {
      font-size: 16px;
      color: #888;
      line-height: 1.5;
    }
  }

  .users-form {
    width: 380px;
    margin-right: 10px;
    margin-top: 15px;
    float: right;

    .title {
      text-align: center;
      color: #000;
      font-size: 18px;
      font-weight: 600;
    }

    /deep/ .el-card__header {
      border-bottom: 2px solid #1f78d1;
      padding: 15px 0;
    }

    /deep/ .el-form-item__label {
      line-height: 8px;
      display: inline-block;
      font-size: 13px;
      color: #2e2e2e;
    }

    a {
      float: right;
    }

    .forgot {
      position: absolute;
      right: 0;
      top: -20px;
      font-size: 12px;
      z-index: 9;
      line-height: normal;
    }

    /deep/ .el-button {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>
