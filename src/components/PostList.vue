<template>
  <div class="container">
    <div class="row">
      <Post v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Post from './UserPost.vue';

export default {
  name: "PostList",
  components: {
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>