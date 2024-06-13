<template>
  <header class="app-navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" class="logo-image">
      <h1>失物招领</h1>
    </div>
    <nav>
      <ul>
        <li>捡到</li>
        <li>丢失</li>
        <li>我的发布</li>
      </ul>
    </nav>
    <div class="search-container">
      <input type="search" placeholder="请输入关键词">
    </div>
    <div class="user-info">
      <span>您好，张斌</span>
      <img src="@/assets/user-avatar.png" alt="user-avatar" class="user-avatar">
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style scoped>
.app-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff; /* 背景颜色改为白色 */
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.logo {
  display: flex;
  align-items: center;
}
.logo-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
}
.search-container input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>