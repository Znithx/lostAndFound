<template>
  <div class="post-card" @click="showDetails" :class="{ active: isActive }">
    <div class="post-header">
      <span class="post-time"><img src="@/assets/time.png" alt="Time Icon" class="icon" /> {{ post.time }}</span>
      <span class="post-category">{{ post.category }}</span>
    </div>
    <h2 class="post-title">{{ post.title }}</h2>
    <div class="post-details">
      <div class="post-photo">
        <img src="@/assets/photo.png" alt="Photo Icon" class="photo-icon" />
      </div>
      <div class="post-info">
        <div class="post-detail">
          <img src="@/assets/location.png" alt="Location Icon" class="icon" />
          <div>
            <span>捡获地点</span>
            <p>{{ post.location }}</p>
          </div>
        </div>
        <div class="post-detail">
          <img src="@/assets/relation.png" alt="Relation Icon" class="icon" />
          <div>
            <span>联系方式</span>
            <p>{{ post.contact }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="post-footer">
      <a href="#" @click.prevent="showDetails"><i class="fas fa-search"></i> 查看详情</a>
    </div>
    <div v-if="isActive" class="modal" @click.self="showDetails">
      <div class="modal-content">
        <span class="close" @click="showDetails">&times;</span>
        <div class="modal-header">
          <h2>{{ post.title }}</h2>
        </div>
        <div class="modal-detail">
          <img src="@/assets/time.png" alt="Time Icon" class="icon" />
          <div>
            <span>发布时间</span>
            <p>{{ post.time }}</p>
          </div>
        </div>
        <div class="modal-detail">
          <img src="@/assets/type.png" alt="Type Icon" class="icon" />
          <div>
            <span>物品类型</span>
            <p>{{ post.category }}</p>
          </div>
        </div>
        <div class="modal-detail">
          <img src="@/assets/delition.png" alt="Detail Icon" class="icon" />
          <div>
            <span>物品详情</span>
            <p>{{ post.details }}</p>
          </div>
        </div>
        <div class="modal-detail">
          <img src="@/assets/photo1.png" alt="Photo Icon" class="icon" />
          <div>
            <span>图片</span>
            <img :src="post.photo" alt="Item Photo" class="detail-photo" />
          </div>
        </div>
        <div class="modal-detail">
          <img src="@/assets/location.png" alt="Location Icon" class="icon" />
          <div>
            <span>捡获地点</span>
            <p>{{ post.location }}</p>
          </div>
        </div>
        <div class="modal-detail">
          <img src="@/assets/relation.png" alt="Relation Icon" class="icon" />
          <div>
            <span>联系方式</span>
            <p>{{ post.contact }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    showDetails() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style scoped>
.post-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}
.post-card:hover {
  border-color: #28a745; /* 鼠标悬浮时变成绿色 */
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.post-time {
  font-size: 0.85em;
  color: #888;
  display: flex;
  align-items: center;
}
.post-category {
  background-color: #e0f7fa;
  color: #00796b;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75em;
}
.post-title {
  font-size: 1.2em;
  margin: 10px 0;
}
.post-details {
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.post-photo {
  width: 160px; /* 放大图片 */
  height: 160px; /* 放大图片 */
  margin-right: 20px; /* 增加右侧间距 */
}
.photo-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.post-info {
  flex-grow: 1;
}
.post-detail {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}
.post-detail div {
  display: flex;
  flex-direction: column;
}
.post-detail span {
  margin-right: 5px;
}
.post-detail p {
  margin: 0;
}
.post-footer {
  text-align: right;
}
.post-footer a {
  color: #00796b;
  text-decoration: none;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
.modal-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
}
.modal-detail {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-top: 50px; /* 预留给固定的标题区域 */
}
.modal-detail div {
  display: flex;
  flex-direction: column;
}
.modal-detail span {
  margin-right: 5px;
}
.modal-detail p {
  margin: 0;
}
.detail-photo {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>