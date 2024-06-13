<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/wuhan-university-logo.png" alt="Wuhan University Logo" class="logo">
      <span class="title">失物招领</span>
    </div>
    <div class="navbar-center">
      <router-link to="/found" class="nav-link" :class="{ active: isActive('/found') }">捡到</router-link>
      <router-link to="/lost" class="nav-link" :class="{ active: isActive('/lost') }">丢失</router-link>
      <router-link to="/myposts" class="nav-link" :class="{ active: isActive('/myposts') }">我的发布</router-link>
    </div>
    <div class="navbar-right">
      <div class="search-bar">
        <input type="text" placeholder="请输入关键词" v-model="searchQuery" @input="searchPosts">
        <i class="fa fa-search"></i>
      </div>
      <div class="user-info">
        <img src="@/assets/user-avatar.png" alt="User Avatar" class="avatar">
        <span class="username">您好，张漫</span>
        <i class="fa fa-sign-out-alt"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavBar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    searchPosts() {
      this.$emit('searchPosts', this.searchQuery);
    },
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.navbar-center {
  display: flex;
  gap: 20px;
}

.nav-link {
  font-size: 18px;
  color: #333;
  text-decoration: none;
  padding: 5px 10px;
  border-bottom: 2px solid transparent;
}

.nav-link.active {
  color: #00796b;
  border-bottom: 2px solid #00796b;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  position: relative;
}

.search-bar input {
  padding: 5px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.search-bar i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  height: 30px;
  border-radius: 50%;
}

.username {
  font-size: 18px;
}

.fa-sign-out-alt {
  font-size: 18px;
  cursor: pointer;
}
</style>