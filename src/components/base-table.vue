<template>
  <div style="margin-top: 20px;">
    <el-table
      :data="list"
      :stripe="stripe"
      :border="border"
      @sort-change="sortChange"
    >
      <slot />
    </el-table>

    <el-row
      v-if="pagination && total > list.length"
      style="margin-top: 20px;"
    >
      <el-pagination
        :current-page="params.pageNum * 1"
        :page-size="params.pageSize * 1"
        layout="total, sizes, prev, pager, next, jumper"
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
        required: true,
        type: String
      },
      jumpUrl: {
        required: false,
        type: String,
        default: ''
      },
      params: {
        required: false,
        type: Object,
        default: function () {
          return {};
        }
      },
      pagination: {
        required: false,
        type: Boolean,
        default: true
      },
      border: {
        required: false,
        type: Boolean,
        default: true
      },
      stripe: {
        required: false,
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        total: 0,
        list: []
      };
    },
    methods: {
      reload: function () {
        this.$store.commit('setLoading', true);
        this.axios.get(this.url + '?' + qs.stringify(this.params)).then(data => {
          if (this.pagination) {
            this.list = data.pageInfo.list;
            this.total = data.pageInfo.total;
          } else {
            this.list = data.list;
          }
        }).catch(() => {
          this.total = 0;
          this.list = [];
        }).finally(() => {
          this.$store.commit('setLoading', false);
        });
      },
      jump: function (pageNum) {
        if (!pageNum) {
          pageNum = 1;
        }
        this.params.pageNum = pageNum;

        this.$router.push({
          path: this.jumpUrl ? this.jumpUrl : this.url,
          query: this.params
        });
      },
      changeSize: function (pageSize) {
        this.params.pageSize = pageSize;
        this.jump();
      },
      sortChange: function (column) {
        this.params.prop = column.prop;
        this.params.order = column.order;
        if (this.pagination) {
          this.jump();
        }
      }
    }
  };
</script>

