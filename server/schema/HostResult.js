const mongoose = require("mongoose");

const hostResult = new mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },
  scanId: {
    type: String,
    required: true,
  },
  cis: {
    type: Array,
    required: true,
  },
  hostscan: {
    type: Array,
    required: true,
  },
  dockerfile: {
    type: Object,
    required: true,
  },
  composefile: {
    type: Object,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
});

const hostResultSchema = mongoose.model("HostResult", hostResult);

module.exports = { HostResult: hostResultSchema };
