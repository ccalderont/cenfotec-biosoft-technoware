const mongoose = require("mongoose");

const tarjetaSchema = new mongoose.Schema(
    {
        tarjetaHabiente: {
            type: String,
            required: true,
        },

        numeroTarjeta: {
            type: String,
            required: true,
        },
        mesExpiracion: {
            type: Number,
            required: true,
        },
        annoExpiracion: {
            type: Number,
            required: true,
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
    })

module.exports = mongoose.model("Tarjeta", tarjetaSchema);