const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const User = require('./models/User');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/lost-and-found', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 注册路由
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // 检查用户名是否已存在
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: '用户名已存在' });
  }

  // 哈希密码
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建新用户
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: '注册成功' });
});

// 登录路由
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 查找用户
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: '用户名或密码错误' });
  }

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: '用户名或密码错误' });
  }

  // 创建 JWT
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器正在运行在 http://localhost:${PORT}`);
});