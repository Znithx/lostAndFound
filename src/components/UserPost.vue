<template>
  <div class="posts-container">
    <div class="user-nav">
      <div class="filter-bar">
        <button :class="{ active: filter === 'all' }" @click="filterCategory('all')">全部</button>
        <button :class="{ active: filter === '证件类' }" @click="filterCategory('证件类')">证件类</button>
        <button :class="{ active: filter === '钥匙' }" @click="filterCategory('钥匙')">钥匙</button>
        <button :class="{ active: filter === '手机' }" @click="filterCategory('手机')">手机</button>
        <button :class="{ active: filter === '书本' }" @click="filterCategory('书本')">书本</button>
        <button :class="{ active: filter === '其他' }" @click="filterCategory('其他')">其他</button>
      </div>
      <button class="publish-button" @click="showPublishModal">
        我要发布 +
      </button>
    </div>
    <div class="posts-list">
      <PostCard v-for="post in filteredPosts" :key="post.id" :post="post"/>
    </div>
    <PublishModal :isVisible="isPublishModalVisible" @close="closePublishModal"/>
  </div>
</template>

<script>
import axios from 'axios';
import PostCard from './PostCard.vue';
import PublishModal from './PublishModal.vue';

export default {
  name: "UserPost",
  components: {
    PostCard,
    PublishModal
  },
  data() {
    return {
      posts: [],
      filter: 'all',
      searchQuery: '',
      currentUser: '张斌', // 假设当前用户为张斌
      isPublishModalVisible: false
    };
  },
  computed: {
    filteredPosts() {
      let result = this.posts;
      if (this.filter !== 'all') {
        result = result.filter(post => post.category === this.filter);
      }
      if (this.searchQuery) {
        result = result.filter(post => post.title.includes(this.searchQuery) || post.location.includes(this.searchQuery));
      }
      return result;
    }
  },
  methods: {
    filterCategory(category) {
      this.filter = category;
    },
    showPublishModal() {
      this.isPublishModalVisible = true;
    },
    closePublishModal() {
      this.isPublishModalVisible = false;
    },
    fetchPosts() {
      axios.get('http://localhost:3000/api/items')
        .then(response => {
          console.log("获取到的数据:", response.data); // 添加日志
          this.posts = response.data;
        })
        .catch(error => {
          console.error("无法获取物品信息", error);
        });
    }
  },
  created() {
    this.fetchPosts();
  }
};
</script>

<style scoped>
.posts-container {
  padding: 20px;
  background-color: #f0f0f0; /* 灰色背景 */
  margin-top: 6%;
}
.user-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.filter-bar {
  display: flex;
  gap: 10px;
}
.filter-bar button {
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}
.filter-bar button.active {
  background-color: #e0f7fa;
  color: #00796b;
  border-radius: 4px;
}
.filter-bar button:hover {
  background-color: #e0f7fa;
}
.publish-button {
  padding: 10px 20px;
  background: #00bfa5;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.publish-button:hover {
  background-color: #04ad97;
}
.posts-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 一排四个PostCard */
  gap: 20px;
}
</style>