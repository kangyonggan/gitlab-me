<template>
  <div style="margin-top: 20px;">
    <el-table
      :data="list"
      stripe
      border
      @sort-change="changeSort"
      :empty-text="emptyText"
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable === udf || column.sortable"
        :fixed="column.fixed"
        :width="column.width"
      >
        <template slot-scope="scope">
          <span v-if="column.render">
            {{ column.render(scope.row) }}
          </span>
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>

      <slot />
      <el-table-column
        label="Operation"
        v-if="actions"
        :fixed="fixedAction ? 'right' : false"
        width="135"
      >
        <template slot-scope="scope">
          <slot
            name="actions"
            :row="scope.row"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-row
      v-if="pagination"
      style="margin-top: 20px;"
    >
      <el-pagination
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :layout="$store.getters.getSmallScreen ? 'total, sizes, prev, next, jumper' : 'total, sizes, prev, pager, next, jumper'"
        :total="total"
        @next-click="jump"
        @prev-click="jump"
        @current-change="jump"
        @size-change="changeSize"
      />
    </el-row>
  </div>
</template>

<script>
  import qs from 'qs';

  export default {
    props: {
      url: {
        required: false,
        type: String,
        default: ''
      },
      columns: {
        required: false,
        type: Array,
        default: function () {
          return [];
        }
      },
      actions: {
        required: false,
        type: Boolean,
        default: true
      },
      fixedAction: {
        required: false,
        type: Boolean,
        default: false
      },
      lazy: {
        required: false,
        type: Boolean,
        default: false
      },
      pagination: {
        required: false,
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        udf: undefined,
        params: {
          pageNum: 1,
          pageSize: 10
        },
        emptyText: 'No data',
        total: 0,
        list: []
      };
    },
    methods: {
      request: function () {
        this.$store.commit('setLoading', true);
        this.emptyText = 'Loading';
        this.axios.get(this.url + '?' + qs.stringify(this.params)).then(data => {
          if (this.pagination) {
            this.list = data.pageInfo.list;
            this.total = data.pageInfo.total;
            if (!this.total) {
              this.emptyText = 'No data';
            }
          } else {
            this.list = data.list;
            if (!this.list || !this.list.length) {
              this.emptyText = 'No data';
            }
          }
        }).catch(res => {
          this.total = 0;
          this.list = [];
          this.emptyText = res.respMsg;
        }).finally(() => {
          this.$store.commit('setLoading', false);
        });
      },
      reload: function (params) {
        if (!params) {
          params = {};
        }
        this.params = Object.assign({
          pageNum: 1,
          pageSize: this.params.pageSize,
          sortColumn: this.params.sortColumn,
          sortOrder: this.params.sortOrder
        }, params);
        this.request();
      },
      jump: function (pageNum) {
        this.params.pageNum = pageNum;
        this.request();
      },
      changeSize: function (pageSize) {
        this.params.pageNum = 1;
        this.params.pageSize = pageSize;
        this.request();
      },
      changeSort: function (column) {
        this.params.pageNum = 1;
        this.params.prop = column.prop;
        this.params.order = column.order;
        if (this.pagination) {
          this.request();
        }
      }
    },
    mounted() {
      if (!this.lazy) {
        this.request();
      }
    }
  };
</script>

