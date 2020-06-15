<template>
  <div style="max-width: 1000px;margin: 0 auto;">
    <base-panel-left title="Authentication log">
      <p>This is a security log of important events involving your account.</p>
    </base-panel-left>
    <base-panel-right>
      <h4>History of authentications</h4>
      <base-table
        url="/profile/signInLog"
        jump-url="/profile/audit_log"
        ref="table"
        :params="params"
        :border="false"
        :stripe="false"
      >
        <el-table-column
          prop="id"
          label="Log id"
          sortable
        />
        <el-table-column
          prop="signInTime"
          label="Sign in time"
          sortable
        >
          <template slot-scope="scope">
            {{ util.formatTimestamp(scope.row.signInTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="signInIp"
          label="Sign in ip"
          sortable
        />
      </base-table>
    </base-panel-right>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: {}
      };
    },
    mounted() {
      Object.keys(this.$route.query).forEach(key => {
        this.params[key] = this.$route.query[key];
      });
      this.$refs.table.reload();
    },
    beforeRouteUpdate(to, from, next) {
      this.$refs.table.reload();
      next();
    }
  };
</script>

<style scoped lang="scss">
  h4 {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #2e2e2e;
  }
</style>
