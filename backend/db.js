const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'zm180823',
  database: process.env.DB_NAME || 'lostandfound',
});

db.connect(err => {
  if (err) {
    console.error('无法连接到数据库:', err);
    return;
  }
  console.log('成功连接到数据库');
});

module.exports = db;