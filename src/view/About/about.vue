<template>
  <div class="about allpage bdr">
    <!-- 主要内容 -->
    <div class="main-content">
      <div class="aboutblog">
        <h1 class="aboutMe">About</h1>
        <hr class="parting-line" />
        <h1 class="text-textcolor">二肥的博客</h1>
        <div class="text-white fs-xl">
          <div class="text-grey">
            <p>一个前端初学者的博客，会记录我的学习笔记和日常</p>
            <!-- 简介 -->
            <h2 class="text-textcolor">博客介绍</h2>
            <p> 本站是个人博客网站，前端采用Vue3.0+typescript+vite，后端采用node+express+mongodb </p>
            <p> 做博客的原因是因为看到别人的博客很厉害所以自己也想做一个 </p>
            <p> 起初是一个简简单单的博客，已经更新了很多个版本了 </p>
            <p> 因为在学习这些新东西，就想着捣鼓捣鼓这些玩意，看看有没什么不同 </p>
            <p> 顺便巩固一下学到的东西 </p>
            <p> 一是可以检验巩固自己的学习情况，二是可以在这里分享我的学习，甚至督促我学习 </p>
          </div>
        </div>

        <div class="text-grey fs-xl">
          <h2 class="text-textcolor">关于博主</h2>
          <h5 class="text-textcolor"> 一个大三学生，啥也还不会，正在努力学习中 </h5>
          <p>计划在学习过程中不断优化该博客</p>
          <p>
            目前就读于广东技术师范大学，喜欢听音乐
          </p>
          <p>现正在实习中。。。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import imgBar from "@/components/imgBar/imgBar";
export default {

}
</script>

<style lang="scss" scoped>

.blogname {
  font-size: 70px;
  margin: 20px;
}

.aboutblog {
  margin: 20px auto;
  text-align: center;
  img {
    display: inline;

    height: 130px;
    width: 130px;
    border-radius: 50%;
  }
}
.content {
  line-height: 1.8 !important;
}

.about-nav {
  width: 100%;
  height: 30px;
  .abouts {
    height: 30px;
    line-height: 30px;
  }
}
.findme {
  width: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .item {
    width: 40px;
    height: 40px;
  }
}

@media screen and(max-width: 720px) {
  .findme {
    width: 80%;
    .item {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
