const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    User.create(newUser, (err, data) => {
      if (err) {
        console.error('数据库错误:', err); // 打印详细错误信息
        return res.status(500).json({
          success: false,
          message: '注册失败,已经存在用户名或用户邮箱'
        });
      } else {
        return res.status(200).json({
          success: true,
          message: '你好，世界'
        });
      }
    });
  } catch (error) {
    console.error('服务器错误:', error); // 打印详细错误信息
    return res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: '密码错误'
      });
    }

    res.status(200).json({
      success: true,
      message: '登录成功'
    });
  });
};