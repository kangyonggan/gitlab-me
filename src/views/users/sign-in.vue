<template>
  <div>
    <div class="intro">
      <h1>GitLab Mini Edition</h1>
      <h3>Open source software to collaborate on code</h3>
      <p>Manage Git repositories with fine-grained access controls that keep your code secure. Perform code reviews and
        enhance collaboration with merge requests. Each project can also have an issue tracker and a wiki.</p>
    </div>
    <div class="login-form">
      <el-card>
        <div slot="header">
          <div class="title">Sign in</div>
        </div>
        <div>
          <el-form label-position="top" label-width="80px" :model="params">
            <el-form-item label="Username or email">
              <el-input v-model="params.username" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <a class="forgot" href="/">Forgot your password?</a>
              <el-input v-model="params.password" size="medium"></el-input>
            </el-form-item>
            <el-radio-group v-model="params.rememberMe">
              <el-checkbox label="Remember me" name="rememberMe"></el-checkbox>
            </el-radio-group>
            <a href="/">Sign up now!</a>
            <el-form-item>
              <el-button type="success" size="medium">Sign in</el-button>
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
                params: {}
            };
        },
        methods: {}
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

  .login-form {
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

    a {
      float: right;
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
