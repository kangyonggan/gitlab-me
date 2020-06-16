<template>
  <div>
    <el-card>
      <div slot="header">
        <span>Group info:</span>
      </div>
      <ul>
        <li>
          <base-avatar
            :avatar="group.groupAvatar"
            type="retro"
            :size="58"
            :empty-avatar="group.groupPath"
          />
        </li>
        <li>Name: <strong>{{ group.groupName }}</strong></li>
        <li>Path: <strong>{{ group.groupPath }}</strong></li>
        <li>Description: <strong>{{ group.description }}</strong></li>
        <li>
          Visibility level: <strong>{{ group.visibilityLevel === 0 ? 'Private' : group.visibilityLevel === 1 ?
            'Internal' : 'Public' }}</strong>
        </li>
        <li>Created on: <strong>{{ util.formatTimestamp(group.createdTime) }}</strong></li>
      </ul>
    </el-card>
    <el-card style="float: right">
      <div slot="header">
        <span>Add user(s) to the group:</span>
      </div>

      <el-form
        :model="params"
        :rules="rules"
        ref="form"
      >
        <div style="margin-bottom: 10px;">
          Read more about project permissions
          <router-link to="/">
            <strong>here</strong>
          </router-link>
        </div>

        <el-form-item prop="userIds">
          <el-select
            clearable
            style="width: 100%"
            v-model="params.userIds"
            placeholder="Search for a user"
            multiple
          >
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="user.fullName"
              :value="user.id"
              style="height: 48px;"
              :disabled="groupUserIds.includes(user.id)"
            >
              <div style="height: 48px;margin-top: 7px;">
                <base-avatar
                  style="float: left;"
                  :size="32"
                  :avatar="user.avatar"
                  :empty-avatar="user.email"
                />
                <div style="float: left;line-height: 17px;margin-left: 8px;font-size: 13px;">
                  <div>{{ user.fullName }}</div>
                  <div>@{{ user.username }}</div>
                </div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <base-select
          :items="accessList"
          v-model="params.access"
          prop="access"
        />

        <base-hr />
        <el-button
          v-loading="loading"
          size="small"
          type="success"
          @click="addUsersToGroup"
        >
          Add users to group
        </el-button>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;float: right;">
      <div slot="header">
        <span>
          <strong style="font-size: 16px;">{{ group.groupName }}</strong>
          group members 
          <a class="badge">
            {{ groupUsers.length }}
          </a>
        </span>

        <router-link
          :to="'/admin/groups/' + group.id + '/users'"
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
              <div><strong>{{ groupUser.fullName }}</strong> @{{ groupUser.username }}</div>
              <div>{{ util.formatTimestamp(groupUser.createdTime) }}</div>
            </div>
            <div style="margin-top: 13px;float: right;margin-right: 10px;color: #707070;border: 1px solid #e5e5e5;border-radius: 10px;padding: 2px 7px;">
              {{ formatAccess(groupUser.access) }}
            </div>
          </div>
        </li>
      </ul>
    </el-card>
    <el-card style="margin-top: 20px;clear: left">
      <div slot="header">
        <span>
          <strong>Projects</strong>
          <a class="badge">
            0
          </a>
        </span>
      </div>
      <ul>
        <li />
      </ul>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        group: {},
        params: {
          userIds: [],
          access: 0
        },
        rules: {
          userIds: [
            {required: true, message: 'Select at least one user'}
          ]
        },
        users: [],
        groupUsers: [],
        groupUserIds: [],
        accessList: [
          {
            code: 0,
            name: 'Guest'
          },
          {
            code: 1,
            name: 'Reporter'
          },
          {
            code: 2,
            name: 'Developer'
          },
          {
            code: 3,
            name: 'Master'
          },
          {
            code: 4,
            name: 'Owner'
          }
        ]
      };
    },
    methods: {
      formatAccess(access) {
        if (access === 0) {
          return 'Guest';
        } else if (access === 1) {
          return 'Reporter';
        } else if (access === 2) {
          return 'Developer';
        } else if (access === 3) {
          return 'Master';
        } else if (access === 4) {
          return 'Owner';
        }
      },
      loadUsers() {
        this.axios.get('admin/users/all').then(data => {
          this.users = data.users;
        }).catch(res => {
          this.error(res.respMsg);
        });
      },
      loadGroupUsers(groupId) {
        this.axios.get('admin/groups/' + groupId + '/users').then(data => {
          this.groupUsers = data.groupUsers;

          this.groupUserIds = [];
          for (let i = 0; i < this.groupUsers.length; i++) {
            this.groupUserIds[i] = this.groupUsers[i].id;
          }
        }).catch(res => {
          this.error(res.respMsg);
        });
      },
      addUsersToGroup() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return;
          }

          this.loading = true;
          this.axios.post('admin/groups/' + this.group.id + '/users', this.params).then(() => {
            this.success('Users were successfully added.');
            this.params.userIds = [];
            this.params.access = 0;
            this.$refs.form.resetFields();
            this.loadGroupUsers(this.group.id);
          }).catch(res => {
            this.error(res.respMsg);
          }).finally(() => {
            this.loading = false;
          });
        });
      }
    },
    mounted() {
      let groupPath = this.$route.params.groupPath;
      this.params.groupPath = groupPath;

      this.loadUsers();

      if (groupPath) {
        this.loading = true;
        this.axios.get('admin/groups/' + groupPath).then(data => {
          this.group = data.group;
          this.$parent.$children[0].updateTitle(data.group.groupName);
          this.loadGroupUsers(this.group.id);
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
</style>