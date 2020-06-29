<template>
  <el-tooltip
    slot="append"
    effect="dark"
    :placement="placement"
    :content="util.formatTimestamp(timestamp)"
  >
    <span>
      {{ util.relativeTime(timestamp) }}
    </span>
  </el-tooltip>
</template>

<script>
  export default {
    props: {
      timestamp: {
        required: false,
        type: [Number, String],
        default: ''
      },
      placement: {
        required: false,
        type: String,
        default: 'top'
      }
    }
  };
</script>