<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>登录</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="auth-button">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: this.username,
          password: this.password
        });
        if (response.data.success) {
          alert('登录成功');
          this.$router.push('/');
        } else {
          alert('登录失败: ' + response.data.message);
        }
      } catch (error) {
        alert('登录失败: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.auth-box {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
}
.auth-box h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}
.input-group {
  margin-bottom: 20px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}
.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.auth-button {
  width: 100%;
  padding: 10px;
  background-color: #00bfa5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.auth-button:hover {
  background-color: #009c8a;
}
</style>