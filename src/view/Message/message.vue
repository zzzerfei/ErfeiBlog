<!--  -->
<template>
  <div class="allpage">
    <h1 class="text-textcolor pb-5 text-center">留言互动</h1>
    <hr class="parting-line" />
    <!-- 友链申请模块 -->
    <div class="applylink">
      <h2 class="text-red">这里是友链区喔</h2>
      <el-form label-width="120px" @submit.native.prevent="applyLinkList">
        <el-form-item label="网站名称">
          <el-input v-model="state.model.name"></el-input>
        </el-form-item>
        <el-form-item label="网站地址">
          <el-input v-model="state.model.url"></el-input>
        </el-form-item>
        <el-form-item label="网站图标">
          <el-input v-model="state.model.icon"></el-input>
        </el-form-item>
        <el-form-item label="网站描述">
          <el-input v-model="state.model.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="applyLinkList">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 友链展示 -->

    <div class="showlink">
      <!-- 每个友链 -->
      <a
        class="link-item"
        v-for="item in state.linkList"
        :key="item.id"
        :href="item.url"
        target="_blank"
      >
        <div class="item-right">
          <div class="name m-2">{{ item.name }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <div class="item-left">
          <img :src="item.icon" alt="" />
        </div>
      </a>
    </div>
    <hr class="parting-line" />
    <!-- 留言模块 -->
    <div class="message">
      <!-- 留言区 -->
      <div class="comment m-5">
        <h2 class="text-red">这里是留言区啦</h2>
        <el-input placeholder="欢迎各位大佬留言" type="textarea" v-model="state.content"></el-input>
        <el-button
          style="margin-top: 15px"
          type="primary"
          :loading="state.btnLoading"
          @click="handleAddMessage"
          >发 送</el-button
        >
        <MessageList
          v-if="!state.isLoading"
          :numbers="state.messagecount"
          :list="state.messagelist"
          @refreshArticle="refreshArticle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import service from '../../network/http'
import url from '../../network/url'
import { ElMessage } from 'element-plus'

import MessageList from '../../components/message/MessageList.vue'

export default {
  components: {
    MessageList
  },
  setup() {
    const state = reactive({
      model: {},
      content: '',
      message: {},
      times: 0,
      messagecount: 0,
      messagelist: {}
    })

    // 网络请求相关方法
    // 友链申请功能
    const applyLinkList = async () => {
      const res = await service.post(url.applyLinkList, {
        params: state.model
      })
      state.model = {}
      ElMessage({
        message: '申请成功，等博主审核喔！',
        type: 'success'
      })
    }
    // 获取友情链接数据
    const getLinkList = async () => {
      const res = await service.get(url.getLinkList)
      // console.log(res);
      // this.linkmodel = res.data;
      state.linkList = res.list
      console.log('state.linkList', state.linkList)
    }

    const handleAddMessage = async () => {
      if (state.times > 5) {
        ElMessage({
          message: '您今天留言的次数已经用完，明天再来吧！',
          type: 'warning'
        })
        return
      }

      let now = new Date()
      let nowTime = now.getTime()
      if (nowTime - state.cacheTime < 4000) {
        ElMessage({
          message: '您留言太过频繁，1 分钟后再来留言吧！',
          type: 'warning'
        })
        return
      }

      if (!state.content) {
        ElMessage({
          message: '请输入内容!',
          type: 'warning'
        })
        return
      }
      let user_id = ''
      if (window.sessionStorage.userInfo) {
        let userInfo = JSON.parse(window.sessionStorage.userInfo)
        user_id = userInfo._id
      } else {
        ElMessage({
          message: '请先登录喔！',
          type: 'warning'
        })
        return
      }

      state.btnLoading = true
      await service.post(url.addMessage, {
        user_id,
        content: state.content
      })
      state.btnLoading = false
      state.times++
      state.cacheTime = nowTime
      state.content = ''
      ElMessage({
        message: '操作成功',
        type: 'success'
      })
      getMessageList()
    }

    // 获取留言数据
    const getMessageList = async () => {
      const res = await service.get(url.getMessageList)
      console.log(res)
      state.messagelist = res.list
      state.messagecount = res.count
      console.log(state.messagelist)
    }

    onMounted(() => {
      getLinkList()
      getMessageList()
    })

    return {
      state,
      applyLinkList,
      getLinkList,
      handleAddMessage,
      getMessageList
    }
  }
}
</script>

<style lang="scss"  scoped>
.applylink {
  width: 70%;
  margin: 0 auto;
}

.showlink {
  width: 100%;
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;

  .link-item {
    margin-top: 10px;
    text-align: center;
    margin-left: 3%;
    background-color: white;
    overflow: hidden;
    position: relative;
    // transition: all 0.3s linear 0s;
    // cursor: pointer;
    height: 90px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 30%;
    padding: 10px;
    border: 1px solid rgba(225, 225, 225, 0.83);
    border-radius: 4px;
    .item-right {
      z-index: 2;
      flex: 1 1 0%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        padding-bottom: 10px;
        color: rgba(218, 138, 118, 0.8);
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .item-left {
      & > img {
        // transition: all 0.3s linear 0s;
        z-index: 2;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px dashed rgba(204, 204, 204, 0.63);
      }
    }
  }
}

.message {
  width: 80%;
  margin: 0 auto;
}
</style>
