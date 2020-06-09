<template>
  <div>
    <div class="intro">
      <h1>GitLab Mini Edition</h1>
      <h3>Open source software to collaborate on code</h3>
      <p>Manage Git repositories with fine-grained access controls that keep your code secure. Perform code reviews and
        enhance collaboration with merge requests. Each project can also have an issue tracker and a wiki.</p>
    </div>
    <div class="users-form">
      <el-card>
        <div slot="header">
          <div class="title">Sign up</div>
        </div>
        <div>
          <el-form ref="form" label-position="top" label-width="80px" :model="params" :rules="rules"
                   v-loading="loading">
            <el-form-item label="Full name" prop="fullName">
              <el-input v-model="params.fullName" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item label="Username" prop="username">
              <el-input v-model="params.username" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="params.email" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="params.password" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <router-link to="/users/sign_in">← Sign in</router-link>
            <el-form-item>
              <el-button type="success" size="medium" @click="submit">Sign up</el-button>
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
                    fullName: [
                        {required: true, message: 'Full name is required'},
                        {max: 20, message: 'Maximum length is 20 characters'}
                    ],
                    email: [
                        {required: true, message: 'Email is required'},
                        {max: 128, message: 'Maximum length is 128 characters'},
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: 'Incorrect email address'
                        },
                        {validator: this.validateEmail}
                    ],
                    username: [
                        {required: true, message: 'Username is required'},
                        {max: 20, message: 'Maximum length is 20 characters'},
                        {
                            pattern: /^[a-zA-Z][a-zA-Z0-9]*$/,
                            message: 'Can only contain letters,numbers and begin with letters'
                        },
                        {validator: this.validateUsername}
                    ],
                    password: [
                        {required: true, message: 'Password is required'},
                        {
                            pattern: /^[a-zA-Z0-9]{8,20}$/,
                            message: 'Must be composed of 8 to 20 letters and Numbers'
                        }
                    ]
                }
            };
        },
        methods: {
            validateUsername: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('validate/username?username=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            validateEmail: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('validate/email?email=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.post('users/signUp', this.params).then(() => {
                        this.success('sign up success');
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-card__body {
    padding: 20px 20px 0 20px;
  }

  .intro {
    width: 530px;
    margin-top: 50px;
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
    margin-top: 45px;
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

    .forgot {
      position: absolute;
      right: 0;
      top: -32px;
      font-size: 12px;
      z-index: 9;
    }

    /deep/ .el-button {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>
