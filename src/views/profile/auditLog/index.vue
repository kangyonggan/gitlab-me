<template>
  <div style="max-width: 1000px;margin: 0 auto;">
    <div
      class="panel"
      style="width: 30%"
    >
      <h4>Authentication log</h4>
      <p>This is a security log of important events involving your account.</p>
    </div>
    <div
      class="panel"
      style="width: 62%;float: right"
    >
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
            <base-relative-time :timestamp="scope.row.signInTime" />
          </template>
        </el-table-column>
        <el-table-column
          prop="signInIp"
          label="Sign in ip"
          sortable
        />
      </base-table>
    </div>
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
  
  .panel {
    float: left;
    width: 48.5%;

    h4 {
      font-weight: 600;
      line-height: 1.2;
      color: #2e2e2e;
      margin: 0 0 10px 0;
      font-size: 20px;
    }

    p {
      line-height: 1.5;
    }
  }
</style>
