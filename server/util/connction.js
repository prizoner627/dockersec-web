const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/dockysec";

const connect = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("database connected");
};

module.exports = connect;

// kgDDQm9nqlJafJjA
