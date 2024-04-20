const mongoose = require("mongoose");
const { Schema } = mongoose;

const distritoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    canton: {
        type: Schema.Types.ObjectId,
        ref: "Canton",
        required: true,
    } 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Distrito", distritoSchema);;