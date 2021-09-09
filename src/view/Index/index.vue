<template>
  <div class="index mb-9">
    <div>
      <div class="mb-7">
        <div class="bgImg d-flex jc-center" id="header">
          <!-- 首页文字 -->
          <div class="text-white blogname">
            <span class="blogname-text"> 二肥的博客</span>
          </div>
          <div class="text-white d-flex jc-center ai-center">
            <div class="shouye-text">喜欢您来！</div>
            <div class="line-down pl-3">_</div>
          </div>
          <!-- 进入博客按钮 -->
          <div class="enterbtn">
            <el-button size="mini" type="primary" round @click="enterbtn"
              >Enter</el-button
            >
          </div>
          <!-- 箭头图标 -->
          <div class="arrow-down hand">
            <i class="el-icon-arrow-down" @click="downPage"></i>
          </div>
        </div>
      </div>
      <!-- 最近博客 -->
      <div class="recentblog">
        <div class="recentblog-title">
          <span>最新博客</span>
        </div>
        <div class="recentblog-list">
          <div
            class="blogs spacebetween"
            v-for="(item, index) in recentblog"
            :key="index"
            @click="GoDetail(item._id)"
          >
            <div class="blog">
              <!-- 图片 -->
              <!-- <div class="blog-left"> -->
              <img src="@/assets/images/topimg.jpg" alt="" />
              <!-- </div> -->
              <div class="blog-right">
                <!-- 标题 -->
                <h2 class="blog-title">{{ item.title || "加载中···" }}</h2>
                <div>
                  <div class="blog-description">
                    {{ item.description || "加载中···" }}
                  </div>
                  <hr size="0" width="80%" align="left" />
                </div>
                <div class="blog-footer">
                  <!-- 时间 -->
                  <div class="blog-date">
                    {{ item.createdAt | date("YYYY-MM-DD") }}
                  </div>
                  <!-- 点击次数 -->
                  <div class="content">
                    <i class="el-icon-view"></i>{{ item.views || 0 }}次
                  </div>
                  <!-- 点赞 -->
                  <div class="content">
                    <i class="el-icon-star-off"></i>{{ item.likes || 0 }}
                  </div>
                  <!-- 评论 -->
                  <div class="content">
                    <i class="el-icon-chat-line-round"></i>{{ item.msgs || 0 }}
                  </div>
                </div>
                <!-- 标签 -->
                <div class="blog-tag">
                  <div
                    class="tagcolor"
                    v-for="(tag, index) in item.tags"
                    :key="index"
                  >
                    {{ tag.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 多两个按钮 -->
      <div class="btncontent">
        <div class="btnitem">
          <div class="aboutbtn pr-6">
            <el-button type="primary" @click="toabout">关于博客</el-button>
          </div>
          <div class="linkbtn">
            <el-button type="primary" @click="tolink">友情链接</el-button>
          </div>
        </div>
      </div>

      <!-- 写两句话 -->
      <div class="language">
        <div class="language-text text-blue">for a rainy day</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recentblog: [],
    };
  },
  methods: {
    // 获取最近文章列表
    // async getRecentblog() {
    //   const res = await this.$http.get("/blog/recent");
    //   console.log(res.data);
    //   this.recentblog = res.data;
    // },

    GoDetail(id) {
      this.$router.push(`/blog/list/${id}`);
    },

    // 两个按钮的跳转
    toabout() {
      this.$router.push("/about");
    },
    tolink() {
      this.$router.push("/friendLink");
    },
    // 点击移动到下一个视口
    downPage() {
      window.scrollTo({
        top: 750,
        behavior: "smooth",
      });
    },
    // 进入博客列表
    enterbtn() {
      this.$router.push("/home");
    },
  },
  mounted() {
    // this.getRecentblog();
  },
};
</script>

<style lang="scss" scoped>
.index {
  margin: 0 !important;
}
.blogname {
  position: absolute;
  top: 200px;
  .blogname-text {
    font-size: 40px;
  }
}

.recentblog {
  width: 70%;
  margin: 100px auto;
}
.recentblog-title {
  text-align: center;
  font-size: 30px;
  margin: 60px;
}
.bgImg {
  background: url("../../assets/img/home/bgimg.jpg") no-repeat center center fixed;
  width: 100%;
  height: 100vh;
  // height: 100%;
  // background-position: center;
  // -webkit-background-size: cover;
  // -moz-background-size: cover;
  // -o-background-size: cover;
  background-size: cover;
  position: relative;
  overflow: hidden;
  .shouye-text {
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    width: 13em;
    white-space: nowrap;
    animation: typing 2.5s steps(13, end), infinite;
    overflow: hidden;
  }
  .line-down {
    font-size: 32px;
    font-family: "Roboto", sans-serif;
    animation: shine 0.5s linear infinite alternate;
  }
  .enterbtn {
    position: absolute;
    bottom: 200px;
  }
  .arrow-down {
    position: absolute;
    bottom: 30px;
    color: #fff;
    animation: arrowDown 0.8s linear infinite alternate;
    font-size: 50px;
    .icon-down {
      cursor: pointer;
    }
  }
}

// 按钮模块样式
.btncontent {
  background-color: #fff;
  width: 100%;
  height: 300px;
  opacity: 0.7;
}
.btnitem {
  // z-index: 99;
  display: flex;
  justify-content: space-around;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: 50%;
  opacity: 1;
}

.language {
  margin-top: 100px;
  width: 100%;
  height: 200px;
  background-color: #fff;
  opacity: 0.8;
  .language-text {
    text-align: center;
    line-height: 200px;
  }
}
.recentblog-list {
  display: flex;
  flex: 1;
}
.blog {
  display: flex;
  // width: 100%;
  flex-direction: column;
  padding-bottom: 10px;
}
.blogs {
  padding: 0;
  cursor: pointer;
  margin-bottom: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  width: 40%;
  height: 330px;
  background-color: white;
  display: flex;
  margin: 0 5px;
  align-items: center;
  // min-width: 100%;
}
.blog img {
  width: 100%;
  height: 230px;
  padding: 5px;
  transition: 0.3s;
}
.blog img:hover {
  transform: scale(1.05);
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

@keyframes arrowDown {
  0% {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: translatey(-20%);
  }
  20% {
    visibility: visible;
    opacity: 0;
    -webkit-transform: translatey(10%);
  }
  100% {
    visibility: visible;
    opacity: 1;
    -webkit-transform: translatey(20%);
  }
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 13em;
  }
}
@keyframes shine {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}

.post-container {
  max-width: 1024px;
  margin: 0 auto;
  .top {
    width: 270px;
    height: 250px;
  }
}
@media screen and (max-width: 768px) {
  .shouye-text {
    font-size: 24px !important;
  }
  .line-down {
    font-size: 24px !important;
  }
}
@media not screen and (min-width: 45em) {
  .recentblog-list {
    display: flex;
    flex-direction: column;
  }
  .blogs {
    padding: 0;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    width: 100%;
    height: 330px;
    background-color: white;
    display: flex;
    margin: 5px;
    align-items: center;
    // min-width: 100%;
  }
  .recentblog {
    width: 90%;
    margin: 50px auto;
  }
}
</style>
