<template>
  <div class="home">
    <header>
      <h1>失物招领</h1>
      <nav>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </nav>
    </header>
    <main>
      <h2>欢迎来到失物招领系统</h2>
      <p>请登录或注册以继续。</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
main {
  margin-top: 20px;
}
</style>