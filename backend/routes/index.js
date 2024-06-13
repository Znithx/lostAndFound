import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue'; // 导入 HomeView 组件

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    // 其他路由配置
  ]
});