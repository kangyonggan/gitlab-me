<template>
  <el-col v-loading="loading">
    <h3 class="page-title">
      {{ user.fullName }}
      <span>({{ user.username }})</span>
      <router-link :to="'/admin/users/' + user.id + '/edit'">
        <i class="el-icon-edit-outline">Edit</i>
      </router-link>
    </h3>
    <base-hr />
    <el-tabs
      v-model="tab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="Account"
        name="account"
      >
        <tab-account :user="user" />
      </el-tab-pane>
      <el-tab-pane
        label="Groups"
        name="groups"
      >
        Groups
      </el-tab-pane>
      <el-tab-pane
        label="Projects"
        name="projects"
      >
        Projects
      </el-tab-pane>
    </el-tabs>
  </el-col>
</template>

<script>
  import TabAccount from './tab-account';

  export default {
    components: {TabAccount},
    data() {
      return {
        loading: false,
        tab: '',
        user: {}
      };
    },
    methods: {
      handleClick(tab) {
        this.$router.push({
          path: '/admin/users/' + this.user.id,
          query: {
            tab: tab.name
          }
        });
      }
    },
    mounted() {
      this.tab = this.$route.query.tab || 'account';
      let id = this.$route.params.id;
      if (id) {
        this.loading = true;
        this.axios.get('admin/users/' + id).then(data => {
          this.user = data.user;
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
  .page-title {
    color: #2e2e2e;
    font-weight: 600;
    margin-top: 0;
    font-size: 20px;

    span {
      color: #db3b21;
    }

    a {
      float: right;
      border-radius: 4px;
      font-weight: 400;
      padding: 6px 10px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      color: #2e2e2e;
      white-space: nowrap;
      font-size: 14px;
    }

    a:hover {
      background: #f5f5f5;
    }
  }
</style>