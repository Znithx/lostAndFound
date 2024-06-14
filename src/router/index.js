import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import FirstView from '../views/FirstView.vue'; // 假设有一个Shouye.vue作为首页
import UserLogin from '../components/LoginComponent';
import UserRegister from '../components/RegisterComponent.vue';
import PublishItem from '../components/PublishItem.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/first',
    name: 'FirstView',
    component: FirstView
  },
  { path: '/login', name: 'login', component: UserLogin },
  {
    path: '/publish',
    name: 'PublishItem',
    component: PublishItem
  },

  { path: '/register', name: 'register', component: UserRegister }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
