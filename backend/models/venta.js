//Import module mongoose
const mongoose = require("mongoose");

/**
 * Import module schema.
 * This allows to link a schema with other schemas in other filesby using the _id
 */
const {Schema} = mongoose;

/**
 * Squema for ventas collection
 * <code>type: Schema.Types.ObjectId</code>allow to link <code>this</code> schema with other schema in any other file.
 * <code>ref</code>link to the specific model in any other file. It is important to use the same name of the model set in the file I need to refer to.
 */
const purchaseSquema = new mongoose.Schema({
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    idTarjeta:{
        type: Schema.Types.ObjectId,
        ref: "Tarjeta",
    },
    precioTotalSinImpuestoAdmin:{
        type: Number,
        required: true,
    },
    precioTotalConImpuestoAdmin:{
        type: Number,
        required: true,
    },
    fecha:{
        type: Date,
        required: true,
    },
    productos:{
        idProducto:{
            type: Schema.Types.ObjectId,
            ref: "Producto",
        },
        idTramo:{
            type: Schema.Types.ObjectId,
            ref: "Tramo",
        },
        cantidad:{
            type: Number,
            required: true,
        },
        precioSinImpuesto:{
            type: Number,
            required: true,
        },
        precioConImpuesto:{
            type: Number,
            required: true,
        }
    }
},
{
    timestamps: true,
});

/**
 * Set the model for the schema. 
 * <code>module.exports</code> enable <code>this</code> model to be used in any other file
 * "Venta", name of the model
 * <code>purchaseSquema</code>, schema use for this model 
 * 
 * @see purchaseSquema, 
 */
module.exports = mongoose.model("Venta", purchaseSquema);