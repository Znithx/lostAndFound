<template>
  <div>
    <AppNavbar />
   <!--  <PostCard :post="examplePost" /> -->
    <PostList />
    <UserPost />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';
import AppNavbar from '../components/AppNavbar.vue';
/* import PostCard from '../components/PostCard.vue'; */
import UserPost from '../components/UserPost.vue';

export default {
  name: 'FirstView',
  components: {
    AppNavbar,
   /*  PostCard, */
    PostList,
    UserPost
  },
  data() {
    return {
      examplePost: {
        time: '2024-06-14 03:41:20',
        category: '日用品',
        title: '寻物启事：丢失钱包',
        location: '图书馆',
        contact: '123-456-7890',
        details: '一个黑色的皮革钱包，内有身份证和几张信用卡。',
        photo: '@/assets/wallet_photo.png'
      }
    };
  }
};
</script>