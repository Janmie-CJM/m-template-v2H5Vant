<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <van-button @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    // 退出登录
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
  }
}
</style>
