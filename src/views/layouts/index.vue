<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        // {
        //   title: '首页',
        //   to: {
        //     name: 'Home'
        //   },
        //   icon: 'home-o'
        // },
        // {
        //   title: '关于我',
        //   to: {
        //     name: 'About'
        //   },
        //   icon: 'user-o'
        // },
        // {
        //   title: '登录',
        //   to: {
        //     name: 'Login'
        //   },
        //   icon: 'user-o'
        // }
      ]
    }
  },
  components: {
    TabBar
  },
  mounted() {
    this.parseTabbarsList()
  },
  methods: {
    // 处理数据格式
    parseTabbarsList() {
      this.tabbars = this.$store.getters.tabbarList.map(r => {
        return {
          title: r.meta.title || '',
          to: {
            name: r.name || ''
          },
          icon: r.meta.icon || ''
        }
      })
    },
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
