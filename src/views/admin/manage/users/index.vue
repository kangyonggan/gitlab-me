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
          @click="$refs['create-modal'].show()"
        >
          New User
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="admin/manage/users"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$refs['edit-modal'].show(row)"
          @command="handleCommand($event, row)"
        >
          Edit
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              Password
            </el-dropdown-item>
            <el-dropdown-item command="1">
              <span v-if="!row.isDeleted">Remove by logic</span>
              <span v-else>Recovery of logic</span>
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
                        label: 'Sign up',
                        prop: 'signUpIp'
                    },
                    {
                        label: 'Access level',
                        prop: 'accessLevel'
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
            handleCommand: function (command, row) {
                if (command === '0') {
                    console.log(row);
                } else if (command === '1') {
                    console.log(row);
                }
            }
        }
    };
</script>