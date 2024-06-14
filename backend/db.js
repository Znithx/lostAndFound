const mysql = require('mysql');
require('dotenv').config();

// 创建数据库连接
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lostandfound'
});

// 连接到数据库
db.connect(err => {
  if (err) {
    console.error('无法连接到数据库:', err);
    return;
  }
  console.log('成功连接到数据库');

  // 运行 SQL 语句，创建用户表
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createUsersTable, (err, result) => {
    if (err) {
      console.error('创建表失败:', err);
      return;
    }
    console.log('用户表创建成功或已存在');
    // 关闭数据库连接
    db.end();
  });
});