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
      localSearchQuery: this.searchQuery || '', // 使用本地数据属性来存储 searchQuery
      isPublishModalVisible: false,
      localShowType: this.showType, // 使用本地数据属性来存储 showType
      localUsername: this.username, // 使用本地数据属性来存储 username
      filteredPosts: [] // 用于存储过滤后的帖子
    };
  },
  props: {
    currentFilter: {
      type: String,
      required: true
    },
    showType: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    searchQuery: {
      type: String,
      required: false
    }
  },
  watch: {
    showType(newVal) {
      this.localShowType = newVal; // 当 showType prop 改变时，更新本地数据属性
      this.filterPosts(); // 重新过滤帖子
    },
    filter() {
      this.filterPosts(); // 当 filter 改变时，重新过滤帖子
    },
    searchQuery(newQuery) {
      this.localSearchQuery = newQuery; // 同步本地数据和 prop
      this.fetchPosts(); // 当 searchQuery 改变时，重新获取数据
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
      const params = {
        query: this.localSearchQuery
      };
      axios.get('http://localhost:3000/api/items/search', { params })
        .then(response => {
          console.log("获取到的数据:", response.data); // 添加日志
          this.posts = response.data;
          this.filterPosts(); // 初始加载帖子后进行过滤
        })
        .catch(error => {
          console.error("无法获取物品信息", error);
        });
    },
    fetchUserPosts() {
      axios.get(`http://localhost:3000/api/items/user/${this.localUsername}`)
        .then(response => {
          this.filteredPosts = response.data;
        })
        .catch(error => {
          console.error('获取用户发布的物品信息失败:', error);
        });
    },
    filterPosts() {
      let result = this.posts;

      if (this.localShowType !== 'all') {
        if (this.localShowType === 'myPosts') {
          this.fetchUserPosts(); // 调用 fetchUserPosts 方法
          return;
        } else {
          result = result.filter(post => post.type === this.localShowType);
        }
      }

      if (this.filter !== 'all') {
        result = result.filter(post => post.category === this.filter);
      }

      if (this.localSearchQuery) {
        result = result.filter(post => post.title.includes(this.localSearchQuery) || post.location.includes(this.localSearchQuery));
      }

      this.filteredPosts = result;
    }
  },
  created() {
    this.fetchPosts();
    this.localUsername = localStorage.getItem('username') || '游客';
    this.localShowType = localStorage.getItem('showType') || 'all';
    this.localSearchQuery = localStorage.getItem('searchQuery') || '';
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