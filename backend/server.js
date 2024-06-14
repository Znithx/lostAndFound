
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./db'); // 确保路径正确
require('dotenv').config();

const app = express();

// 中间件设置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // 使用 CORS 中间件

// 设置 Multer 的存储路径
const upload = multer({ dest: 'uploads/' });

// 路由
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes'); // 确保正确引入
app.use('/api', authRoutes);
app.use('/api', itemRoutes); // 使用新的路由文件

// 提供静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});