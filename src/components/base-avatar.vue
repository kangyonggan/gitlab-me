<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-upload
      :action="axios.defaults.baseURL + 'fileUpload'"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :class="{'avatar-uploader': true, 'circular-avatar': circular}"
      :show-file-list="false"
    >
      <img
        v-if="value"
        :src="axios.defaults.baseURL + value"
        class="avatar"
      >
      <img
        v-else
        src="../assets/images/avatar.png"
        class="avatar"
      >
    </el-upload>
  </el-form-item>
</template>

<script>
  export default {
    props: {
      prop: {
        required: true,
        type: String
      },
      label: {
        required: false,
        type: String,
        default: undefined
      },
      circular: {
        required: false,
        type: Boolean,
        default: false
      },
      value: {
        required: false,
        type: String,
        default: ''
      },
      size: {
        required: false,
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        url: '',
        imgTypes: [
          'image/gif',
          'image/jpeg',
          'image/bmp',
          'image/png',
          'image/webp'
        ]
      };
    },
    methods: {
      beforeUpload(file) {
        if (!this.imgTypes.includes(file.type)) {
          this.error('Can only select gif/jpg/jpeg/bmp/png/webp picture');
          return false;
        }
        if (file.size / 1024 / 1024 > this.size) {
          this.error('Picture can\'t over then ' + this.size + 'MB!');
          return false;
        }

        return true;
      },
      uploadSuccess(res) {
        if (res.respCo !== '0000') {
          this.error(res.respMsg);
          return;
        }

        this.url = res.data.url;
        this.$emit('input', this.url);
      }
    },
    mounted() {
      this.url = this.value;
    }
  };
</script>

<style scoped lang="scss">
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .circular-avatar .el-upload {
    border-radius: 50% !important;
  }

  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 180px;
    height: 180px;
    display: block;
  }

  /deep/ label.el-form-item__label {
    width: 100%;
    text-align: right;
  }
</style>