<template>
  <div class="right-bar">
    <!-- 关于我 -->
    <div class="aboutme">
      <!-- 上面 -->
      <div class="aboutme-top" @click="goAbout">
        <img src="../../assets/img/myinfo/avator.jpg" alt="" title="二肥是我" />
        <div class="my-info">
          <h1>二肥</h1>
          <div>广东 - 广州</div>
        </div>
        <div class="school-info text-blue">
          <div>广东技术师范大学</div>
          <div>物联网工程</div>
          <div>2018-2022 学生</div>
        </div>

        <div class="blog-info">
          <div>前端：Vue3+TypeScript+Vite</div>
          <div>后台：Vue+Element</div>
          <div>后端：Node+Express+Mongodb</div>
        </div>

        <h3 class="text-red">喜欢您来!</h3>
      </div>
      <!--下面-->
      <div class="aboutme-foot">
        <el-tooltip class="item hand" placement="top">
          <template #content>
            <img src="../../assets/img/myinfo/wx.jpg" alt="" style="width: 100px; height: 100px" />
          </template>
          <img src="../../assets/img/myinfo/wechat.png" alt="" width="100%" />
        </el-tooltip>
        <el-tooltip class="item hand" placement="top">
          <template #content>
            <img src="../../assets/img/myinfo/qq.jpg" alt="" style="width: 100px; height: 100px" />
          </template>
          <img src="../../assets/img/myinfo/qq.png" alt="" width="100%" />
        </el-tooltip>
        <a target="_blank" href="https://github.com/zzzerfei">
          <img class="item" src="../../assets/img/myinfo/github.png" alt="访问github" />
        </a>
      </div>
    </div>

    <!-- 标签云 -->
    <div class="cloud">
      <div class="cloud-title"> 标签云 </div>
      <div class="cloud_wrap">
        <el-tag
          class="all mt-2 ml-2 type_count cloud_item"
          v-for="cloud in state.tagcloud"
          :key="cloud._id"
          :type="cloud.color"
          :class="{ active: tag == cloud._id || tagIndex == index }"
          @click="searchBlogs(cloud._id, cloud.name)"
          >{{ cloud.name }}</el-tag
        >
      </div>
    </div>
    <!-- 热门文章 -->
    <!-- <div class="hot">
            <div class="link-title" style="font-weight: 600; color: #777777"> 这里是热门文章 </div>
      <div class="item" v-for="(item,index) in list" :key="index" @click="GoDetail(item.id)">
        <img v-lazy="item.url" alt="">
        <div class="right">
          <div style="height: 40%;"><span class="title" style="overflow: hidden"># {{item.title}}</span></div>
          <div class="right_wrap">
            <span class="time"><i class="el-icon-watch"></i>{{item.date.substring(0,10)||'0-0-0'}}</span>
            <span class="view"><i class="el-icon-view"></i>{{item.viewcount}}</span>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 友情链接 -->
    <!-- <div class="link">
      <div class="link-title"> 这里是友情链接 </div>
      <div class="link-wrap" v-for="(item, index) in state.linkList" :key="index">
        <a :href="item.url" target="_blank" class="link-name">{{ item.name }}</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
// import { Params, TagsData } from "../types/index";
import service from '../../network/http'
import urls from '../../network/url'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
  name: 'RightBar',

  setup() {
    const state = reactive({
      blog: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      },
      color: ['', 'success', 'info', 'danger', 'warning'],
      tagcloud: [],
      recentblogmodel: [],
      linkList: [],
      tagIndex: -1
    })
    const router = useRouter()

    // 点击标签加载博客列表
    const searchBlogs = (id, name) => {
      // this.tagIndex = i
      // this.$bus.$emit('tagID', id)
      router.push(`blog?tag_id=${id}&tag_name=${name}`)
    }

    // 获取标签数据
    const getTagList = async () => {
      const res = await service.get(urls.getTagList)
      state.tagcloud = res.list
      state.tagcloud.forEach((el, e) => {
        el.color = state.color[Math.floor(e % 5)]
      })
    }
    // 获取最近文章列表
    // async fetchrecentblog() {
    //   const res = await this.$http.get("/blog/recent");
    //   console.log(res.data);
    //   this.recentblogmodel = res.data;
    // },
    // 获取友情链接数据
    // const getLinkList = async () => {
    //   const res = await service.get(urls.getLinkList)
    //   // console.log(res);
    //   // this.linkmodel = res.data;
    //   state.linkList = res.list
    //   // console.log(state.linkList);
    // }

    onMounted(() => {
      getTagList()
      // getLinkList()
    })

    return {
      state,
      searchBlogs,
      getTagList
      // getLinkList
    }
  }

  // props: {
  //   tag: {
  //     type: String,
  //     default: "",
  //   },
  // },

  // mounted() {
  //   // this.$bus.$on('loadOver', () => {
  //   //   this.LoadCloud()
  //   //   this.LoadList()

  //   // })

  //   this.fetchtag();
  //   // this.fetchrecentblog();
  //   this.fetchlink();
  // }
  // computed: mapState({
  //   ColorList: state => state.ColorList,

  // }),
}
</script>

