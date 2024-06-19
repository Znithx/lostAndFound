<template>
  <div class="publish-container">
    <h2>登记丢失物品信息</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>物品类型</label>
        <div class="category-buttons">
          <button type="button" :class="{ active: category === '证件类' }" @click="setCategory('证件类')">证件类</button>
          <button type="button" :class="{ active: category === '钥匙' }" @click="setCategory('钥匙')">钥匙</button>
          <button type="button" :class="{ active: category === '手机' }" @click="setCategory('手机')">手机</button>
          <button type="button" :class="{ active: category === '书本' }" @click="setCategory('书本')">书本</button>
          <button type="button" :class="{ active: category === '其他' }" @click="setCategory('其他')">其他</button>
        </div>
      </div>
      <div class="form-group">
        <label>物品名称</label>
        <input type="text" v-model="itemName" placeholder="请输入物品名称" required>
      </div>
      <div class="form-group">
        <label>物品详情</label>
        <textarea v-model="itemDetails" placeholder="请描述丢失或捡到的物品及特征" required></textarea>
      </div>
      <div class="form-group">
        <label>物品状态</label>
        <div>
          <input type="radio" id="lost" value="lost" v-model="itemStatus">
          <label for="lost">丢失</label>
          <input type="radio" id="found" value="found" v-model="itemStatus">
          <label for="found">捡到</label>
        </div>
      </div>
      <div class="form-group">
        <input type="file" @change="onFileChange" />
        <button>上传图片</button>
        <img v-if="imageUrl" :src="imageUrl" alt="uploaded Image" />
      </div>
      <div class="form-group">
        <label>丢失地点</label>
        <input type="text" v-model="location" placeholder="请输入丢失地点" required>
      </div>
      <div class="form-group">
        <label>丢失时间</label>
        <input type="datetime-local" v-model="lostTime" required>
      </div>
      <div class="form-group">
        <label>联系方式</label>
        <input type="text" v-model="contactInfo" placeholder="请输入联系方式" required>
      </div>
      <button type="submit" class="submit-button">提交</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PublishItem",
  data() {
    return {
      category: '',
      itemName: '',
      itemDetails: '',
      itemStatus: '', // 新增的单选选项
      location: '',
      lostTime: '',
      contactInfo: '',
      selectedFile:'',
      imageUrl:'',
      belong:''
    };
  },

  methods: {
    setCategory(category) {
      this.category = category;
    },
    onFileChange(event){
      this.selectedFile=event.target.files[0];
    },
    submitForm() {
      const formData = new FormData();
      this.belong= localStorage.getItem('username');
      formData.append('category', this.category);
      formData.append('title', this.itemName);
      formData.append('itemDetails', this.itemDetails);
      formData.append('type', this.itemStatus); // 添加单选选项的值
      formData.append('location', this.location);
      formData.append('time', this.lostTime);
      formData.append('contact', this.contactInfo);
      formData.append('belong',this.belong);
      formData.append('image',this.selectedFile);

      // 发送 POST 请求到服务器
      axios.post('http://localhost:3000/api/items', formData)
        .then(response => {
          console.log('物品发布成功:', response.data);
          this.imageUrl=response.data.imageUrl;
          location.assign("http://localhost:8080/first");
          //this.$router.push({ name: '/login' }); // 跳转到 FirstView 页面
        })
        .catch(error => {
          console.error('物品发布失败:', error);
        });
    }
  }
};
</script>

<style scoped>
.publish-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  padding: 0;
}

.category-buttons {
  display: flex;
  gap: 10px;
}

.category-buttons button {
  background: none;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.category-buttons button.active {
  background-color: #e0f7fa;
  color: #00796b;
  border-color: #00796b;
}

.submit-button {
  background-color: #00796b;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #004d40;
}
</style>