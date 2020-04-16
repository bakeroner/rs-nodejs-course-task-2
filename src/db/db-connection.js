const mongoose = require('mongoose');

function connectToDb(cb) {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('we are connected');
    db.dropDatabase();
  });
  cb();
}

module.exports = { connectToDb };
