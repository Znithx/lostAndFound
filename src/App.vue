<template>
  <div id="app">
    <AppNavbar />
    <div class="content">
      <UserPost />
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import UserPost from './components/UserPost.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    UserPost
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
  margin-top: 80px; /* 确保内容不会被导航栏覆盖 */
  padding: 20px;
  background-color: #f8f8f8; /* 设置内容的背景颜色 */
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

img {
  max-width: 100%;
}
</style>