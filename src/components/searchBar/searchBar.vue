<!--  -->
<template>
  <div class="search">
    <!-- 搜索框 -->
    <el-input placeholder="搜索功能暂未开放" v-model="searchValue">
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
        @click="submit"
      ></i>
    </el-input>


  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      state: "",
    };
  },
  methods: {
    // 搜索提交
    async submit() {
      this.$router.push('/search')
      // console.log(this.searchValue);
      let searchValue = []
      const res = await this.$http.post(`/search/${this.searchValue}`);
      console.log(res.data);
      searchValue = res.data
      this.$store.dispatch('searchValue', searchValue)
    },

  },
};
</script>

<style lang="scss"  scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
