const mongoose = require("mongoose");

const Vulneralabilitie = new mongoose.Schema({
  cve_id: {
    type: String,
    required: false,
  },
  created_at: {
    type: String,
    required: false,
  },
  updated_at: {
    type: String,
    required: false,
  },
  references: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  cvss2: {
    type: String,
    required: false,
  },
  cvss3: {
    type: String,
    required: false,
  },
  cwes: {
    type: String,
    required: false,
  },
  cpes: {
    type: String,
    required: false,
  },
  score: {
    type: String,
    required: false,
  },
});

const vulneralabilitieSchema = mongoose.model(
  "Vulneralabilitie",
  Vulneralabilitie
);

module.exports = { Vulneralabilitie: vulneralabilitieSchema };
