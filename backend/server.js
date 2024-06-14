const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

// 中间件设置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // 使用 CORS 中间件

// 设置 Multer 的存储路径
const upload = multer({ dest: 'uploads/' });

// 创建数据库连接
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lostandfound',
});

// 连接到数据库
db.connect(err => {
  if (err) {
    console.error('无法连接到数据库:', err);
    return;
  }
  console.log('成功连接到数据库');
});


// 路由
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// 图片上传路由
app.post('/api/upload', upload.single('image'), (req, res) => {
  const { time, category, title, location, contact, type } = req.body;
  const imagePath = req.file ? req.file.path : '';

  const sql = 'INSERT INTO items (time, category, title, location, contact, type, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [time, category, title, location, contact, type, imagePath];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('插入物品信息失败:', err);
      res.status(500).send('插入物品信息失败');
      return;
    }
    res.send('物品信息插入成功');
  });
});

// 创建 API 端点
app.get('/api/items', (req, res) => {
  const query = 'SELECT * FROM items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('查询数据库时出错:', err);
      res.status(500).send('服务器内部错误');
      return;
    }
    res.json(results);
  });
});

// 提供静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});