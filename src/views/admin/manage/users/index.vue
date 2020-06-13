<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="username"
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
          New User
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="admin/users"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="editUer(row)"
          @command="handleCommand($event, row)"
        >
          <i class="el-icon-edit-outline" />
          Edit
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              command="0"
              :disabled="row.isDeleted ? true : false"
            >
              <i class="el-icon-circle-close" />
              Remove by logic
            </el-dropdown-item>
            <el-dropdown-item
              command="1"
              :disabled="row.isDeleted ? false : true"
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
    </base-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: {},
        columns: [
          {
            label: 'Username',
            prop: 'username'
          },
          {
            label: 'Full name',
            prop: 'fullName'
          },
          {
            label: 'Email',
            prop: 'email',
            width: 200
          },
          {
            label: 'Status',
            prop: 'isDeleted',
            render: row => {
              return this.util.formatStatus(row.isDeleted);
            }
          },
          {
            label: 'Sign up',
            prop: 'signUpTime',
            width: 180,
            render: row => {
              return this.util.formatTimestamp(row.signUpTime);
            }
          }
        ]
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
          path: '/admin/users/' + user.id + '/edit'
        });
      },
      handleCommand: function (command, row) {
        if (command === '0' || command === '1') {
          this.axios.put('admin/users/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
            this.$refs.table.request();
          }).catch(res => {
            this.error(res.respMsg);
          });
        } else if (command === '2') {
          this.$confirm('Physics remove ' + row.fullName + ', are you sure?', 'Confirmation',
            {type: 'warning'}).then(() => {
            this.axios.delete('admin/users/' + row.id).then(() => {
              this.$refs.table.request();
            }).catch(res => {
              this.error(res.respMsg);
            });
          });
        }
      }
    }
  };
</script>