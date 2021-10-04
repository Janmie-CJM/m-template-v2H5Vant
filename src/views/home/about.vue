<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      <div class="list">
        <p>list</p>
list
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;

    }
  }
}
</style>
