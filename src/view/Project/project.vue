<template>
  <div class="allpage project m-5">
    <h1 class="text-textcolor pb-5 text-center">这里是实战项目</h1>
    <hr class="parting-line" />
    <div class="projects">
      <div
        class="project-item "
        :span="state.isMobileOrPc ? 24 : 12"
        v-for="(item, index) in state.list"
        :key="index"
      >
        <h2 class="text-red">{{ item.title }}</h2>
        <a :href="item.url" target="_blank">
          <div class="project-img bdr">
            <img src="../../assets/img/home/topimg.jpg" aslt="" />
          </div>
          <div class="project-content">
            {{ item.content }}
          </div>
          <div class="project-time">
            <span> {{ formatTime(item.start_time) }} → </span>
            <span>
              {{ formatTime(item.end_time) }}
            </span>
          </div>
        </a>
      </div>
    </div>
    <!-- 项目列表 -->

    <!-- <LoadingCustom v-if="state.isLoading"></LoadingCustom> -->
    <!-- <LoadEnd v-if="state.isLoadEnd"></LoadEnd> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import service from '../../network/http'
import urls from '../../network/url'
// import LoadEnd from "../components/LoadEnd.vue";
// import LoadingCustom from "../../components/Loading.vue";
import {
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  timestampToTime,
  isMobileOrPc
} from '../../utils/utils'
import { Params, ProjectList, ProjectsData } from '../../types/index'

export default defineComponent({
  name: 'Project',
  components: {
    // LoadEnd,
    // LoadingCustom,
  },
  setup() {
    const state = reactive({
      reverse: true,
      isLoadEnd: false,
      isLoading: false,
      isMobileOrPc: isMobileOrPc(),
      list: [] as ProjectList[],
      total: 0,
      params: {
        keyword: '',
        pageNum: 1,
        pageSize: 10
      } as Params
    })

    const formatTime = (value: string | Date): string => {
      return timestampToTime(value, true)
    }

    const getProjectList = async (): Promise<void> => {
      state.isLoading = true
      const data: ProjectsData = await service.get(urls.getProjectList, {
        params: state.params
      })
      state.isLoading = false

      state.list = [...state.list, ...data.list]
      state.total = data.count
      state.params.pageNum++
      if (state.total === state.list.length) {
        state.isLoadEnd = true
      }
      console.log(data)
    }

    onMounted(() => {
      getProjectList()
      window.onscroll = () => {
        if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
          // 如果不是已经没有数据了，都可以继续滚动加载
          if (state.isLoadEnd === false && state.isLoading === false) {
            getProjectList()
          }
        }
      }
    })

    return {
      state,
      formatTime,
      getProjectList
    }
  }
})
</script>
<style lang="less" scoped>
.project-item {
  padding: 5px ;
  width: 100%;
  // margin: 0 3px;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 4px 10px #ccc;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .project-img {
    widows: 100%;
    max-height: 250px;
    overflow: hidden;
    // border-radius: 10px;
    img {
      width: 100%;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .project-content {
    margin: 10px;
    font-size: 17px;
  }
}
</style>

