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
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    tarjeta:{
        type: Schema.Types.ObjectId,
        ref: "Tarjeta",
    },
    precioTotalSinImpuestoAdmin:{
        type: Number,
    },
    precioTotalConImpuestoAdmin:{
        type: Number,
    },
    fecha:{
        type: Date,
    },
    estado:{
        type: String,
        required: true,
    },
    productos:[{
        producto:{
            type: Schema.Types.ObjectId,
            ref: "Producto",
        },
        tramo:{
            type: Schema.Types.ObjectId,
            ref: "Tramo",
        },
        cantidad:{
            type: Number,
            required: true,
        },
        precioSinImpuestoAdmin:{
            type: Number,
            required: true,
        },
        precioConImpuestoAdmin:{
            type: Number,
            required: true,
        },
        resena:{
            type: Schema.Types.ObjectId,
            ref: "Resena",
        }
    }]
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