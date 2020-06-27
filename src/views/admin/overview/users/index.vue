<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="Username"
        v-model="params.username"
        prop="username"
      />
      <base-input
        label="Full name"
        v-model="params.fullName"
        prop="fullName"
      />
      <base-input
        label="Email"
        v-model="params.email"
        prop="email"
      />
      <template #actions>
        <el-button
          type="success"
          @click="newUser"
        >
          New user
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/admin/users"
      :params="params"
      ref="table"
    >
      <el-table-column
        prop="username"
        label="Username"
        sortable
      >
        <template slot-scope="scope">
          <router-link
            :to="'/admin/users/' + scope.row.username"
            style="font-weight: 500;"
          >
            <base-avatar
              :size="30"
              style="float: left"
              :avatar="scope.row.avatar"
              :empty-avatar="scope.row.email"
            />
            <span style="float: left;margin-top: 5px;margin-left: 5px;">
              {{ scope.row.username }}
            </span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="Full name"
        sortable
      />
      <el-table-column
        prop="email"
        label="Email"
        width="230"
        sortable
      />
      <el-table-column
        prop="accessLevel"
        label="Access Level"
        sortable
      >
        <template slot-scope="scope">
          {{ scope.row.accessLevel }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-dropdown
            split-button
            trigger="click"
            size="small"
            @click="editUer(scope.row)"
            @command="handleCommand($event, scope.row)"
          >
            <i class="el-icon-edit-outline" />
            Edit
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">
                <span style="color: #f56c6c">
                  <i class="el-icon-delete" />
                  Remove
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: {
          username: '',
          fullName: '',
          email: ''
        }
      };
    },
    methods: {
      newUser() {
        this.$router.push({
          path: '/admin/users/new'
        });
      },
      editUer(user) {
        this.$router.push({
          path: '/admin/users/' + user.username + '/edit'
        });
      },
      handleCommand: function (command, row) {
        if (command === '0') {
          this.$confirm('Physics remove ' + row.fullName + ', are you sure?', 'Confirmation',
            {type: 'warning'}).then(() => {
            this.axios.delete('admin/users/' + row.id).then(() => {
              this.$refs.table.reload();
            }).catch(res => {
              this.error(res.respMsg);
            });
          });
        }
      }
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