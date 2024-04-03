document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.continue').addEventListener('click', function() {
        var popup = document.getElementById('popup');
        popup.style.display = 'block';
        
        setTimeout(function() {
            popup.style.display = 'none';
        }, 2000); // Ocultar el popup después de 2 segundos
    });
});
