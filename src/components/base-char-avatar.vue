<template>
  <div :style="{width: size + 'px', height: size + 'px', lineHeight: size + 'px', fontSize: (Math.max(size-14, 12)) + 'px', background: getRandomColor()}">
    {{ char }}
  </div>
</template>

<script>
  export default {
    props: {
      char: {
        required: true,
        type: String
      },
      size: {
        required: false,
        type: Number,
        default: 70
      }
    },
    methods: {
      /**
       * 浅色背景
       *
       * @returns {string}
       */
      getRandomColor() {
        let color = '#';
        for (let i = 0; i < 3; i++) {
          color += (Math.random() > 0.5 ? 'E' : 'F') + (Math.floor(Math.random() * 7));
        }

        return color;
      }
    }
  };
</script>


<style scoped lang="scss">
  div {
    text-align: center;
    border-radius: 100%;
    display: inline-block;
    color: #555;
  }
</style>