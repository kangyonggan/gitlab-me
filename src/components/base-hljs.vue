<template>
  <pre style="margin: 0;padding: 0;"><code :class="lang">{{ value }}</code></pre>
</template>

<script>
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github.css';

  export default {
    props: {
      value: {
        required: true,
        type: String
      },
      lang: {
        required: false,
        type: String,
        default: 'plain'
      }
    },
    mounted() {
      hljs.highlightBlock(this.$el);

      window.hljs = hljs;
      require('highlightjs-line-numbers.js');

      hljs.lineNumbersBlock(this.$el.firstChild);
    }
  };
</script>

<style scoped lang="scss">
  /deep/ .hljs {
    padding: 0;
  }

  /deep/ .hljs-ln {
    .hljs-ln-numbers {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      text-align: right;
      color: rgba(0,0,0,0.3);
      border-right: 1px solid #e5e5e5;
      vertical-align: top;
      padding: 4px 5px 4px 0 !important;

      min-width: 50px;
    }

    .hljs-ln-code {
      padding-left: 10px !important;
      line-height: 1.4;
      background: #fff;
      width: 100%;
    }
  }
</style>

