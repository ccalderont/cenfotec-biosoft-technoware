const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    tipoIdent: {
      type: String,
    },
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
    },
    foto: {
      type: String,
    },
    permisos: {
      type: String,
    },
    tramo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tramo",
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
