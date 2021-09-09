<template>
  <div class="home">
    <!-- 头部 -->
    <div class="top">
      <span class="top-total text-textcolor">
        博客日志<span class="text-red"> {{ state.total }} </span>篇
      </span>
      <!-- 搜索框 -->
      <search-bar />
    </div>
    <!-- 博客列表 -->
    <div class="bloglist" v-loading="state.isLoading" element-loading-text="我有在拼命加载啦！！">
      <div
        class="blogs"
        v-for="(item, index) in state.blogList"
        :key="index"
        @click="GoDetail(item._id)"
      >
        <div class="blog hand">
          <h2>{{ item.title || '加载中~~~' }}</h2>
          <!-- 博客信息栏 -->
          <div class="blog-info">
            <!-- 时间 -->
            <div class="blog-date">
              {{ formatTime(item.create_time) || '加载中···' }}
            </div>
            <!-- 点击次数 -->
            <div class="content"> <i class="el-icon-view"></i>{{ item.meta.views }}次 </div>
            <!-- 点赞 -->
            <div class="content"> <i class="el-icon-star-off"></i>{{ item.meta.likes }} </div>
            <!-- 评论 -->
            <div class="content">
              <i class="el-icon-chat-line-round"></i>{{ item.meta.comments }}
            </div>
          </div>
          <!-- 图片 -->
          <div class="blog-img bdr">
            <img :src="item.img_url" alt="" />
            <!-- <img :src="item.img_url" alt="" /> -->
          </div>

          <div class="blog-desc">
            {{ item.desc || '加载中···' }}
          </div>
          <!-- 标签 -->
          <!-- <div class="blog-tag">
              {{ '加载中···' }}
            </div> -->
        </div>
      </div>
      <!-- 分页 -->
      <Pagination class="pagination" @changePage="changePage" :total="state.total" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity'
// 网络相关
import service from '../../network/http'
import urls from '../../network/url'
import Pagination from '../../components/pagination/pagination.vue'
import searchBar from '../../components/searchBar/searchBar.vue'

//
import { ArticlesParams, ArticlesData } from '../../types/index'
import { stat } from 'fs'

// 要关注一下
import {
  throttle,
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  getQueryStringByName,
  timestampToTime
} from '../../utils/utils'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'home',
  components: {
    Pagination,
    searchBar
  },
  watch: {
    $route: {
      handler(val: any, oldVal: any) {
        this.routeChange(val, oldVal)
      },
      immediate: true
    }
  },
  setup() {
    const state = reactive({
      blogList: [], // 博客列表
      tagList: [], // 标签列表
      recentblogmodel: [], // 最近文章
      linkmodel: [], // 友情链接
      // tag: this.$route.query.tag || '', // 标签
      total: 0, // 文章总数
      isLoading: false, // 是否加载
      tag_name: decodeURI(getQueryStringByName("tag_name")),
      params: {
        keyword: '',
        likes: '', // 是否是热门文章
        state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
        tag_id: getQueryStringByName('tag_id'),
        category_id: getQueryStringByName('category_id'),
        pageNum: 1,
        pageSize: 5
      } as ArticlesParams
    })

    // 自定义方法
    // 分页
    const changePage = (num) => {
      console.log('我拿到页码啦', num)
      state.params.pageNum = num
      state.blogList = []
      console.log('state', state)
      getBlogslist()
    }
    // 时间格式
    const formatTime = (value: string | Date): string => {
      return timestampToTime(value, true)
    }

    // 网路请求相关方法
    // 获取博客列表
    const getBlogslist = async (): Promise<void> => {
      state.isLoading = true
      console.log(state.params)
      const res: ArticlesData = await service.get(urls.getArticleList, {
        params: state.params
      })
      console.log('data', res)
      state.blogList = res.list
      state.total = res.count
      state.isLoading = false
    }

    // 路径发生变化时加载页面
    const routeChange = (val: any, oldVal: any): void => {
      state.tag_name = decodeURI(getQueryStringByName('tag_name'))
      state.params.tag_id = getQueryStringByName('tag_id')
      state.params.category_id = getQueryStringByName('category_id')
      state.blogList = []
      state.params.pageNum = 1
      getBlogslist()
    }

    // 生命周期
    onMounted(() => {
      getBlogslist()
    })
    return {
      state,
      // getBlogslist
      changePage,
      formatTime,
      getBlogslist,
      routeChange
    }
  },

  methods: {
    // 自定义相关方法

    // 跳转到博客详情
    GoDetail(id) {
      this.$router.push(`blogDetail?blog_id=${id}`)
    },
    // 点击标签查找博客
    // tagtoblog(id) {
    //   // console.log("blog拿到id", id);
    //   this.$router.push(`/blog/?tag=${id}`)
    //   this.tag = id
    //   this.pageNum = 1
    //   this.getBlogslist()
    //   this.blogList = []
    // },

    // 网络请求相关方法
    // 获取博客列表
    // async getBlogslist() {
    //   this.loading = true
    //   // console.log("根据传进来的id获取博客列表", this.tag);
    //   let res = await this.$http.post(`/blog/${this.pageNum}/${this.pageSize}`, { tags: this.tag })
    //   console.log(res)
    //   this.blogList = this.blogList.concat(res.data.rows)
    //   // console.log(test.toString());
    //   console.log('点击标签是否有数据', this.blogList)
    //   this.total = res.data.total
    //   // console.log(this.total);
    //   this.loading = false
    // },

    // 拿到页码 跳转刷新博客列表数据
    async goToPage(pageNum) {
      this.pagination.currentPage = pageNum
      this.fetchData()
    }
  },
  mounted() {
    // bus总线是新的实例 this指向的不是vue实例 要保存this的指向
    // const that = this
    // this.$bus.$on('tagID', function (id) {
    //   that.blogList = []
    //   that.tagtoblog(id)
    // })
    // this.getBlogslist()
  }
}
</script>

