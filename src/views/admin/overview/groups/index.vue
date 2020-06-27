<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="Group path"
        v-model="params.groupPath"
        prop="groupPath"
      />
      <base-input
        label="Group name"
        v-model="params.groupName"
        prop="groupName"
      />
      <template #actions>
        <el-button
          type="success"
          @click="newGroup"
        >
          New group
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/admin/groups"
      :params="params"
      ref="table"
    >
      <el-table-column
        label="Group path"
        prop="groupPath"
        sortable
      >
        <template slot-scope="scope">
          <router-link
            :to="'/admin/groups/' + scope.row.groupPath"
            style="font-weight: 500;"
          >
            <base-avatar
              style="float: left"
              :size="30"
              type="retro"
              :avatar="scope.row.groupAvatar"
              :empty-avatar="scope.row.groupPath"
            />
            <span style="float: left;margin-top: 5px;margin-left: 5px;">
              {{ scope.row.groupPath }}
            </span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="Group name"
        sortable
      />
      <el-table-column
        prop="visibilityLevel"
        label="Visibility level"
        sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.visibilityLevel === 0">
            <i class="el-icon-lock" />
            Private
          </span>
          <span v-else-if="scope.row.visibilityLevel === 1">
            <i class="el-icon-refrigerator" />
            Internal
          </span>
          <span v-else-if="scope.row.visibilityLevel === 2">
            <i class="el-icon-open" />
            Public
          </span>
          <span v-else>
            <i class="el-icon-question" />
            {{ scope.row.visibilityLevel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-dropdown
            split-button
            trigger="click"
            size="small"
            @click="editGroup(scope.row)"
            @command="handleCommand($event, scope.row)"
          >
            <i class="el-icon-edit-outline" />
            Edit
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="0"
              >
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
          groupPath: '',
          groupName: ''
        }
      };
    },
    methods: {
      newGroup() {
        this.$router.push({
          path: '/admin/groups/new'
        });
      },
      editGroup(group) {
        this.$router.push({
          path: '/admin/groups/' + group.groupPath + '/edit'
        });
      },
      handleCommand: function (command, row) {
        if (command === '0') {
          this.$confirm('Are you sure you want to remove ' + row.groupName + '?', 'Confirmation',
            {type: 'warning'}).then(() => {
            this.axios.delete('admin/groups/' + row.id).then(() => {
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
