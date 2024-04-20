const mongoose = require("mongoose");
const { Schema } = mongoose;

const cantonSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    provincia: {
        type: Schema.Types.ObjectId,
        ref: "Provincia",
        required: true,
    } 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Canton", cantonSchema);;