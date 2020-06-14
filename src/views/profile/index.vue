<template>
  <div>
    <el-alert
      v-show="showAlert"
      title="Profile was successfully updated"
      type="success"
      @close="showAlert = false"
    />
    <base-form
      :label-up="false"
      :params="params"
      :rules="rules"
      @success="handleSuccess"
      method="PUT"
      url="/profile"
    >
      <el-row class="info">
        <el-col
          :xl="8"
          :lg="8"
          :md="10"
          :sm="24"
          :xs="24"
        >
          <h4>Public Avatar</h4>
          <p>
            You can change your avatar here or remove the current avatar to revert to <a
              target="_blank"
              href="https://gravatar.com/"
            >gravatar.com</a>
          </p>
        </el-col>

        <el-col
          :xl="16"
          :lg="16"
          :md="14"
          :sm="24"
          :xs="24"
        >
          <base-avatar
            v-model="params.avatar"
            style="float: left"
            prop="avatar"
            class="avatar"
            circular
          />
          <div class="avatar-desc">
            <p style="color: #333;font-size: 15px;">
              Upload new avatar
            </p>
            <p>The maximum file size allowed is 2MB.</p>

            <div v-show="params.avatar">
              <base-hr />
              <a
                class="remove-avatar"
                @click="removeAvatar"
              >Remove avatar</a>
            </div>
          </div>
        </el-col>
      </el-row>
      <base-hr />
      <el-row class="info">
        <el-col
          :xl="8"
          :lg="8"
          :md="10"
          :sm="24"
          :xs="24"
        >
          <h4>Main settings</h4>
          <p>
            This information will appear on your profile
          </p>
        </el-col>

        <el-col
          :xl="16"
          :lg="16"
          :md="14"
          :sm="24"
          :xs="24"
        >
          <base-input
            prop="fullName"
            label="Full name"
            v-model="params.fullName"
          />
          <base-input
            prop="email"
            label="Email"
            v-model="params.email"
          />
        </el-col>
      </el-row>
    </base-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showAlert: false,
        params: {},
        oldEmail: '',
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
          ]
        }
      };
    },
    methods: {
      removeAvatar() {
        this.$confirm('Avatar will be removed. Are you sure?', 'Confirmation',
          {type: 'warning'}).then(() => {
          this.axios.delete('profile/avatar/').then(data => {
            this.handleSuccess(data);
          }).catch(res => {
            this.error(res.respMsg);
          });
        });
      },
      validateEmail: function (rule, value, callback) {
        if (!value || value === this.oldEmail) {
          callback();
          return;
        }

        this.axios.get('validate/email?email=' + value).then(() => {
          callback();
        }).catch(res => {
          callback(new Error(res.respMsg));
        });
      },
      handleSuccess(data) {
        this.params = Object.assign({}, data.user);
        this.oldEmail = this.params.email;
        this.$store.commit('setUser', data.user);
        this.showAlert = true;
        const sTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.util.scrollTop(window, sTop, 0, 1000);
      }
    },
    mounted() {
      this.params = Object.assign({}, this.$store.getters.getUser);
      this.oldEmail = this.params.email;
    }
  };
</script>

<style scoped lang="scss">
  .info {
    margin-top: 20px;

    h4 {
      font-weight: 600;
      line-height: 1.2;
      color: #2e2e2e;
      margin: 0 0 10px 0;
      font-size: 20px;
    }

    p {
      line-height: 1.5;
    }

    /deep/ .avatar .el-form-item__content {
      margin-left: 30px !important;
    }

    .avatar-desc {
      float: left;
      margin-left: 50px;
      color: #919191;
    }

    .remove-avatar {
      background-color: #fff;
      color: #db3b21;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      font-weight: 400;
      padding: 6px 10px;
      text-decoration: none;
      border: 1px solid #db3b21;
    }

    .remove-avatar:hover {
      background: #f2b4a9;
    }
  }
</style>
