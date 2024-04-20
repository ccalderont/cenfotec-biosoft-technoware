const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    cedula: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tipoUsuario: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
    },
    permisos: {
        type: String,
    },
    tramo: {
        type: Schema.Types.ObjectId,
        ref: "Tramo",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);;