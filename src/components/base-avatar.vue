<template>
  <img
    :style="{height: size + 'px', width: size + 'px'}"
    v-if="avatar"
    :src="axios.defaults.baseURL + avatar"
  >
  <img
    :style="{height: size + 'px', width: size + 'px'}"
    v-else
    :src="defaultAvatar"
  >
</template>

<script>
  import md5Hex from 'md5-hex';

  export default {
    props: {
      avatar: {
        required: false,
        type: String,
        default: ''
      },
      size: {
        required: false,
        type: Number,
        default: 128
      },
      emptyAvatar: {
        required: false,
        type: String,
        default: ''
      },
      type: {
        required: false,
        type: String,
        default: 'identicon'
      }
    },
    computed: {
      defaultAvatar() {
        return 'https://www.gravatar.com/avatar/' + md5Hex(this.emptyAvatar) + '.jpg?d=' + this.type;
      }
    }
  };
</script>


<style scoped lang="scss">
  img {
    border-radius: 50%;
    border: 1px solid #e5e5e5;
  }
</style>