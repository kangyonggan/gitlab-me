<template>
  <base-form
    :params="params"
    :rules="rules"
    method="POST"
    url="/admin/projects"
    @success="handleSuccess"
  >
    <base-input
      label="Project name"
      v-model="params.projectName"
      prop="projectName"
    />
    <el-form-item
      prop="projectPath"
      label="Project path"
      class="path-item"
    >
      <input
        readonly="readonly"
        class="readonly"
        value="http://127.0.0.1/"
      >
      <el-select
        class="select-namespace"
        v-model="params.namespace"
        placeholder="Namespace"
      >
        <el-option-group
          v-for="group in namespaces"
          :key="group.prefix"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item[group.key]"
            :label="group.prefix + ':' + item[group.key]"
            :value="item[group.key]"
          />
        </el-option-group>
      </el-select>

      <el-input
        class="input-pre"
        v-model="params.projectPath"
        placeholder="Project path"
      />
    </el-form-item>
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
        Project access must be granted explicitly to each user.
      </div>
      <el-radio
        v-model="params.visibilityLevel"
        label="1"
      >
        Internal
      </el-radio>
      <div class="access-desc">
        The project can be accessed by any logged in user.
      </div>
      <el-radio
        v-model="params.visibilityLevel"
        label="2"
      >
        Public
      </el-radio>
      <div class="access-desc">
        The project can be accessed without any authentication.
      </div>
    </el-form-item>
  </base-form>
</template>

<script>
  export default {
    data() {
      return {
        namespaces: [],
        params: {
          namespace: this.$store.getters.getUser.username,
          projectName: '',
          description: '',
          visibilityLevel: '0'
        },
        rules: {
          projectName: [
            {required: true, message: 'Project name is required'},
            {max: 20, message: 'Maximum length is 20 characters'}
          ],
          namespace: [
            {required: false}
          ],
          projectPath: [
            {required: true, message: 'Project path is required'},
            {max: 20, message: 'Maximum length is 20 characters'},
            {validator: this.validateProjectPath}
          ],
          description: [
            {max: 256, message: 'Maximum length is 256 characters'}
          ]
        }
      };
    },
    methods: {
      validateProjectPath: function (rule, value, callback) {
        if (!value) {
          callback();
          return;
        }

        this.axios.get('validate/projectPath?namespace=' + this.params.namespace + '&projectPath=' + value).then(() => {
          callback();
        }).catch(res => {
          callback(new Error(res.respMsg));
        });
      },
      handleSuccess() {
        this.$router.push({
          path: '/admin/projects/' + this.params.namespace + '/' + this.params.projectPath
        });
      }
    },
    mounted() {
      this.axios.get('admin/projects/namespaces').then(data => {
        this.namespaces = [{
          label: 'Groups',
          prefix: 'group',
          key: 'groupPath',
          options: data.groups
        }, {
          label: 'Users',
          prefix: 'user',
          key: 'username',
          options: [this.$store.getters.getUser]
        }];
      }).catch(res => {
        this.error(res.respMsg);
      });
    }
  };
</script>

<style scoped lang="scss">
  .access-desc {
    line-height: normal;
    color: #777;
    margin-left: 30px;
  }

  /deep/ .input-pre {
    width: 228px;
    margin-left: 15px;
  }

  .readonly {
    border: 1px solid #DCDFE6;
    outline: none;
    padding-left: 20px;
    line-height: 36px;
    float: left;
    color: #555;
    width: 180px;
    border-right: 0;
    background: #f7f8fa;
  }

  .select-namespace {
    float: left;
    width: 234px;

    /deep/ input {
      border-radius: 0;
    }
  }

  /deep/ .is-error .select-namespace .el-input__inner {
    border-color: #DCDFE6;
  }

  .path-item {
    /deep/ .el-form-item__error {
      margin-left: 453px;
    }
  }

</style>
