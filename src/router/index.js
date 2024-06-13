import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FoundItemsView from '@/views/FoundItemsView.vue';
import LostItemsView from '@/views/LostItemsView.vue';
import MyPostsView from '@/views/MyPostsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/found', component: FoundItemsView },
  { path: '/lost', component: LostItemsView },
  { path: '/myposts', component: MyPostsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;