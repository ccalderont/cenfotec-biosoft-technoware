// Obtener referencias a los elementos del DOM
var openPopupButton = document.getElementById('openPopup');
var closePopupButton = document.getElementById('closePopup');
var popup = document.getElementById('popup');

// Mostrar el popup al hacer clic en el botón "Guardar"
openPopupButton.addEventListener('click', function() {
    popup.style.display = 'block';
});

// Ocultar el popup al hacer clic en el botón "Cerrar"
closePopupButton.addEventListener('click', function() {
    popup.style.display = 'none';
});
