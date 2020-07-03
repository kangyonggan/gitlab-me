<template>
  <el-tooltip
    slot="append"
    effect="dark"
    :content="tipMsg"
    :placement="placement"
    @mouseenter.native="mouseenter"
  >
    <span
      style="cursor: pointer"
      v-clipboard:copy="copy"
      v-clipboard:success="onCopySuccess"
      v-clipboard:error="onCopyError"
    >
      <i class="el-icon-document-copy" />
    </span>
  </el-tooltip>
</template>

<script>
  export default {
    props: {
      tip: {
        required: true,
        type: String
      },
      placement: {
        required: false,
        type: String,
        default: 'bottom'
      },
      copy: {
        required: false,
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tipMsg: this.tip
      };
    },
    methods: {
      onCopySuccess() {
        this.tipMsg = 'Copied';
      },
      mouseenter() {
        this.tipMsg = this.tip;
      },
      onCopyError() {
        this.error('Failed copy');
      }
    }
  };
</script>

