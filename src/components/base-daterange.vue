<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-date-picker
      :value="value"
      @input="$emit('input', $event)"
      type="daterange"
      value-format="yyyy-MM-dd"
      unlink-panels
      :editable="false"
      :start-placeholder="startPlaceholder ? startPlaceholder : 'Select the start date'"
      :end-placeholder="endPlaceholder ? endPlaceholder : 'Select the end date'"
    />
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
        required: true,
        type: String
      },
      value: {
        required: false,
        type: Array,
        default: function () {
          return [];
        }
      },
      startPlaceholder: {
        required: false,
        type: String,
        default: undefined
      },
      endPlaceholder: {
        required: false,
        type: String,
        default: undefined
      }
    }
  };
</script>