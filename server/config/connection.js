const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.y5shcl2.mongodb.net/googlebooks?retryWrites=true`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
