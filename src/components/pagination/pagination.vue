<!--  -->
<template>
  <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="5"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
    };
  },
  props: {
    total: {
      type: Number,
      default: "",
    },
  },
  methods: {
    // 页面跳转方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("changePage", val);
    },
  },
};
</script>

<style  scoped>

</style>
