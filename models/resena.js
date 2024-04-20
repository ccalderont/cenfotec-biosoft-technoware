const mongoose = require("mongoose");
const { Schema } = mongoose;

const resenaSchema = new mongoose.Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },

        tramo: {
            type: Schema.Types.ObjectId,
            ref: "Tramo",
            required: true,
        },
        producto: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: true,
        },
        comentario: {
            type: String,
            required: true,
        },
        calificacion: {
            type: Number,
            required: true,
        },
    })

module.exports = mongoose.model("Resena", resenaSchema);