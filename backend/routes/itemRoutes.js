/* const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');

// 设置 Multer 的存储路径
const upload = multer({ dest: 'uploads/' });

// 添加物品信息
router.post('/items', upload.array('image_path'), (req, res) => {
  const { id, time, category, title, location, contact, type } = req.body;
  const imagePaths = req.files.map(file => file.path);

  const sql = 'INSERT INTO items (id, time, category, title, location, contact, type, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id, time, category, title, location, contact, type, JSON.stringify(imagePaths)];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('插入物品信息失败:', err);
      res.status(500).send('插入物品信息失败');
      return;
    }
    res.send('物品信息插入成功');
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

module.exports = router; */


const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');

// 设置 Multer 的存储路径
const upload = multer({ dest: 'uploads/' });

// 添加物品信息
router.post('/items', upload.array('image_path'), (req, res) => {
  const { time, category, title, location, contact, type } = req.body;
  const imagePaths = req.files.map(file => file.path);

  const sql = 'INSERT INTO items (time, category, title, location, contact, type, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [time, category, title, location, contact, type, JSON.stringify(imagePaths)];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('插入物品信息失败:', err);
      res.status(500).send('插入物品信息失败');
      return;
    }
    res.send('物品信息插入成功');
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
  const { query } = req.query;
  const sql = 'SELECT * FROM items WHERE title LIKE ? OR category LIKE ? OR location LIKE ?';
  const values = [`%${query}%`, `%${query}%`, `%${query}%`];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('搜索数据库时出错:', err);
      res.status(500).send('服务器内部错误');
      return;
    }
    res.json(results);
  });
});

module.exports = router;