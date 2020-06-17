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
        sortable
      />
      <el-table-column
        prop="isDeleted"
        label="Status"
        sortable
      >
        <template slot-scope="scope">
          {{ util.formatStatus(scope.row.isDeleted) }}
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
              <el-dropdown-item
                command="0"
                :disabled="scope.row.isDeleted ? true : false"
              >
                <i class="el-icon-circle-close" />
                Remove by logic
              </el-dropdown-item>
              <el-dropdown-item
                command="1"
                :disabled="scope.row.isDeleted ? false : true"
              >
                <i class="el-icon-refresh-left" />
                Recovery of logic
              </el-dropdown-item>
              <el-dropdown-item
                command="2"
                divided
              >
                <span style="color: #f56c6c">
                  <i class="el-icon-delete" />
                  Remove by physics
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
        if (command === '0' || command === '1') {
          this.axios.put('admin/users/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
            this.$refs.table.reload();
          }).catch(res => {
            this.error(res.respMsg);
          });
        } else if (command === '2') {
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