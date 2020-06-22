<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="Project name"
        v-model="params.projectName"
        prop="projectName"
      />

      <base-select
        label="Namespace"
        prop="namespace"
        v-model="params.namespace"
      >
        <el-option-group
          v-for="group in namespaces"
          :key="group.prefix"
        >
          <el-option
            v-for="item in group.options"
            :key="item[group.key]"
            :label="group.prefix + ':' + item[group.key]"
            :value="item[group.key]"
          />
        </el-option-group>
      </base-select>

      <base-input
        label="Project path"
        v-model="params.projectPath"
        prop="projectPath"
      />
      <template #actions>
        <el-button
          type="success"
          @click="newGroup"
        >
          New project
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/admin/projects"
      :params="params"
      ref="table"
    >
      <el-table-column
        prop="projectName"
        label="Project name"
        sortable
      />
      <el-table-column
        prop="namespace"
        label="Namespace"
        sortable
      >
        <template slot-scope="scope">
          <router-link :to="'/' + scope.row.namespace">
            {{ scope.row.namespace }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Project path"
        prop="projectPath"
        sortable
      >
        <template slot-scope="scope">
          <router-link
            :to="'/admin/projects/' + scope.row.projectPath"
            style="font-weight: 500;"
          >
            <base-avatar
              style="float: left"
              :size="30"
              type="robohash"
              :avatar="scope.row.projectPath"
            />
            <span style="float: left;margin-top: 5px;margin-left: 5px;">
              {{ scope.row.projectPath }}
            </span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="Description"
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
          projectName: '',
          namespace: '',
          projectPath: ''
        },
        namespaces: []
      };
    },
    methods: {
      newGroup() {
        this.$router.push({
          path: '/admin/projects/new'
        });
      },
      editGroup(project) {
        this.$router.push({
          path: '/admin/projects/' + project.projectPath + '/edit'
        });
      },
      handleCommand: function (command, row) {
        if (command === '0') {
          this.$confirm('Are you sure you want to remove ' + row.projectName + '?', 'Confirmation',
            {type: 'warning'}).then(() => {
            this.axios.delete('admin/projects/' + row.id).then(() => {
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

      this.axios.get('admin/projects/allNamespaces').then(data => {
        this.namespaces = [{
          prefix: 'group',
          key: 'groupPath',
          options: data.groups
        }, {
          prefix: 'user',
          key: 'username',
          options: data.users
        }];
      }).catch(res => {
        this.error(res.respMsg);
      });
    },
    beforeRouteUpdate(to, from, next) {
      this.$refs.table.reload();
      next();
    }
  };
</script>
