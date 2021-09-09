<template>
  <div class="bottom bg-navcolor text-blue">
    <span>喜欢您来！</span>
    <div>
      <span> 本博客已运行{{ state.runtime }} </span>
    </div>
    <div>二肥 个人博客</div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
export default {
  name: 'bottom',
  setup() {
    const state = reactive({
      runtime: Object.freeze('')
    })
    // 运行天数计算
    onMounted(() => {
      setInterval(() => {
      let startTime = new Date('2021-3-20') // 开始时间
      let endTime = new Date() // 结束时间
      let usedTime = endTime - startTime // 相差的毫秒数
      let days = Math.floor(usedTime / (24 * 3600 * 1000)) // 计算出天数
      let leavel = usedTime % (24 * 3600 * 1000) // 计算天数后剩余的时间
      let hours = Math.floor(leavel / (3600 * 1000)) // 计算剩余的小时数
      let leavel2 = leavel % (3600 * 1000) // 计算剩余小时后剩余的毫秒数
      let minutes = Math.floor(leavel2 / (60 * 1000)) // 计算剩余的分钟数
      let level3 = leavel2 - minutes * 60 * 1000
      let seconds = Math.floor(level3 / 1000)
      state.runtime = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
    }, 1000)
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  font-weight: bold;
  margin-top: 70px;
  height: 95px;
  padding: 15px 10px;
  text-align: center;
  font-size: 12px;
  line-height: 1.5em;
}

.bottom div {
  margin-top: 2px;
}
</style>
