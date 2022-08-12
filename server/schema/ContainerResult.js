const mongoose = require("mongoose");

const containerResult = new mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },
  scanId: {
    type: String,
    required: true,
  },
  container: {
    type: Array,
    required: true,
  },
  containerscan: {
    type: Array,
    required: true,
  },
});

const containerResultSchema = mongoose.model(
  "ContainerResult",
  containerResult
);

module.exports = { ContainerResult: containerResultSchema };
