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
      label="Password"
      v-model="params.password"
      prop="password"
    />
    <base-input
      label="Password Confirmation"
      v-model="params.rePassword"
      prop="rePassword"
    />

    <base-form-group name="Access" />

    <base-input
      label="Projects limit"
      v-model="params.projectsLimit"
      prop="projectsLimit"
    />
    <base-input
      label="Can create group"
      v-model="params.canCreateGroup"
      prop="canCreateGroup"
    />
    <base-input
      label="Access level"
      v-model="params.accessLevel"
      prop="accessLevel"
    />
  </base-form>
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
                    ],
                    rePassword: [
                        {required: true, message: 'Password Confirmation is required'},
                        {validator: this.validateRePassword}
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
            handleSuccess() {
                this.$router.push({
                    path: '/admin/users'
                });
            }
        },
        mounted() {
            let id = this.$route.params.id;
            if (id) {
                this.loading = true;
                this.axios.get('admin/users/' + id).then(data => {
                    this.params = data.user;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>
