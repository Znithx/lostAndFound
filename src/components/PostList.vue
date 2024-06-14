<template>
  <div class="container">
    <div class="row">
      <Post v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script>
import Post from './UserPost.vue';

export default {
  name: "PostList",
  components: {
    Post
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>