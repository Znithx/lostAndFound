<template>
  <div>
    <h1>First View</h1>
    <AppNavbar></AppNavbar>
    <PostCard></PostCard>
    <PostList></PostList>
    <UserPost></UserPost>
    <login></login>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import PostCard from '@/components/PostCard.vue';
import PostList from '@/components/PostList.vue';
import UserPost from '@/components/UserPost.vue';
import login from '@/components/LoginComponent.vue';

export default {
  name: 'FirstView',
  components: {
    AppNavbar,
    PostCard,
    PostList,
    UserPost,
    login
  }
};
</script>

<style scoped>
/* 可以添加你的样式 */
</style>


