<template>
  <base-form
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/admin/users"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-form-group name="Account" />

    <base-input
      label="Username"
      v-model="params.username"
      prop="username"
    />
    <base-input
      label="Full name"
      v-model="params.fullName"
      prop="fullName"
    />
    <base-input
      label="Email"
      v-model="params.email"
      prop="email"
    />

    <base-form-group name="Password" />
    <base-input
      type="password"
      label="Password"
      v-model="params.password"
      prop="password"
    />
    <base-input
      type="password"
      label="Password Confirmation"
      v-model="params.rePassword"
      prop="rePassword"
    />

    <base-form-group name="Access" />

    <base-input
      label="Projects limit"
      v-model="params.projectsLimit"
      prop="projectsLimit"
      type="number"
    />
    <el-form-item
      label="Can create group"
      prop="canCreateGroup"
    >
      <el-checkbox
        v-model="params.canCreateGroup"
        true-label="1"
        false-label="0"
      />
    </el-form-item>
    <el-form-item
      label="Access level"
      prop="accessLevel"
    >
      <el-radio
        v-model="params.accessLevel"
        label="Regular"
      >
        Regular
      </el-radio>
      <div class="access-desc">
        Regular user have access to their groups and projects
      </div>
      <el-radio
        v-model="params.accessLevel"
        label="Admin"
      >
        Admin
      </el-radio>
      <div class="access-desc">
        Administrators have access all groups, projects and users and can manage all features in this installation
      </div>
    </el-form-item>

    <base-form-group name="Profile" />

    <base-upload-avatar
      label="Avatar"
      v-model="params.avatar"
      :params="params"
      prop="avatar"
    />
  </base-form>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        isEdit: false,
        params: {
          username: '',
          fullName: '',
          email: '',
          password: '',
          rePassword: '',
          projectsLimit: 100,
          canCreateGroup: '0',
          accessLevel: 'Regular',
          avatar: ''
        },
        oldUsername: '',
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
          ],
          rePassword: [
            {required: true, message: 'Password Confirmation is required'},
            {validator: this.validateRePassword}
          ],
          projectsLimit: [
            {pattern: /^[0-9]*$/, message: 'Must be a natural number'},
          ]
        }
      };
    },
    methods: {
      validateRePassword: function (rule, value, callback) {
        if (this.params.password !== value) {
          callback(new Error('Two passwords are inconsistent'));
        }
        callback();
      },
      validateUsername: function (rule, value, callback) {
        if (!value || value === this.oldUsername) {
          callback();
          return;
        }

        this.util.checkReserved(this, value, callback);
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
      handleSuccess() {
        this.$router.push({
          path: '/admin/users/' + this.params.username
        });
      }
    },
    mounted() {
      let username = this.$route.params.username;
      if (username) {
        this.isEdit = true;
        this.rules.password[0].required = false;
        this.rules.rePassword[0].required = false;

        this.loading = true;
        this.axios.get('admin/users/' + username).then(data => {
          let user = data.user;
          this.params.id = user.id;
          this.params.username = user.username;
          this.params.fullName = user.fullName;
          this.params.email = user.email;
          this.params.projectsLimit = user.projectsLimit;
          this.params.canCreateGroup = user.canCreateGroup + '';
          this.params.accessLevel = user.accessLevel;
          this.params.avatar = user.avatar;

          this.oldUsername = user.username;
          this.oldEmail = user.email;
        }).catch(res => {
          this.error(res.respMsg);
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .access-desc {
    line-height: normal;
    color: #777;
    margin-left: 30px;
  }
</style>
