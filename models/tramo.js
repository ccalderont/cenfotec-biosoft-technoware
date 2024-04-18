const mongoose = require("mongoose");
const { Schema } = mongoose;

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
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tramo", tramoSchema);;