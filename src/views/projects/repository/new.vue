<template>
  <base-form
    style="max-width: 100%"
    :params="params"
    :rules="rules"
    :url="'/projects/' + this.$route.params.namespace + '/' + this.$route.params.projectPath + '/new'"
    @success="success"
  >
    <h3 style="font-weight: 600;color: #2e2e2e">
      New file
    </h3>
    <editor
      height="470px"
      ref="editor"
      :options="{
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false,
        tabSize:2
      }"
      :font-size="14"
      :lang="'java'"
      :theme="'github'"
      @onChange="editorChange"
      @init="editorInit"
    >
      <div class="toolbar">
        <div style="float: left">
          <base-svg
            type="branch"
            style="float: left;margin: 20px 0 0 20px;"
          />
          <span class="split">
            {{ $route.params.pathMatch || 'master' }}
          </span>
          <span style="float: left;margin-right: 15px;">
            /{{ $route.query.fullPath }}
          </span>
          <el-form-item
            prop="fileName"
            style="margin: 4px 0 0 0;float: left;"
          >
            <el-input
              style="width: 400px;"
              size="medium"
              v-model="params.fileName"
              placeholder="File name"
            />
          </el-form-item>
        </div>
        <div style="float: right">
          <base-select
            :clearable="false"
            prop="type"
            size="medium"
            v-model="params.contentType"
            style="margin: 5px 15px 0 0;float: right;width: 100px;"
          >
            <el-option
              value="base64"
              label="base64"
            />
            <el-option
              value="text"
              label="text"
            />
          </base-select>
        </div>
      </div>
    </editor>

    <div style="clear: both;margin-top: 80px;" />

    <base-input
      label="Commit message"
      v-model="params.commitMessage"
      prop="commitMessage"
      type="textarea"
    />
    <base-select
      v-model="params.branchName"
      label="Target branch"
      prop="branchName"
      :clearable="false"
    />
  </base-form>
</template>

<script>
  import Editor from 'vue2x-ace-editor';

  export default {
    components: {
      Editor
    },
    data() {
      return {
        params: {
          parentPath: this.$route.query.fullPath || './',
          fileName: '',
          content: '',
          contentType: 'text',
          commitMessage: 'Add new file',
          branchName: this.$route.params.pathMatch || 'master'
        },
        rules: {
          fileName: [
            {required: true, message: 'Required'},
            {validator: this.validateFileName}
          ],
          commitMessage: [
            {required: true, message: 'Required'}
          ]
        }
      };
    },
    methods: {
      validateFileName(rule, value, callback) {
        if (!value) {
          callback();
          return;
        }

        let fullPath = this.$route.query.fullPath || '';
        let fileName = this.params.fileName;
        if (fileName.startsWith('/')) {
          fileName = fileName.substring(1);
        }
        if (fileName.endsWith('/')) {
          fileName = fileName.substring(0, fileName.lastIndexOf('/'));
        }
        fullPath += fileName;

        this.axios.get('validate/fileName?namespace=' + this.$route.params.namespace + '&projectPath='
          + this.$route.params.projectPath + '&branch=' + this.$route.params.pathMatch + '&fullPath=' + fullPath).then(() => {
          callback();
        }).catch(res => {
          callback(new Error(res.respMsg));
        });
      },
      editorInit() {
        require('brace/ext/language_tools');
        require('brace/mode/java');
        require('brace/snippets/java');
        require('brace/theme/github');
      },
      editorChange(editor) {
        this.params.content = editor.getValue();
      },
      success() {
        let fullPath = this.$route.query.fullPath || '';
        let fileName = this.params.fileName;
        if (fileName.startsWith('/')) {
          fileName = fileName.substring(1);
        }
        if (fileName.endsWith('/')) {
          fileName = fileName.substring(0, fileName.lastIndexOf('/'));
        }
        fullPath += fileName;
        this.$router.push({
          path: '/' + this.$route.params.namespace + '/' + this.$route.params.projectPath + '/blob/' +
            this.params.branchName,
          query: {
            fullPath: fullPath
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .toolbar {
    height: 50px;
    line-height: 50px;
    background: #fafafa;
    border: 1px solid #e5e5e5;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    .split {
      float: left;
      display: inline-block;
      height: 35px;
      line-height: 35px;
      margin-top: 7px;
      border-right: 1px solid #ccc;
      padding: 0 15px 0 10px;
      margin-right: 15px;
    }

    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }

    /deep/ .el-form-item__error {
      top: 10px;
      left: 410px;
      width: 160px;
    }
  }

  /deep/ .ace_editor {
    border: 1px solid #e5e5e5;
  }
</style>