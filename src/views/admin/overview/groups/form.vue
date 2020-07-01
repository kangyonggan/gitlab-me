<template>
  <base-form
    :params="params"
    :rules="rules"
    :method="isEdit ? 'PUT' : 'POST'"
    url="/admin/groups"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-input
      label="Group path"
      v-model="params.groupPath"
      prop="groupPath"
    />

    <base-input
      label="Group name"
      v-model="params.groupName"
      prop="groupName"
    />
    <base-input
      label="Description"
      type="textarea"
      v-model="params.description"
      prop="description"
    />
    <el-form-item
      label="Visibility level"
      prop="visibilityLevel"
    >
      <el-radio
        v-model="params.visibilityLevel"
        label="0"
      >
        Private
      </el-radio>
      <div class="access-desc">
        The group and its projects can only be viewed by members.
      </div>
      <el-radio
        v-model="params.visibilityLevel"
        label="1"
      >
        Internal
      </el-radio>
      <div class="access-desc">
        The group and any internal projects can be viewed by any logged in user.
      </div>
      <el-radio
        v-model="params.visibilityLevel"
        label="2"
      >
        Public
      </el-radio>
      <div class="access-desc">
        The group and any public projects can be viewed without any authentication.
      </div>
    </el-form-item>

    <base-upload-avatar
      label="Group avatar"
      v-model="params.groupAvatar"
      :params="params"
      empty-avatar="groupPath"
      avatar-type="retro"
      prop="groupAvatar"
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
          groupPath: '',
          groupName: '',
          description: '',
          visibilityLevel: '0',
          groupAvatar: ''
        },
        oldGroupPath: '',
        rules: {
          groupPath: [
            {required: true, message: 'Required'},
            {max: 20, message: 'Maximum length is 20 characters'},
            {validator: this.validateGroupPath}
          ],
          groupName: [
            {required: true, message: 'Required'},
            {max: 20, message: 'Maximum length is 20 characters'}
          ],
          description: [
            {max: 256, message: 'Maximum length is 256 characters'}
          ]
        }
      };
    },
    methods: {
      validateGroupPath: function (rule, value, callback) {
        if (!value || value === this.oldGroupPath) {
          callback();
          return;
        }

        this.util.checkReserved(this, value, callback);
      },
      handleSuccess() {
        this.$router.push({
          path: '/admin/groups/' + this.params.groupPath
        });
      }
    },
    mounted() {
      let groupPath = this.$route.params.groupPath;
      if (groupPath) {
        this.isEdit = true;
        this.loading = true;
        this.axios.get('admin/groups/' + groupPath).then(data => {
          let group = data.group;
          this.params.id = group.id;
          this.params.groupPath = group.groupPath;
          this.params.groupName = group.groupName;
          this.params.description = group.description;
          this.params.visibilityLevel = group.visibilityLevel + '';

          this.oldGroupPath = group.groupPath;
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
