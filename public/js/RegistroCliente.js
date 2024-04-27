function submitForm() {
  const form = document.getElementById("signin-form");

  // Resetear errores
  const errorMessages = form.querySelectorAll(".error-message");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.remove();
  });

  // Validacion de identificacion
  const idNumber = form.querySelector("#id-number");
  if (idNumber.value.trim() === "") {
    displayErrorMessage(
      idNumber,
      "Por favor, ingrese el número de identificación."
    );
  } else if (idNumber.value.trim() < 9) {
    displayErrorMessage(
      idNumber,
      "El número de identificación debe tener al menos 9 dígitos."
    );
  }

  // Validacion del nombre
  const firstName = form.querySelector("#first-name");
  if (firstName.value.trim() === "") {
    displayErrorMessage(firstName, "Por favor, ingrese su nombre.");
  }

  // Validacion del apellido
  const lastName1 = form.querySelector("#last-name1");
  if (lastName1.value.trim() === "") {
    displayErrorMessage(lastName1, "Por favor, ingrese al menos un apellido.");
  }

  // Validacion del numero de telefono
  const phoneNumber = form.querySelector("#phone-number");
  const phoneNumberRegex = /^\d{8}$/; // Numero de telefono de 8 digitos.
  if (!phoneNumberRegex.test(phoneNumber.value.trim())) {
    displayErrorMessage(
      phoneNumber,
      "Por favor, ingrese un número de teléfono válido."
    );
  }

  // Validacion del correo
  const email = form.querySelector("#e-mail");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    displayErrorMessage(
      email,
      "Por favor, ingrese un correo electrónico válido."
    );
  }

  // Validacion de contraseña y confirmacion
  const passwordMain = form.querySelector("#password-main");
  const passwordConfirmation = form.querySelector("#password-confirmation");

  // Regex para vocales
  const vowelRegex = /[aeiouAEIOU]/;

  if (passwordMain.value.trim() === "") {
    displayErrorMessage(passwordMain, "Por favor, ingrese una contraseña.");
  } else if (vowelRegex.test(passwordMain.value)) {
    displayErrorMessage(
      passwordMain,
      "La contraseña no debe contener vocales."
    );
  } else if (passwordMain.value !== passwordConfirmation.value) {
    displayErrorMessage(passwordConfirmation, "Las contraseñas no coinciden.");
  }

  // Validacion del criterio de la contraseña
  const passwordMainRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{};:,<.>])(?![aeiouAEIOU]).{8,}$/;
  if (!passwordMainRegex.test(passwordMain.value.trim())) {
    displayErrorMessage(
      passwordMain,
      "Verifique el criterio para la creación de contraseña."
    );
  }

  // Validacion de terminos y condiciones
  const termsConditions = form.querySelector("#terms-conditions");
  if (!termsConditions.checked) {
    displayErrorMessage(
      termsConditions,
      "Debe aceptar los términos y condiciones."
    );
  }

  // Cuando si no hay errores, mandar el form
  if (form.querySelectorAll(".error-message").length === 0) {
    showModal();
  }
}

// Funcion para errores
function displayErrorMessage(inputElement, message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  inputElement.parentNode.appendChild(errorElement);
}

//funcion para borrar error en campos no requeridos
function clearErrorMessage(inputElement) {
  const errorElement =
    inputElement.parentElement.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }
}

//Funcion para el modal
function showModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal(event) {
  if (event.target.id === "modal") {
    window.location = "/login";
  }
}

function showPassword() {
  var x = document.getElementById("password-main");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const boton = document.getElementById("user-picture");
let fotoPerfil = "";
let cloudinaryWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dy0ldxijc",
    uploadPreset: "cenfo_test",
  },
  function (error, result) {
    if (!error && result && result.event === "success") {
      fotoPerfil = result.info.url;
      document.getElementById("foto_perfil").src = fotoPerfil;
    }
  }
);

function subirImagen() {
  cloudinaryWidget.open();
}
