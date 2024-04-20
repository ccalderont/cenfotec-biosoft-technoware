const mongoose = require("mongoose");
const { Schema } = mongoose;

const impuestoSchema = new mongoose.Schema(
  {
    impuesto: {
      type: Number,
      required: true,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Impuesto", impuestoSchema);;