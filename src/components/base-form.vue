<template>
  <div class="form-panel">
    <el-form
      ref="form"
      :label-width="labelUp ? '220px' : undefined"
      :model="params"
      :rules="rules"
    >
      <slot />
    </el-form>
    <el-button
      style="margin-top: 30px;"
      v-loading="loading"
      type="primary"
      @click="submit"
    >
      Submit
    </el-button>
    <el-button @click="cancel">
      Cancel
    </el-button>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        required: true,
        type: String
      },
      method: {
        required: false,
        type: String,
        default: 'POST',
        validator(value) {
          return 'POST,PUT'.includes(value.toUpperCase());
        }
      },
      params: {
        required: true,
        type: Object
      },
      rules: {
        required: false,
        type: Object,
        default: function () {
          return {};
        }
      },
      labelUp: {
        required: false,
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loading: false
      };
    },
    methods: {
      validateField(prop, callback) {
        this.$refs.form.validateField(prop, callback);
      },
      cancel() {
        history.back();
      },
      submit: function () {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return;
          }

          this.loading = true;
          this.axios.request({
            url: this.url,
            method: this.method,
            data: this.params
          }).then(data => {
            this.$emit('success', data);
          }).catch(res => {
            this.error(res.respMsg);
          }).finally(() => {
            this.loading = false;
          });
        });
      }
    },
    mounted() {
      this.$refs.form.clearValidate();
    }
  };
</script>

<style scoped lang="scss">
  .form-panel {
    max-width: 900px;
    margin: 30px auto;
  }
</style>