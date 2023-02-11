const mongoose = require('mongoose');

console.log('Trying connect');
mongoose.connect('mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
