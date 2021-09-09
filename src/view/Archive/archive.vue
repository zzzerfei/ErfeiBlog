<template>
  <div class="archive allpage bdr bg-white">
    <h1 class="text-textcolor pb-5 text-center">这里是博客归档</h1>
    <hr class="parting-line" />
    <el-timeline>
      <el-timeline-item
        v-for="l in state.articlesList"
        :key="l.year"
        placement="top"
        hide-timestamp
      >
        <h1 class="year">{{l.year}}</h1>

        <el-timeline-item
          v-for="item in l.list"
          :key="item._id"
          :color="item.state === 1 ? 'green' : item.state === 3 ? 'red' : ''"
          placement="top"
          hide-timestamp
        >
          <router-link
            :to="`/articleDetail?article_id=${item._id}`"
          >
            <h3 class="title">{{item.title}}</h3>
          </router-link>
          <p>{{formatTime(item.create_time)}}</p>
        </el-timeline-item>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { timestampToTime } from '../../utils/utils'
import { ParamsArchive, ArchiveData } from '../../types/index'
import service from '../../network/http'
import urls from '../../network/url'

export default defineComponent({
  name: 'Archive',
  setup() {
    const state = reactive({
      isLoadEnd: false,
      isLoading: false,
      articlesList: [] as Array<any>,
      total: 0,
      params: {
        keyword: '',
        likes: '', // 是否是热门文章
        state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
        article: 1,
        tag_id: '',
        category_id: '',
        pageNum: 1,
        pageSize: 10
      } as ParamsArchive
    })

    const formatTime = (value: string | Date): string => {
      return timestampToTime(value, true)
    }

    const getArchiveList = async (): Promise<void> => {
      state.isLoading = true
      const res: ArchiveData = await service.get(urls.getArticleList, {
        params: state.params
      })
      console.log('res', res)
      state.isLoading = false
      state.articlesList = [...state.articlesList, ...res.list]
      state.total = res.count
      state.params.pageNum++
      if (state.total === state.articlesList.length) {
        state.isLoadEnd = true
      }
    }

    onMounted(() => {
      getArchiveList()
    })

    return {
      state,
      formatTime,
      getArchiveList
    }
  }
})
</script>



<style lang="scss" scoped>
.archive-item {
  margin-top: 10px;
  // background-color: #fff;
  width: 80%;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 10px;
  // display: flex;
  // justify-content: center;
}

.pagination {
  margin: 50px;
}

@media not screen and (min-width: 45em) {
  .block {
    width: 100%;
    padding: 0;
  }
  .blog-footer {
    margin-top: 10px;
    width: 80%;
  }
  .archive-list {
    margin-left: -10%;
  }
}
</style>
