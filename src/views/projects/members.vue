<template>
  <el-row v-loading="loading">
    <el-form
      :model="params"
      :rules="rules"
      ref="form"
    >
      <el-form-item prop="userIds">
        <div>
          Add new member to <strong>{{ project.projectName }}</strong>
        </div>
        <el-select
          ref="userFilter"
          filterable
          :filter-method="filterUsers"
          @visible-change="resetFilterUsers"
          clearable
          style="width: 100%"
          v-model="params.userIds"
          placeholder="Search for a user"
          multiple
          default-first-option
        >
          <el-option
            v-for="user in usersFiltered"
            :key="user.id"
            :label="user.fullName"
            :value="user.id"
            style="height: 48px;"
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
        <div class="desc">
          Search for members by full name, username, or email.
        </div>
      </el-form-item>

      <div style="width: 235px;float: left">
        <base-select
          :clearable="false"
          style="margin-bottom: 0;"
          :items="constants.ACCESS_LIST"
          v-model="params.access"
          prop="access"
        />
        <div class="desc">
          <router-link to="/">
            Read more
          </router-link>
          about role permissions
        </div>
      </div>

      <div style="width: 235px;float: left;margin-left: 30px;">
        <el-form-item prop="expirationDate">
          <el-date-picker
            v-model="params.expirationDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="Expiration date"
          />
          <div class="desc">
            On this date, the member(s) will automatically lose access to this project.
          </div>
        </el-form-item>
      </div>

      <el-form-item style="margin-left: 30px;float: left">
        <el-button
          type="success"
          @click="addToProject"
        >
          Add to project
        </el-button>
      </el-form-item>
    </el-form>

    <base-hr style="clear: both" />

    <div>
      <strong>Existing members</strong>
    </div>

    <el-form class="members">
      <div class="header">
        Members with access to {{ project.projectName }}
        <a class="badge">
          {{ projectUsers.length }}
        </a>
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
              :empty-avatar="projectUser.projectPath"
            />
            <div style="float: left;line-height: 20px;margin-left: 8px;font-size: 13px;margin-top: 5px;">
              <div>
                <strong>{{ projectUser.fullName }}</strong> @{{ projectUser.username }}
                <span
                  v-if="$store.getters.getUser.id === projectUser.userId"
                  style="padding: 1px 5px;font-size: 12px;background: #1aaa55;border-radius: 8px;color: #fff;"
                >It's you</span>
              </div>
              <div>Joined at {{ util.formatTimestamp(projectUser.createdTime, 'yyyy-MM-dd') }}</div>
            </div>
            <div v-if="$store.getters.getUser.id !== projectUser.userId">
              <el-button
                style="float: right;margin-left: 15px;margin-top: 6px;"
                size="medium"
                type="danger"
                :disabled="hasOneOwner && projectUser.access === 4"
                @click="removeProjectUser(projectUser)"
              >
                <i class="el-icon-delete-solid" />
              </el-button>
              <el-date-picker
                size="medium"
                value-format="yyyy-MM-dd"
                style="float: right;margin-top: 6px;margin-left: 10px;width: 160px;"
                v-model="projectUser.expirationDate"
                type="date"
                placeholder="Expiration date"
                :disabled="hasOneOwner && projectUser.access === 4"
                @change="onChangeProjectUser(projectUser)"
              />
              <base-select
                :disabled="hasOneOwner && projectUser.access === 4"
                @change="onChangeProjectUser(projectUser)"
                size="small"
                style="width: 160px;float: right;margin-top: 3px;"
                :items="constants.ACCESS_LIST"
                v-model="projectUser.access"
                :clearable="false"
                prop="access"
              />
            </div>
            <div v-else>
              <el-button
                v-if="!hasOneOwner || projectUser.access !== 4"
                style="float: right;margin-left: 15px;margin-top: 6px;"
                size="medium"
                type="danger"
                @click="removeProjectUser(projectUser, true)"
              >
                Leave
                <i class="el-icon-caret-right" />
              </el-button>
              <div
                style="margin-top: 13px;float: right;margin-right: 10px;color: #707070;border: 1px solid #e5e5e5;border-radius: 10px;padding: 2px 7px;"
              >
                {{ formatAccess(projectUser.access) }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        project: {},
        users: [],
        usersFiltered: [],
        projectUsers: [],
        params: {
          userIds: [],
          access: 0,
          expirationDate: undefined
        },
        rules: {
          userIds: [
            {required: true, message: 'Select at least one user'}
          ]
        },
        hasOneOwner: false
      };
    },
    methods: {
      resetFilterUsers(isVisible) {
        if (!isVisible) {
          this.usersFiltered = this.users;
        }
      },
      filterUsers(key) {
        if (!key) {
          this.usersFiltered = this.users;
          return;
        }
        let res = [];
        key = key.toUpperCase();
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          if (user.username.toUpperCase().indexOf(key) !== -1
            || user.fullName.toUpperCase().indexOf(key) !== -1
            || user.email.toUpperCase().indexOf(key) !== -1) {
            res.push(user);
          }
        }
        this.usersFiltered = res;
      },
      onChangeProjectUser(projectUser) {
        if (projectUser.isOwner && projectUser.access !== 4 && this.hasOneOwner) {
          projectUser.access = 4;
          this.init(this.project.groupPath);
          return;
        }
        this.axios.put('projects/' + this.project.id + '/users/' + projectUser.id,
          {access: projectUser.access, expirationDate: projectUser.expirationDate}).then(() => {
          this.init(this.project.namespace, this.project.projectPath);
        }).catch(res => {
          this.error(res.respMsg);
        });
      },
      formatAccess(access) {
        for (let i = 0; i < this.constants.ACCESS_LIST.length; i++) {
          if (access === this.constants.ACCESS_LIST[i].code) {
            return this.constants.ACCESS_LIST[i].name;
          }
        }
      },
      removeProjectUser(projectUser, isLeave) {
        let title = isLeave ? 'Are you sure you want to leave the "' + this.project.projectName + '" project?'
          : 'Are you sure you want to remove ' + projectUser.fullName + ' from the ' + this.project.projectName + ' project and any subresources?';
        this.$confirm(title, 'Confirmation',
          {type: 'warning'}).then(() => {
          this.axios.delete('projects/' + this.project.id + '/users/' + projectUser.id).then(() => {
            this.init(this.project.namespace, this.project.projectPath);
          }).catch(res => {
            this.error(res.respMsg);
          });
        });
      },
      init(namespace, projectPath) {
        this.loading = true;
        this.axios.get('projects/' + namespace + '/' + projectPath + '/users').then(data => {
          this.project = data.project;
          this.users = data.users;
          this.usersFiltered = data.users.concat();

          let ownerCount = 0;
          for (let i = 0; i < data.projectUsers.length; i++) {
            let projectUser = data.projectUsers[i];
            projectUser.expirationDate = this.util.formatTimestamp(projectUser.expirationDate, 'yyyy-MM-dd');
            if (projectUser.access === 4) {
              ownerCount++;
              projectUser.isOwner = 1;
            }
          }
          this.projectUsers = data.projectUsers;
          this.hasOneOwner = ownerCount === 1;
        }).catch(res => {
          if (res.respCo === this.constants.INVALID_DATA) {
            this.$router.push({path: '404'});
          } else {
            this.error(res.respMsg);
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      addToProject() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return;
          }

          this.loading = true;
          this.axios.post('projects/' + this.project.id + '/users', this.params).then(() => {
            this.success('Users were successfully added.');
            this.init(this.project.namespace, this.project.projectPath);
            this.$refs.form.resetFields();
          }).catch(res => {
            this.error(res.respMsg);
          }).finally(() => {
            this.loading = false;
          });
        });
      }
    },
    mounted() {
      this.init(this.$route.params.namespace, this.$route.params.projectPath);
    }
  };
</script>

<style scoped lang="scss">
  .desc {
    color: #6e6e6e;
    font-size: 13px;
    line-height: 22px;
  }

  .members {
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    margin-top: 20px;

    .header {
      color: #2e2e2e;
      background-color: #fafafa;
      border-color: #e5e5e5;
      padding: 6px 16px;
      line-height: 36px;
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