<template>
  <div>
    <el-card>
      <div slot="header">
        <span>Project info:</span>
      </div>
      <ul>
        <li>
          Name: <strong>
            <router-link :to="'/' + project.namespace + '/' + project.projectPath">
              {{ project.projectName }}
            </router-link>
          </strong>
        </li>
        <li>
          Namespace: <strong>
            <router-link :to="'/admin/groups/' + project.namespace">
              {{ project.namespace }}
            </router-link>
          </strong>
        </li>
        <li>Description: <strong>{{ project.description }}</strong></li>
        <li>Owned by: <strong>11</strong></li>
        <li>
          Created on: <strong>
            <base-relative-time :timestamp="project.createdTime" />
          </strong>
        </li>
        <li>
          Http: <strong>
            <router-link :to="'/' + project.namespace + '/' + project.projectPath + '.git'">
              {{ constants.EXTERNAL_URL }}/{{ project.namespace }}/{{ project.projectPath }}.git
            </router-link>
          </strong>
        </li>
        <li>Storage: <strong>{{ util.formatSize(project.size) }}</strong></li>
        <li>
          last commit:
          <strong v-if="project.lastCommit">
            {{ util.relativeTime(project.lastCommit.date) }}
          </strong>
          <strong v-else>Never</strong>
        </li>
        <li>
          access:
          <strong style="color: #1aaa55">
            <span v-if="project.visibilityLevel === 0">
              <i class="el-icon-lock" />
              Private
            </span>
            <span v-else-if="project.visibilityLevel === 1">
              <i class="el-icon-refrigerator" />
              Internal
            </span>
            <span v-else-if="project.visibilityLevel === 2">
              <i class="el-icon-open" />
              Public
            </span>
          </strong>
        </li>
      </ul>
    </el-card>
    <el-card
      style="float: right;margin-bottom: 20px;"
      v-if="group"
    >
      <div slot="header">
        <span>
          <strong style="font-size: 16px;">{{ group.groupName }}</strong>
          group members
          <a class="badge">
            {{ groupUsers.length }}
          </a>
        </span>

        <router-link
          :to="'/groups/' + group.groupPath + '/members'"
          class="manage-access"
        >
          <i class="el-icon-edit-outline" />
          Manage access
        </router-link>
      </div>
      <ul>
        <li
          v-for="groupUser in groupUsers"
          :key="groupUser.id"
          style="padding: 8px 15px;"
        >
          <div style="height: 48px;">
            <base-avatar
              style="float: left;margin-top: 8px;"
              :size="32"
              :avatar="groupUser.avatar"
              :empty-avatar="groupUser.email"
            />
            <div style="float: left;line-height: 20px;margin-left: 8px;font-size: 13px;margin-top: 5px;">
              <div>
                <strong>{{ groupUser.fullName }}</strong> @{{ groupUser.username }}
                <span
                  v-if="$store.getters.getUser.id === groupUser.userId"
                  style="padding: 1px 5px;font-size: 12px;background: #1aaa55;border-radius: 8px;color: #fff;"
                >It's you</span>
              </div>
              <div>Joined at {{ util.relativeTime(groupUser.createdTime, 'yyyy-MM-dd') }}</div>
            </div>
            <div
              style="margin-top: 13px;float: right;margin-right: 10px;color: #707070;border: 1px solid #e5e5e5;border-radius: 10px;padding: 2px 7px;"
            >
              {{ formatAccess(groupUser.access) }}
            </div>
          </div>
        </li>
      </ul>
    </el-card>
    <el-card style="float: right;">
      <div slot="header">
        <span>
          <strong style="font-size: 16px;">{{ project.projectName }}</strong>
          project members
          <a class="badge">
            {{ projectUsers.length }}
          </a>
        </span>

        <router-link
          :to="'/' + project.namespace + '/' + project.projectPath + '/members'"
          class="manage-access"
        >
          <i class="el-icon-edit-outline" />
          Manage access
        </router-link>
      </div>
      <ul>
        <li
          v-for="projectUser in projectUsers"
          :key="projectUser.id"
          style="padding: 8px 15px;"
        >
          <div style="height: 48px;">
            <base-avatar
              style="float: left;margin-top: 8px;"
              :size="32"
              :avatar="projectUser.avatar"
              :empty-avatar="projectUser.email"
            />
            <div style="float: left;line-height: 20px;margin-left: 8px;font-size: 13px;margin-top: 5px;">
              <div>
                <strong>{{ projectUser.fullName }}</strong> @{{ projectUser.username }}
                <span
                  v-if="$store.getters.getUser.id === projectUser.userId"
                  style="padding: 1px 5px;font-size: 12px;background: #1aaa55;border-radius: 8px;color: #fff;"
                >It's you</span>
              </div>
              <div>Joined at {{ util.relativeTime(projectUser.createdTime, 'yyyy-MM-dd') }}</div>
            </div>
            <div
              style="margin-top: 13px;float: right;margin-right: 10px;color: #707070;border: 1px solid #e5e5e5;border-radius: 10px;padding: 2px 7px;"
            >
              {{ formatAccess(projectUser.access) }}
            </div>
          </div>
        </li>
      </ul>
    </el-card>
    <el-card style="margin-top: 20px;clear: left">
      <div slot="header">
        <span>
          <strong>Transfer project</strong>
        </span>
      </div>
      <el-form
        ref="form"
        class="namespace-form"
        :rules="rules"
        :model="params"
      >
        <el-form-item
          label="Namespace"
          prop="namespace"
        >
          <el-select
            v-model="params.namespace"
            placeholder="Search for Namespace"
          >
            <el-option-group
              v-for="ns in namespaces"
              :key="ns.prefix"
              :label="ns.label"
            >
              <el-option
                v-for="item in ns.options"
                :key="item[ns.key]"
                :label="ns.prefix + ':' + item[ns.key]"
                :value="item[ns.key]"
              />
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            type="primary"
            size="medium"
            style="margin-left: 104px;"
            @click="transfer"
          >
            Transfer
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        project: {},
        projectUsers: [],
        group: {},
        groupUsers: [],
        params: {
          id: 0,
          namespace: ''
        },
        rules: {
          namespace: [
            {required: true}
          ]
        },
        namespaces: [],
        loading: false
      };
    },
    methods: {
      transfer() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return;
          }

          this.loading = true;
          this.axios.put('admin/projects', this.params).then(() => {
            const sTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.util.scrollTop(window, sTop, 0, 1000);
            this.$router.push({
              path: '/admin/projects/' + this.params.namespace + '/' + this.project.projectPath
            });
            this.init(this.params.namespace, this.project.projectPath);
            this.$refs.form.resetFields();
          }).catch(res => {
            this.error(res.respMsg);
          }).finally(() => {
            this.loading = false;
          });
        });
      },
      formatAccess(access) {
        for (let i = 0; i < this.constants.ACCESS_LIST.length; i++) {
          if (access === this.constants.ACCESS_LIST[i].code) {
            return this.constants.ACCESS_LIST[i].name;
          }
        }
      },
      init(namespace, projectPath) {
        this.axios.get('admin/projects/' + namespace + '/' + projectPath + '/users').then(data => {
          this.params.id = data.project.id;
          this.project = data.project;
          this.projectUsers = data.projectUsers;
          this.group = data.group;
          this.groupUsers = data.groupUsers;
          this.util.updateBreadcrumbsAndTitle(data.project.projectName);
        }).catch(res => {
          this.error(res.respMsg);
        });
      }
    },
    mounted() {
      let projectPath = this.$route.params.projectPath;
      let namespace = this.$route.params.namespace;
      this.init(namespace, projectPath);

      this.axios.get('admin/projects/allNamespaces').then(data => {
        this.namespaces = [{
          label: 'Groups',
          prefix: 'group',
          key: 'groupPath',
          options: data.groups
        }, {
          label: 'Users',
          prefix: 'user',
          key: 'username',
          options: data.users
        }];
      }).catch(res => {
        this.error(res.respMsg);
      });
    }
  };
</script>

<style scoped lang="scss">
  .el-card {
    float: left;
    width: 48.5%;
    min-width: 512px;

    /deep/ .el-card__header {
      background: #fafafa;
    }

    /deep/ .el-card__body {
      padding: 0;
    }

    .manage-access {
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

    .manage-access:hover {
      background: #f5f5f5;
      text-decoration: none;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;

      li {
        color: #2e2e2e;
        padding: 10px 15px;
        min-height: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        a {
          color: #2e2e2e;
        }
      }

      li:last-child {
        border: 0;
      }

      li:hover {
        background: #f6fafd;
      }
    }

    .el-form {
      padding: 20px;
    }

    .badge {
      display: inline-block;
      color: #fff;
      background: #111;
      border-radius: 50%;
      text-decoration: none;
      min-width: 17px;
      height: 17px;
      text-align: center;
      line-height: 17px;
      padding: 3px;
      font-size: 12px;
      margin-left: 10px;
    }
  }

  .namespace-form {
    margin-left: 50px;

    /deep/ .el-form-item__label {
      font-weight: bold;
    }

    /deep/ .el-form-item__error {
      left: 104px;
    }
  }
</style>