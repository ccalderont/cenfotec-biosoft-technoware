const mongoose = require("mongoose");
const { Schema } = mongoose;

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precioBruto: {
      type: Number,
      required: true,
    },
    cantidadDisponible: {
      type: Number,
      required: true,
    },
    unidadMedida: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    calificacion:{
      type: Number,
      required: false,
    },
    tramo: {
      type: Schema.Types.ObjectId,
      ref: "Tramo",
      required: true,
    },
    impuesto: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Producto", productoSchema);