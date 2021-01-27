const mongoose = require("mongoose");

// Create connection

mongoose.connect("mongodb://127.0.0.1:27017/news-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
});

// Model

// Instance
