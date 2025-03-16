document.addEventListener("DOMContentLoaded", function() {
    let nombreUsuario = localStorage.getItem("nombreUsuario");

    if (nombreUsuario) {
        // Mostrar el menú de usuario
        document.getElementById("usuario-menu").style.display = "flex";
        
        // Mostrar el nombre del usuario en el menú desplegable
        document.getElementById("nombre-usuario").innerText = nombreUsuario;
        
        // Ocultar el botón de Suscribirse
        document.getElementById("btn-suscribirse").style.display = "none";
    }

    // Toggle del menú de usuario
    document.getElementById("icono-usuario").addEventListener("click", function(event) {
        event.stopPropagation(); // Evita que se cierre inmediatamente
        let menu = document.getElementById("dropdown-usuario");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Cerrar el menú de usuario al hacer clic fuera
    document.addEventListener("click", function(event) {
        let menu = document.getElementById("dropdown-usuario");
        if (menu.style.display === "block" && !event.target.closest(".usuario-menu")) {
            menu.style.display = "none";
        }
    });
});

// Función para cerrar la sesión
function cerrarSesion() {
    // Eliminar los datos del usuario del localStorage
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("passwordUsuario");

    // Ocultar el menú de usuario
    document.getElementById("usuario-menu").style.display = "none";
    
    // Mostrar el botón de Suscribirse
    document.getElementById("btn-suscribirse").style.display = "block";

    alert("Sesión cerrada. ¡Hasta pronto!");
    window.location.href = "index.html"; // Recargar la página
}


