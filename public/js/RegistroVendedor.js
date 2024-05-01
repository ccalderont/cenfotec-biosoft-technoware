//Para Mongo
async function createaccount() {
  const vendorPict = document.getElementById("foto_perfil").src;
  const vendorIdtype = document.getElementById("id-type").value;
  const vendorIdnumber = document.getElementById("id-number").value;
  const vendorName = document.getElementById("first-name").value;
  const vendorLastname = document.getElementById("last-name1").value;
  const vendorPhone = document.getElementById("phone-number").value;
  const vendorEmail = document.getElementById("e-mail").value;
  const storeName = document.getElementById("store-name").value;
  const storeDesc = document.getElementById("store-description").value;
  const storeLocation = document.getElementById("location").value;
  const storePermit = document.getElementById("gov-permit-input").value;

  const response = await fetch("/registroVendedor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      foto: vendorPict,
      tipoId: vendorIdtype,
      numeroId: vendorIdnumber,
      nombre: vendorName,
      apellido: vendorLastname,
      telefono: vendorPhone,
      correo: vendorEmail,
      tramo: storeName,
      descripcion: storeDesc,
      ubicacion: storeLocation,
      permisos: storePermit,
    }),
  });
  const data = await response.json();
  if (data.message !== "Solicitud de vendedor enviada exitosamente") {
    alert("Hubo un error al enviar la solicitud de usuario");
    return false;
  }
  return true;
}

async function submitForm() {
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
    displayErrorMessage(lastName1, "Por favor, ingrese su primer apellido.");
  }

  // Validacion del numero de telefono
  const phoneNumber = form.querySelector("#phone-number");
  const phoneNumberRegex = /^\d{8}$/; // Assuming 8-digit phone numbers
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

  //Validacion del nombre del tramo
  const storeName = form.querySelector("#store-name");
  if (storeName.value.trim() === "") {
    displayErrorMessage(storeName, "Por favor, ingrese el nombre del tramo.");
  }

  //Validacion de descripcion del tramo
  const storeDescription = form.querySelector("#store-description");
  if (storeDescription.value.trim() === "") {
    displayErrorMessage(
      storeDescription,
      "Por favor, ingrese una breve descripción del tramo."
    );
  }

  //Validacion de la ubicacion del tramo
  const storeLocation = form.querySelector("#location");
  if (storeLocation.value.trim() === "") {
    displayErrorMessage(
      storeLocation,
      "Por favor, ingrese la ubicación del tramo."
    );
  }

  //   //Validacion del documento de permisos municipales
  const permitFile = form.querySelector("#gov-permit");
  if (storeLocation.value.trim() === "") {
    displayErrorMessage(storeLocation, "Por favor, agregue un archivo.");
  }

  // Validacion de terminos y condiciones
  const termsConditions = form.querySelector("#terms-conditions");
  if (!termsConditions.checked) {
    displayErrorMessage(
      termsConditions,
      "Debe aceptar los términos y condiciones."
    );
  }

  // Si no hay errores, mandar el form y mostrar modal
  if (form.querySelectorAll(".error-message").length === 0) {
    const accountCreated = await createaccount();
    if (accountCreated) {
      showModal();
    }
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
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-btn");

  if (event.target === modal || event.target === closeButton) {
    modal.style.display = "none";
    window.location = "/login";
  }
}

//Cloudinary para foto
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

//Cloudinary para permisos

const boton2 = document.getElementById("gov-permit");
let govPermit = "";
let cloudinaryWidget2 = cloudinary.createUploadWidget(
  {
    cloudName: "dy0ldxijc",
    uploadPreset: "cenfo_test",
    resourceType: "auto",
    allowedFormats: ["pdf"],
  },
  function (error, result) {
    if (!error && result && result.event === "success") {
      govPermit = result.info.url;
      document.getElementById("gov-permit-input").value = govPermit;
    }
  }
);

function subirArchivo() {
  cloudinaryWidget2.open();
}
