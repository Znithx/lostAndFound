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
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: "UserPost",
  components: {
    PostCard
  },
  data() {
    return {
      posts: [
        { id: 1, time: "2024年06月12日 17:46", category: "证件类", title: "校内证件·校园卡", location: "梅园食堂", contact: "QQ 2892774004",type:'found' },
        { id: 2, time: "2024年06月08日 11:13", category: "证件类", title: "身份证件", location: "南二门附近", contact: "QQ 12345678",type:'found' },
        { id: 3, time: "2024年06月05日 07:55", category: "其他", title: "红双喜狂飙8乒乓拍", location: "信息学部四食堂附近", contact: "手机 879162187" ,type:'found'},
        { id: 4, time: "2024年06月03日 22:37", category: "其他", title: "外套加上耳机盒", location: "总图停车场所共享单车上", contact: "手机 15623581371",type:'lost' },
        { id: 5, time: "2024年06月02日 18:18", category: "其他", title: "湖北大学大学生校园卡", location: "桂园操场", contact: "手机 18171422867",type:'lost' },
        { id: 6, time: "2024年05月30日 19:44", category: "证件类", title: "校内证件·校园卡", location: "现在校园食堂附近", contact: "QQ 12345678" ,type:'lost'},
        { id: 7, time: "2024年05月28日 14:13", category: "其他", title: "遮阳伞", location: "湖浪2舍外的哈啰单车上", contact: "手机 15623581371" ,type:'lost'},
        
        // 添加其他示例数据...
      ],
      filter: 'all',
      searchQuery: '',
      currentUser: '张斌' // 假设当前用户为张斌
   
    };
  },
  computed: {
    filteredPosts() {
      let result = this.posts;
      if (this.filter !== 'all') {
        result = result.filter(post => post.category === this.filter);
      }
      if (this.searchQuery) {
        result = result.filter(post => post.title.includes(this.searchQuery) || post.location.includes(this.searchQuery));
      }
      if (this.filterType === 'myPosts') {
        result = result.filter(post => post.contact.includes(this.currentUser));
      } else if (this.filterType) {
        result = result.filter(post => post.type === this.filterType);
      }
      return result;
    }
  },
  methods: {
    filterCategory(category) {
      this.filter = category;
    },
    showPublishModal() {
      // 处理显示发布模态框的逻辑
    }
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