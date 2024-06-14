const db = require('../db');

const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  const query = 'INSERT INTO users SET ?';
  db.query(query, newUser, (err, res) => {
    if (err) {
      console.error('插入用户失败:', err); // 打印详细错误信息
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUsername = (username, result) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, res) => {
    if (err) {
      console.error('查询用户失败:', err); // 打印详细错误信息
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

module.exports = User;