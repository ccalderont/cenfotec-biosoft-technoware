const nodemailer = require('nodemailer');
const tramo = require('../models/tramo');


const correoOrigen = "cnp.feriaenlinea@gmail.com";

const smtpOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: correoOrigen,
    pass: process.env.EMAIL_PASSWORD,
  },
};

exports.sendApprovedStoreEmail = (tramo) => {
    const datosCorreo = {
        subject: "¡Tu tramo ha sido aprobado!",
        correoUsuario: tramo.usuario.email,
        html: `
        <h1>¡Felicidades!</h1>
        <p>Tu tramo ha sido aprobado y ya está disponible en la feria en línea.</p>
        <p>Sigue estas instrucciones para ingresar a tu cuenta:</p>
        <ol>
            <li>Ingresa a la página de la <a href="${process.env.HOST}/">feria en línea</a>.</li>
            <li>Ingresa los siguientes credenciales:</li>
            <ul>
                <li><strong>Número de identificación</strong>: El número de identificación registrado</li>
                <li><strong>Contraseña</strong>: ${tramo.usuario.password}</li>
            </li>Una vez que hayas ingresado, puedes ir a tu perfil en la parte superior derecha para cambiar tu contraseña.</li>
            <li>Entra a la sección de <strong>Mi tramo</strong> puedes manejar todo lo relacionado a tu tienda.</li>
        </ol>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };

    sendEmail(datosCorreo);
}

exports.sendRejectedStoreEmail = (tramo, razon) =>{
    const datosCorreo = {
        subject: "Tu tramo ha sido rechazado",
        correoUsuario: tramo.usuario.email,
        html: `
        <h1>Lo sentimos</h1>
        <p>Tu tramo ha sido rechazado por el administrador por la siguiente razón:</p>
        <br>
        <p><strong>${razon}</strong></p>
        <br>
        <p>Si tienes alguna duda, por favor contáctanos a través de este correo.</p>
        <p>Si deseas volver a registrar tu usuario y tramo, puedes hacerlo en cualquier momento <a href="${process.env.HOST}/RegistroVendedor">aquí</a></p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };

    sendEmail(datosCorreo);

}

exports.sendApprovedProductEmail = (producto, usuario) => {
    const datosCorreo = {
        subject: "¡Tu producto ha sido aprobado!",
        correoUsuario: usuario.email,
        html: `
        <h1>¡Felicidades!</h1>
        <p>Tu producto <strong>${producto.nombre}</strong> ha sido aprobado y ya está disponible en la feria en línea.</p>
        <p>Si deseas ver tu producto, puedes hacerlo en la sección de <strong>Mis productos</strong> en tu perfil.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };

    sendEmail(datosCorreo);
}

exports.sendRejectedProductEmail = (producto, usuario, razon) => {
    const datosCorreo = {
        subject: "Tu producto ha sido rechazado",
        correoUsuario: usuario.email,
        html: `
        <h1>Lo sentimos</h1>
        <p>Tu producto <strong>${producto.nombre}</strong> ha sido rechazado por el administrador por la siguiente razón:</p>
        <br>
        <p><strong>${razon}</strong></p>
        <br>
        <p>Si deseas volver a registrar tu producto, puedes hacerlo en cualquier momento desde tu usuario</p>
        <p>Si tienes alguna duda, por favor contáctanos a través de este correo.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };

    sendEmail(datosCorreo);
}

exports.sendProductStatusChangeEmail = (producto, usuario, razon) => {
    const datosCorreo = {
        subject: "¡El estado de tu producto ha cambiado!",
        correoUsuario: usuario.email,
        html: `
        <h1>¡Atención!</h1>
        <p>El estado de tu producto <strong>${producto.nombre}</strong> ha cambiado a <strong>${producto.estado.charAt(0).toUpperCase() + producto.estado.slice(1)}</strong> por la siguiente razón:</p>
        <br>
        <p><strong>${razon}</strong></p>
        <br>
        <p>Si tienes alguna duda, por favor contáctanos a través de este correo.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };

    sendEmail(datosCorreo);
}

exports.sendUserStatusChangeEmail = (usuario, razon) => {
    const datosCorreo = {
        subject: "¡El estado de tu cuenta ha cambiado!",
        correoUsuario: usuario.email,
        html: `
        <h1>¡Atención!</h1>
        <p>El estado de tu cuenta ha cambiado a <strong>${usuario.estado.charAt(0).toUpperCase() + usuario.estado.slice(1)}</strong> por la siguiente razón:</p>
        <br>
        <p><strong>${razon}</strong></p>
        <br>
        <p>Si tienes alguna duda, por favor contáctanos a través de este correo.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };
    sendEmail(datosCorreo);
}

exports.sendPasswordResetEmail = (usuario, newPassword) => {
    const datosCorreo = {
        subject: "¡Tu contraseña ha sido restablecida!",
        correoUsuario: usuario.email,
        html: `
        <h1>¡Atención!</h1>
        <p>Tu contraseña ha sido restablecida a la siguiente:</p>
        <br>
        <p><strong>${newPassword}</strong></p>
        <br>
        <p>Por favor, ingresa a tu perfil en la página de la feria en línea para cambiar tu contraseña.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };
    sendEmail(datosCorreo);
}

exports.sendInactiveUserEmail = (usuario) => {
    const datosCorreo = {
        subject: "¡Tu cuenta ha sido desactivada!",
        correoUsuario: usuario.email,
        html: `
        <h1>¡Atención!</h1>
        <p>Tu cuenta ha sido desactivada por el administrador.</p>
        <br>
        <p>Si tienes alguna duda, por favor contáctanos a través de este correo.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };
    sendEmail(datosCorreo);
}

exports.sendPendingUserEmail = (usuario) => {
    const datosCorreo = {
        subject: "¡Tu cuenta está pendiente de aprobación!",
        correoUsuario: usuario.email,
        html: `
        <h1>¡Atención!</h1>
        <p>Tu cuenta está pendiente de aprobación por el administrador.</p>
        <br>
        <p>Recibirás un correo cuando tu cuenta haya sido aprobada.</p>
        <br>
        <p>¡Gracias por confiar en el CNP!</p>
        `,
    };
    sendEmail(datosCorreo);
}


async function sendEmail(datosCorreo) {
    console.log("Enviando correo", datosCorreo);

    const transporter = nodemailer.createTransport(smtpOptions);

    try {
        await transporter.sendMail({
        from: correoOrigen,
        subject: datosCorreo.subject,
        to: datosCorreo.correoUsuario,
        html: datosCorreo.html,
        });
    } catch (error) {
        console.error("Error al enviar correo", error);
    }
}
