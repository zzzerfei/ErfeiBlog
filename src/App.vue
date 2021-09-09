<template>
  <div>
    <!-- <div v-show="!(state.path === '/')"> -->
    <nav-bar />
    <right-bar v-if="state.isShowSlider" />
    <!-- </div> -->
    <div class="mains">
      <transition :name="transitionName">
        <router-view class="router-view"></router-view>
      </transition>
    </div>
    <bottom />
  </div>
</template>

<script lang= "ts">
import NavBar from './components/navbar/navbar.vue'
import RightBar from './components/rightbar/rightbar.vue'
import Bottom from './components/bottom/bottom.vue'
import './assets/scss/style.scss'
import { reactive } from '@vue/reactivity'
import { stat } from 'fs'
import { onMounted } from '@vue/runtime-core'

import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'App',
  components: {
    NavBar,
    RightBar,
    Bottom
  },
  watch: {
    $route: function (val: any, oldVal: any) {
      this.routeChange(val, oldVal)
    }
  },
  setup() {
    const state = reactive({
      isShowNav: false,
      isShowSlider: false
    })

    const route = useRoute()
    const routeChange = (val: any, oldVal: any): void => {
      const navs = ['/blog', '/project', '/message', '/course', '/about']
      if (navs.includes(val.path)) {
        state.isShowSlider = true
      } else {
        state.isShowSlider = false
      }
    }
    onMounted(() => {
      routeChange(route, route)
    })

    return {
      state,
      routeChange
    }
  }
}
</script>

<style scoped>
.mains {
  /*高度不应该写死或者计算*/
  min-height: calc(100vh - 40px);
}
.router-view {
  margin-top: 70px;
  margin-left: 13%;
}
</style>