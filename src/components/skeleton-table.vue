<template>
  <svg
    class="skeleton-table"
    :width="width"
    :height="height"
  >
    <rect
      x="0"
      y="0"
      width="100%"
      height="48"
      class="header"
    />
    <rect
      v-for="col in columnsCount + (displayActions ? 1 : 0)"
      :key="'th-' + col"
      :x="columnX(col) + '%'"
      y="12"
      :width="columnWidth + '%'"
      height="24"
      class="th"
    />
    <svg
      v-for="row in 4"
      :key="row"
    >
      <rect
        v-for="col in columnsCount"
        :key="'rect-' + row + '-' + col"
        :x="columnX(col) + '%'"
        :y="12 + 48 * row"
        rx="3"
        ry="3"
        :width="columnWidth + '%'"
        height="24"
        class="td"
      />
      <circle
        v-for="i in 3"
        :key="'circle-' + row + '-' + i"
        :cx="(columnX(columnsCount + 1) + columnWidth * (i * 3 - 1) / 10) + '%'"
        :cy="24 + 48 * row"
        r="12"
        class="td"
      />
    </svg>
  </svg>
</template>

<script>
  export default {
    props: {
      columnsCount: {
        required: false,
        type: Number,
        default: 4
      },
      displayActions: {
        required: false,
        type: Boolean,
        default: true
      },
      width: {
        required: false,
        type: String,
        default: '100%'
      },
      height: {
        required: false,
        type: String,
        default: '240px'
      },
      spaceWidth: {
        required: false,
        type: Number,
        default: 3
      }
    },
    computed: {
      /**
       * 计算列宽 = (100 - 空格宽度 * (空格数 + 1)) / 列总数
       *
       * @returns {string}
       */
      columnWidth() {
        let totalColumnsCount = this.columnsCount + (this.displayActions ? 1 : 0);
        return (100 - this.spaceWidth * (totalColumnsCount + 1)) / totalColumnsCount;
      }
    },
    methods: {
      /**
       * 计算列的横坐标 = 列下标（从1开始） * （列宽+空格宽）- 列宽
       *
       * @returns {string}
       */
      columnX(column) {
        let columnWidth = this.columnWidth;
        return column * (columnWidth + this.spaceWidth) - columnWidth;
      }
    }
  };
</script>

<style scoped lang="scss">
  .skeleton-table {
    margin-top: 20px;
    border: 1px solid rgb(229, 229, 229);

    .header {
      fill: #eaeced;
      stroke-width: 1;
      stroke: #e0e0e0;
    }

    .th {
      fill: #fff;
    }

    .td {
      fill: #eaeced;
    }
  }
</style>