<style  scoped lang="less">
.home {
  border: 1px solid rgb(242, 235, 235);
  transition: all 0.3s linear;
  width: 57%;
  min-height: 700px;
  position: relative;
  /* top: 20px; */
}
// 头部
.top {
  padding: 10px;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}
.top-total {
  text-align: center;
  margin-top: 8px;
  font-weight: 600;
}
/* 博客卡片样式 */
.blog {
  min-height: 250px;
  font-size: 13px;
  overflow: hidden;
  // opacity: 0;
  position: relative;
  padding: 10px 4px;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px #ccc;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .blog-info {
    width: 50%;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-around;
  }

  .blog-img {
    width: 100%;
    height: 250px;
    overflow: hidden;
    img {
      transition: all 0.5s;
      width: 100%;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .blog-desc {
    margin-top: 10px;
    color: rgb(119, 119, 119);
    font-variant: tabular-nums;
    font-size: 14px;
  }
  .blog-tag {
    margin-top: 10px;
  }
}
// 分页
.pagination {
  margin: 0 auto;
  text-align: center;
}

@media not screen and (min-width: 65em) {
  .bloglist {
    overflow: hidden;
    position: relative;
    transition: all 0.3s linear;
    width: 80%;
  }
  .rightbar {
    display: none;
  }
}

@media not screen and (min-width: 45em) {
  .home {
    width: 100%;
    margin: 70px 0;
  }
  .bloglist {
    overflow: hidden;
    margin-top: 5%;
    position: relative;
    transition: all 0.3s linear;
    width: 100%;
  }

  .blog {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .blogs {
    padding: 0;
    cursor: pointer;
    margin-bottom: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    width: 100px;
    height: 330px;
    background-color: white;
    display: flex;
    align-items: center;
    min-width: 100%;
  }
  .blog img {
    width: 100%;
    height: 230px;
    padding: 5px;
  }
  .blog-right {
    width: 100%;
    margin-left: 0px;
    text-align: center;
  }
  .blog-right .blog-footer {
    font-size: 12px;
    color: #999;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .blog-tag {
    width: 100%;
  }
  .title {
    text-align: center;
  }
  hr {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}

@media not screen and (min-width: 40em) {
  .bloglist {
    overflow: hidden;
    position: relative;
    transition: all 0.3s linear;
    width: 100%;
  }
}
</style>
