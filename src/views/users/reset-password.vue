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
          <div class="title">Reset password</div>
        </div>
        <div>
          <el-form ref="form" label-position="top" label-width="80px" :model="params" :rules="rules"
                   v-loading="loading">
            <el-form-item label="Email" prop="email">
              <el-input v-model="params.email" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item label="New password" prop="password">
              <el-input type="password" v-model="params.password" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item label="Verify code" prop="verifyCode">
              <el-button class="send" size="medium" plain v-loading="sending" @click="sendVerifyCode">{{ text }}
              </el-button>
              <el-input v-model="params.verifyCode" size="medium" @keyup.enter.native="submit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="submit">Reset password</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="bottom">
        Already have login and password?
        <router-link to="/users/sign_in">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                sending: false,
                text: 'Send',
                timer: undefined,
                count: 60,
                params: {},
                rules: {
                    email: [
                        {required: true, message: 'Email is required'},
                        {max: 128, message: 'Maximum length is 128 characters'},
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: 'Incorrect email address'
                        },
                        {validator: this.validateEmail}
                    ],
                    password: [
                        {required: true, message: 'Password is required'},
                        {
                            pattern: /^[a-zA-Z0-9]{8,20}$/,
                            message: 'Must be composed of 8 to 20 letters and Numbers'
                        }
                    ],
                    verifyCode: [
                        {required: true, message: 'Verification code is required'}
                    ]
                }
            };
        },
        methods: {
            validateEmail: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('validate/emailNotExists?email=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            setInterval() {
                let that = this;
                this.timer = setInterval(function () {
                    that.count--;
                    that.text = that.count + 's';
                    if (that.count <= 0) {
                        clearInterval(that.timer);
                        that.sending = false;
                        that.text = 'Send';
                    }
                }, 1000);
            },
            sendVerifyCode() {
                if (this.text !== 'Send') {
                    return;
                }
                this.$refs.form.validateField('email', valid => {
                    if (valid) {
                        return;
                    }
                    this.text = 'Sending';
                    this.sending = true;
                    this.axios.post('users/sendResetPasswordEmail', this.params).then(data => {
                        this.success('Send succeed');
                        this.params.emailId = data.emailId;
                        this.setInterval();
                    }).catch(res => {
                        this.text = 'Send';
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.sending = false;
                    });
                });
            },
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.put('users/resetPassword', this.params).then(() => {
                        this.$router.push({
                            path: '/users/sign_in',
                            query: {
                                source: 'reset'
                            }
                        });
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
    margin-top: 65px;
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

    /deep/ .el-button {
      width: 100%;
    }

    .send {
      position: absolute;
      right: 0;
      width: 80px;
      top: 2px;
      font-size: 12px;
      z-index: 9;
      line-height: normal;
    }
  }

  .bottom {
    margin-top: 20px;
    font-size: 13px;
  }
</style>
