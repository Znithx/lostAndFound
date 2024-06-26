

const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');


// 设置 Multer 的存储路径
const upload = multer({ dest: 'uploads/' });

// 添加物品信息
router.post('/items', upload.single('image'), (req, res) => {
  const { time, category, title, location, contact, type, belong } = req.body;
  const imageUrl = 'http://localhost:3000/' + req.file.path;

  const sql = 'INSERT INTO items (time, category, title, location, contact, type,image_path, belong) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [time, category, title, location, contact, type,imageUrl, belong];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('插入物品信息失败:', err);
      res.status(500).send('插入物品信息失败');
      return;
    }
    res.json({imageUrl: imageUrl});
    //res.send('物品信息插入成功');
  });
});

// 获取物品信息
router.get('/items', (req, res) => {
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

// 搜索物品信息
router.get('/items/search', (req, res) => {
  const query = req.query.query;
  const username = req.query.username; 
  let sql = 'SELECT * FROM items WHERE title LIKE ? ';
  const values = [`%${query}%`];
  // 如果 username 存在，则添加到查询条件中
  if (username) {
    sql += ' AND belong = ?';
    values.push(username);
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('搜索数据库时出错:', err);
      res.status(500).send('服务器内部错误');
      return;
    }
    res.json(results);
  });
});



// 获取当前用户的物品信息
router.get('/items/user/:username', (req, res) => {
  const username = req.params.username;
  const sql = 'SELECT * FROM items WHERE belong = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('查询用户物品信息时出错:', err);
      res.status(500).send('服务器内部错误');
      return;
    }
    res.json(results);
  });
});

module.exports = router;