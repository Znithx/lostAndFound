<template>
  <div>
    <AppNavbar :username="username" @updatePosts="updatePosts" @filterType="updateShowType" />
    <PostList :posts="filteredPosts" />
    <UserPost :currentFilter="currentFilter" :showType="showType" />
  </div>
  
</template>

<script>
import PostList from '../components/PostList.vue';
import AppNavbar from '../components/AppNavbar.vue';
import UserPost from '../components/UserPost.vue';
import axios from 'axios';

export default {
  name: 'FirstView',
  components: {
    AppNavbar,
    PostList,
    UserPost
  },
  data() {
    return {
      posts: [], // 用于存储所有帖子
      filteredPosts: [], // 用于存储筛选后的帖子 11
      currentFilter: 'found', // 默认选中的过滤类型
      username: '', // 用于存储用户名
      showType: 'found' // 默认值为 'found'
    };
  },
  created() {
    // 初始加载所有帖子
    this.fetchPosts();
    this.username = localStorage.getItem('username') || '游客';
    this.showType = localStorage.getItem('showType') || 'found';
  },
  methods: {
    updatePosts(posts) {
      this.posts = posts;
      this.filterType(this.currentFilter); // 根据当前过滤类型筛选帖子
    },
    filterType(type) {
      this.currentFilter = type; // 更新当前过滤类型
      // 根据类型筛选帖子
      if (type === 'all') {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.posts.filter(post => post.status === type);
      }
    },
    updateShowType(type) {
      this.showType = type; // 更新 showType
    },
    fetchPosts() {
      axios.get('http://localhost:3000/api/items')
        .then(response => {
          this.posts = response.data;
          this.filterType(this.currentFilter); // 初始情况下，默认显示“捡到”的帖子
        })
        .catch(error => {
          console.error('加载帖子失败:', error);
        });
    }
  }
};
</script>