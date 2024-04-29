const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    activo:{
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categoria", categoriaSchema);;