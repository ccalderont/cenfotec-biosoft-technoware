const mongoose = require("mongoose");

const tramoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    calificacion: {
      type: Number,
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    descripcion: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tramo", tramoSchema);
