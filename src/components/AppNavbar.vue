<template>
  <header class="app-navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" class="logo-image">
      <h1>失物招领</h1>
    </div>
    <nav>
      <ul>
        <li @click="filterType('found')">捡到</li>
        <li @click="filterType('lost')">丢失</li>
        <li @click="filterType('myPosts')">我的发布</li>
      </ul>
    </nav>
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input type="search" placeholder="请输入关键词" v-model="searchQuery" @input="searchPosts">
    </div>
    <div class="user-info">
    <img src="@/assets/user-avatar.png" alt="user-avatar" class="user-avatar">
    <span>您好，张斌</span>
    <button class="logout-button" @click="showLogoutModal = true">
      <i class="fas fa-sign-out-alt"></i>
    </button>
  </div>
   <!-- 退出弹窗 -->
  <div v-if="showLogoutModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>注意</h2>
        <button class="close-button" @click="showLogoutModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <p>确认退出登录吗?</p>
      </div>
      <div class="modal-footer">
        <button @click="showLogoutModal = false">我点错了</button>
        <button @click="confirmLogout">确认</button>
      </div>
    </div>
  </div>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      searchQuery: '',
      showLogoutModal: false
    };
  },
  methods: {
    searchPosts() {
      this.$emit('search', this.searchQuery);
    },
    filterType(type) {
      this.$emit('filterType', type);
    },
    confirmLogout() {
      // 在这里添加退出逻辑
      console.log("用户已退出");
      this.showLogoutModal = false;
    }
  }
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
  height: 80px; /* 修改导航栏高度 */
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
  gap: 55px;
  margin-left: -140px; /* 向左移动140px，可以根据需要调整 */
}
nav ul li {
  cursor: pointer; /* 添加鼠标指针样式 */
  position: relative;
  padding-bottom: 10px;
  font-size: 30px; /* 增加字体大小 */
}
nav ul li:hover {
  color: green; /* 鼠标悬停时字体变为绿色 */
}
nav ul li:hover::after {
  content: '';
  position: absolute;
  width: 150%;
  height: 5px; /* 下标线厚度 */
  background-color: green; /* 下标线颜色 */
  bottom: -20px; /* 调整下标线位置，使其与导航栏底部重合 */
  left: -25%; /* 让下划线居中 */
}
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f5f5f5; /* 设置背景颜色 */
  border-radius: 20px; /* 设置圆角 */
  padding: 10px 20px; /* 增加内边距 */
  font-size: 18px; /* 增加字体大小 */
}
.search-icon {
  color: #ccc; /* 设置图标颜色 */
  margin-right: 10px; /* 增加图标右边距 */
  font-size: 20px; /* 增加图标大小 */
}
.search-container input {
  border: none; /* 移除边框 */
  background: none; /* 移除背景 */
  outline: none; /* 移除输入框的轮廓 */
  font-size: 18px; /* 增加字体大小 */
  color: #666; /* 设置字体颜色 */
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right:5%;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.logout-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
}
.logout-button i {
  font-size: 24px; /* 增加图标大小 */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* 增加宽度 */
  height: 200px; /* 增加高度 */
  max-width: 90%; /* 调整最大宽度 */
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 10px;
}
.modal-header h2 {
  margin: 0;
  color: red;
}
.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.modal-body {
  padding: 20px 0;
  font-size: 18px; /* 增加字体大小 */
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.modal-footer button {
  padding: 10px 20px; /* 增加按钮的内边距 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px; /* 增加按钮的字体大小 */
}
.modal-footer button:first-child {
  background: #f0f0f0;
}
.modal-footer button:last-child {
  background: #00bfa5;
  color: #fff;
}
</style>