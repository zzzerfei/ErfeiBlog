<template>
  <header class="head nav ai-center" :class="isScrolling ? `mini` : ''">
    <!-- 博客logo -->
    <div class="h-logo hand">
      <router-link tag="div" to="/">
        <img src="../../assets/img/logo/logo.png" height="42" class="logo" />
      </router-link>
    </div>
    <!-- 头部导航栏 -->
    <div class="d-flex text-white hand ai-center">
      <!-- 循环导航栏名 -->
      <router-link
        tag="div"
        v-for="item in state.items"
        :to="item.path"
        :key="item.index"
        active-class="active"
        class="nav-item px-5 text-white"
      >
        <!-- <span class="iconfont" :class="item.icon"></span> -->
        {{ item.name }}
      </router-link>

      <!-- 移动端导航 下拉菜单-->
      <el-dropdown placement="bottom-end">
        <div class="menu-button" @click="state.isShowMenu = !state.isShowMenu">
          <i class="el-icon-more-outline text-white"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link tag="div" to="/home">博客首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link tag="div" to="/archive">博客归档</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link tag="div" to="/message">欢迎留言</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link tag="div" to="/about">关于本站</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 登陆注册模块 -->
    <div class="regandlog">
      <div v-if="userInfo._id" class="userInfo" >
        <img class="user-img" src="../../assets/img/logo/icon.jpg" alt="erfei" />
        <el-dropdown trigger="click" class="hand" @command="handleLogout">
          <span class="el-dropdown-link">
            {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- <img
              v-if="!userInfo.avatar"
              class="user-img"
              src="../assets/img/logo/icon.jpg"
              alt="BiaoChenXuYing"
            /> -->

        <!-- <img
              v-if="userInfo.avatar"
              class="user-img"
              :src="userInfo.avatar"
              alt="BiaoChenXuYing"
            /> -->
      </div>
      <div v-else>
        <el-button size="small" type="primary" @click="handleClick('login')">登录</el-button>
        <el-button size="small" type="danger" @click="handleClick('register')">注册</el-button>
      </div>
    </div>
    </div>

    <!-- 传送的数据为判断登录注册，是否显示弹出框 -->
    <RegisterAndLogin
 
      :visible="state.visible"
      :handleFlag="state.handleFlag"
      @ok="handleOk"
      @cancel="handleCancel"
    ></RegisterAndLogin>
  </header>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive } from 'vue'
import { UserInfo, NavListItem } from '../../types/index'
import { isMobileOrPc } from '../../utils/utils'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";
import { key } from "../../store";

import RegisterAndLogin from '../RegisterAndLogin/RegisterAndLogin.vue'

export default {
  components: {
    RegisterAndLogin
  },

  computed: {
    userInfo(): UserInfo {
      let userInfo: UserInfo = {
        _id: '',
        name: '',
        avatar: ''
      }
      if (window.sessionStorage.userInfo) {
        console.log(window.sessionStorage.userInfo)
        userInfo = JSON.parse(window.sessionStorage.userInfo)
        console.log('userInfo', userInfo)
        ;(this as any).$store.commit('SAVE_USER', {
          userInfo
        })
      }
      if ((this as any).$store.state.user.userInfo) {
        userInfo = (this as any).$store.state.user.userInfo
      }
      console.log('return userInfo', userInfo)
      return userInfo
    }
  },

  // watch: {
  //   $route: {
  //     handler(val: any, oldVal: any) {
  //       this.routeChange(val, oldVal)
  //     },
  //     immediate: true
  //   }
  // },
  setup() {
    const store = useStore(key);
    // const router = useRouter()
    const state = reactive({
      isScrolling: false,
      items: [
        { index: '1', name: '博客首页', path: '/blog' },
        { index: '2', name: '项目实战', path: '/project' },
        { index: '3', name: '留言互动', path: '/message' },
        { index: '4', name: '个人历程', path: '/course' },
        { index: '5', name: '关于博客', path: '/about' }
        // { index: '6', name: '归档', path: '/archive' },
      ] as Array<NavListItem>,

      isMobile: isMobileOrPc(), // 判断PC端还是移动端
      isShowMenu: false, // 移动端显示折叠按钮
      visible: false,
      handleFlag: '',
      isShow: false
    })
    // 判断导航缩放
    // const ajustNavigation = () => {
    //   let scrollTop =
    //     window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    //   state.isScrolling = scrollTop > 0
    // }

    // 登录注册模块
    const handleOk = (value: boolean): void => {
      console.log('handleOk', value)
      state.visible = value
    }
    const handleCancel = (value: boolean): void => {
      state.visible = value
    }
    const handleClick = (value: string): void => {
      state.handleFlag = value
      state.visible = true
      console.log(state.handleFlag)
      console.log(state.visible)
    }
    const handleClickMenu = (route?: string) => {
      state.isShow = false
      if (route === '/login') {
        state.handleFlag = 'login'
        state.visible = true
      }
      if (route === '/register') {
        state.handleFlag = 'register'
        state.visible = true
      }
      // if (route === "/logout") {
      //   handleLogout();
      // }
    }

    // 退出登录
    const handleLogout = () => {
      window.sessionStorage.userInfo = ''
      store.commit("SAVE_USER", {
        userInfo: {
          _id: "",
          name: "",
          avatar: "",
        },
      })
    }

    return {
      state,
      // ajustNavigation
      handleOk,
      handleCancel,
      handleClick,
      handleClickMenu,
      handleLogout
    }
  }

  // mounted() {
  //   this.ajustNavigation()
  //   window.addEventListener('scroll', this.ajustNavigation)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.ajustNavigation)
  // }
}
</script>

<style lang="scss" scoped>
.nav-item.active {
  color: #6fa3ef;
}

.nav-item:hover {
  color: #6fa3ef;
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  // display: relative;
  height: 55px;
  background-color: #393d49;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  // transition: 0.5s ease-in-out;
  display: flex;
  justify-content: space-around;
}

.mini {
  background-color: #393d49;
  height: 45px;
  transition: 0.5s ease-in-out;
}

// 下拉框按钮
.menu-button {
  display: none;
}
@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
  .menu-button {
    display: block;
    margin-left: 120px;
    font-size: 30px;
  }
}

// 用户模块
.regandlog {
  .userInfo {
    & > img {
      width: 50px;
      border-radius: 50%;
    }
  }
}
</style>
