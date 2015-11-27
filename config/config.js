require('dotenv').load();

module.exports = {
  db: process.env.MONGO_URL || 'mongodb://localhost/expressTest',
};
