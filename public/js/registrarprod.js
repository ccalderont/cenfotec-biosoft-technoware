


   async function validarFormulario() {
        var productName = document.getElementById('name').value;

        var category = document.getElementById('category').value;
        var price = document.getElementById('price').value;
        var tax = document.getElementById('tax').value;
        var foto_producto = document.getElementById('foto_producto').src;


     

        if (productName.trim() !== '' && price.trim() !== '' && tax.trim() !== '' && foto_producto.trim() !== '') {
          const message = await registrarProducto ()  
          if (message !== "Producto agregado exitosamente") { 
          alert ("Hubo un problema al registrar el producto.")
        } else {alert('¡Producto registrado exitosamente! Recibirá un correo cuando el producto sea aceptado por el administrador.')
      window.location="/catalogo"
      }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    }

    async function registrarProducto () {
      var productName = document.getElementById('name').value;
      var description = document.getElementById('description').value;
      var category = document.getElementById('category').value;
      var price = document.getElementById('price').value;
      var unit = document.getElementById('unit').value;
      var tax = document.getElementById('tax').value;
      var foto_producto = document.getElementById('foto_producto').src;
      const response = await fetch("/vendedor/registrarProducto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: productName,
          categ: category,
          price: price,
          tax: tax,
          foto_producto: foto_producto,
          description: description,
          unit: unit,
          usuario: localStorage.getItem('idUsuario')
        }),
      });
      const data = await response.json();
      return data.message


    }



    async function setCategories(){
      const categories = await getCategories();
      const categoriesSelect = document.getElementById("category");
      categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category._id;
          option.text = category.nombre;
          categoriesSelect.appendChild(option);
      });
  }
  
  async function getCategories(){
      const response = await fetch('/getActiveCategories', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const data = await response.json();
      return data.categorias;
  }

  async function loadPage () {
    await setCategories ()
  }



    const boton = document.getElementById("user-picture");
let fotoProducto = "";
let cloudinaryWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dy0ldxijc",
    uploadPreset: "cenfo_test",
  },
  function (error, result) {
    if (!error && result && result.event === "success") {
      fotoProducto = result.info.url;
      document.getElementById("foto_producto").src = fotoProducto;
    }
  }
);

function subirImagen() {
  cloudinaryWidget.open();
}


function subirImagen() {
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'dy0ldxijc',
        uploadPreset: 'cenfo_test'
    }, (error, result) => { 
        if (!error && result && result.event === "success") { 
            // Actualizar el fondo con la URL de la imagen cargada
            document.getElementById('foto_producto').src =  result.info.secure_url;
        }
    });
    myWidget.open();  // Abrir el widget de carga de Cloudinary
}

loadPage ()