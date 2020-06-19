<template>
  <el-row v-loading="loading">
    <el-form
      :model="params"
      :rules="rules"
      ref="form"
    >
      <el-form-item prop="userIds">
        <div>
          Add new member to <strong>{{ group.groupName }}</strong>
        </div>
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
            On this date, the member(s) will automatically lose access to this group and all of its projects.
          </div>
        </el-form-item>
      </div>

      <el-form-item style="margin-left: 30px;float: left">
        <el-button
          type="success"
          @click="addToGroup"
        >
          Add to group
        </el-button>
      </el-form-item>
    </el-form>

    <base-hr style="clear: both" />

    <div>
      <strong>Existing members</strong>
    </div>

    <el-form class="members">
      <div class="header">
        Members with access to {{ group.groupName }}
        <a class="badge">
          {{ groupUsers.length }}
        </a>
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
              <div>Joined at {{ util.formatTimestamp(groupUser.createdTime, 'yyyy-MM-dd') }}</div>
            </div>
            <div v-if="$store.getters.getUser.id !== groupUser.userId">
              <el-button
                style="float: right;margin-left: 15px;margin-top: 6px;"
                size="medium"
                type="danger"
                @click="removeGroupUser(groupUser)"
              >
                <i class="el-icon-delete-solid" />
              </el-button>
              <el-date-picker
                size="medium"
                value-format="yyyy-MM-dd"
                style="float: right;margin-top: 6px;margin-left: 10px;width: 160px;"
                v-model="groupUser.expirationDate"
                type="date"
                placeholder="Expiration date"
                @change="onChangeGroupUser(groupUser)"
              />
              <base-select
                @change="onChangeGroupUser(groupUser)"
                size="small"
                style="width: 160px;float: right;margin-top: 3px;"
                :items="constants.ACCESS_LIST"
                v-model="groupUser.access"
                :clearable="false"
                prop="access"
              />
            </div>
            <div v-else>
              <el-button
                v-if="!hasOneOwner"
                style="float: right;margin-left: 15px;margin-top: 6px;"
                size="medium"
                type="danger"
                @click="removeGroupUser(groupUser, true)"
              >
                Leave
                <i class="el-icon-caret-right" />
              </el-button>
              <div
                style="margin-top: 13px;float: right;margin-right: 10px;color: #707070;border: 1px solid #e5e5e5;border-radius: 10px;padding: 2px 7px;"
              >
                {{ formatAccess(groupUser.access) }}
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
        group: {},
        users: [],
        groupUsers: [],
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
      onChangeGroupUser(groupUser) {
        console.log(groupUser);
        if (groupUser.isOwner && groupUser.access !== 4 && this.hasOneOwner) {
          groupUser.access = 4;
          return;
        }
        this.axios.put('groups/' + this.group.id + '/members/' + groupUser.id,
          {access: groupUser.access, expirationDate: groupUser.expirationDate}).catch(res => {
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
      removeGroupUser(groupUser, isLeave) {
        let title = isLeave ? 'Are you sure you want to leave the "' + groupUser.fullName + '" group?'
          : 'Are you sure you want to remove ' + groupUser.fullName + ' from the ' + this.group.groupName + ' group and any subresources?';
        this.$confirm(title, 'Confirmation',
          {type: 'warning'}).then(() => {
          this.axios.delete('groups/' + this.group.id + '/members/' + groupUser.id).then(() => {
            this.init(this.group.groupPath);
          }).catch(res => {
            this.error(res.respMsg);
          });
        });
      },
      init(groupPath) {
        this.loading = true;
        this.axios.get('groups/' + groupPath + '/members').then(data => {
          this.group = data.group;
          this.users = data.users;

          let ownerCount = 0;
          for (let i = 0; i < data.groupUsers.length; i++) {
            let groupUser = data.groupUsers[i];
            groupUser.expirationDate = this.util.formatTimestamp(groupUser.expirationDate, 'yyyy-MM-dd');
            if (groupUser.access === 4) {
              ownerCount++;
              groupUser.isOwner = 1;
            }
          }
          this.groupUsers = data.groupUsers;
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
      addToGroup() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return;
          }

          this.loading = true;
          this.axios.post('admin/groups/' + this.group.id + '/users', this.params).then(() => {
            this.success('Users were successfully added.');
            this.init(this.group.groupPath);
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
      this.init(this.$route.params.path);
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