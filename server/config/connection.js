const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.y5shcl2.mongodb.net/?retryWrites=true&w=majority/googlebooks`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
