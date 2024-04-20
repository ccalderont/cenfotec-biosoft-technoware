const mongoose = require("mongoose");
const { Schema } = mongoose;

const provinciaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Provincia", provinciaSchema);;