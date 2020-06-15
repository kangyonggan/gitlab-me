<template>
  <div style="max-width: 1000px;margin: 0 auto;">
    <base-panel-left title="Authentication log">
      <p>This is a security log of important events involving your account.</p>
    </base-panel-left>
    <base-panel-right>
      <h4>History of authentications</h4>
      <el-table
        :data="tableData"
      >
        <el-table-column
          prop="date"
          label="Sign in time"
          width="180"
        />
        <el-table-column
          prop="address"
          label="Sign in ip"
          width="180"
        />
        <el-table-column
          prop="name"
          label="Log description"
        />
      </el-table>
    </base-panel-right>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      };
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
