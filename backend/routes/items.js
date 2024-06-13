const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// 创建物品
router.post('/', async (req, res) => {
  const { title, description, location, contactInfo, type } = req.body;
  try {
    const item = new Item({ title, description, location, contactInfo, type });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 获取所有物品
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;