import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
/* 
import AppNavbar from '@/components/AppNavbar.vue';
import PostCard from '@/components/PostCard.vue';
import PostList from '@/components/PostList.vue';
import UserPost from '@/components/UserPost.vue';
// 注册组件
app.component('AppNavbar', AppNavbar);
app.component('PostCard', PostCard);
app.component('PostList', PostList);
app.component('UserPost', UserPost); */

const app = createApp(App);

// 设置 Axios 基础 URL
axios.defaults.baseURL = 'http://localhost:3000';
app.config.globalProperties.$axios = axios;

axios.interceptors.request.use((config) => {
  console.log(`Making request to ${config.url}`);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.log(`Received response from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Error response:', error);
    return Promise.reject(error);
  }
);

app.use(router);
app.mount('#app');