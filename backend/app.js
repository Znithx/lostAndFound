const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const auth = require('./routes/auth');

const app = express();

// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// 连接到 MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 使用路由
app.use('/api', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));