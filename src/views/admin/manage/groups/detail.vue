<template>
  <div>
    <el-alert
      style="margin-bottom: 20px;"
      v-show="showAlert"
      :title="alertTitle"
      type="success"
      :closable="false"
    />
    <el-col :span="12">
      <el-card class="card">
        <div slot="header">
          <span>Group info</span>
        </div>
        <ul>
          <li />
        </ul>
      </el-card>
    </el-col>
    <el-col :span="12">
      xxx
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showAlert: false,
        alertTitle: '',
        group: {}
      };
    },
    methods: {
      updateAlert() {
        if (this.$route.query.from === 'edit') {
          this.showAlert = true;
          this.alertTitle = 'Group was successfully updated.';
        } else if (this.$route.query.from === 'new') {
          this.showAlert = true;
          this.alertTitle = 'Group ' + this.group.groupName + ' was successfully created.';
        }

        let that = this;
        setTimeout(function () {
          that.showAlert = false;
        }, 3000);
      }
    },
    mounted() {
      let id = this.$route.params.id;
      if (id) {
        this.loading = true;
        this.axios.get('admin/groups/' + id).then(data => {
          this.group = data.group;
          this.$parent.$children[0].updateTitle(data.group.groupName);
          this.updateAlert();
        }).catch(res => {
          this.error(res.respMsg);
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .card {
    /deep/ .el-card__header {
      background: #fafafa;
    }
  }
</style>