<style scoped lang="less">
.right-bar {
  position: absolute;
  right: 13%;
  /* top: 120px; */
  min-width: 100px;
  width: 16%;
  border: 1px solid rgb(242, 235, 235);
}
.school-info,
.blog-info {
  margin-top: 5px;
  font-size: 13px;
}
/* 抽离统一的样式 */
// .aboutme,
// .cloud,
// .link {
//   // box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
// }
.cloud-title,
.link-title {
  font-size: 17px;
  color: rgb(45, 183, 245);
  padding-bottom: 10px;
}
/* 关于我 */
.aboutme {
  border-radius: 5px;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
  /* background: #fff; */

  text-align: center;
}
.aboutme-top {
  display: inline-block;
  margin: 20px auto;
}
.aboutme-top img {
  // height: 130px;
  // width: 130px;
  // /* max-width: 70%; */
  // border-radius: 50%;
  // cursor: pointer;
  // transition: all 0.5s;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  animation: mylogo 3s;
  -moz-animation: mylogo 3s; /* Firefox */
  -webkit-animation: mylogo 3s; /* Safari and Chrome */
  -o-animation: mylogo 3s; /* Opera */
  animation-iteration-count: infinite;
}
.aboutme-top .myname {
  z-index: 100;
  font-size: 32px;
  font-weight: bold;
  /* margin-left: 20px; */
  color: #4d4d4d;
}
.aboutme-top .myname:hover {
  color: #409eff;
  transition: all 0.5s linear;
  cursor: pointer;
}
.aboutme-top img:hover {
  /*转动*/
  transform: rotate(360deg);
  animation: rotation linear;
}
.aboutme-foot {
  height: 50px;
  // background-image: linear-gradient(-225deg, #e1fded 0%, rgba(255, 241, 250, 0.71) 100%);
  display: flex;
  justify-content: space-around;
}
.aboutme-foot > div > img {
  width: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.item {
  width: 40px;
  height: 40px;
}

/* 标签云 */
.cloud {
  /* background-color: #fff; */
  margin-top: 13px;
  /* border-radius: 4px; */
  padding: 15px;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
}
.cloud_wrap {
  display: flex;
  flex-wrap: wrap;
}
.cloud_item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-top: 10px;
}
.type_count {
  overflow: hidden;
  cursor: pointer;
  position: relative;
  outline: none;
  font-size: 13px;
  letter-spacing: 1px;
  transition: 0.5s;
  border-radius: 20px;
}
.type_count:hover {
  border-radius: 0px;
}
.type_count::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  /*background-color: #da4939;*/
  background: linear-gradient(90deg, transparent, #fff, transparent);
  transition: 0.5s;
}
.type_count:hover::before {
  left: 100%;
}

/* 友情链接 */
.link {
  /* background-color: #fff; */
  margin-top: 13px;
  /* border-radius: 4px; */
  padding: 15px;
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.link-wrap {
  display: flex;
  flex-wrap: wrap;
}
.link-name {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-top: 10px;
}

@-webkit-keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media not screen and (min-width: 65em) {
  .right-bar {
    display: none;
  }
}

@keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-moz-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-webkit-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-o-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}
</style>