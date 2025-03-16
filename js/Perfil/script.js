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


let carrito = [];

// Cargar carrito desde localStorage al iniciar
document.addEventListener("DOMContentLoaded", () => {
    cargarCarritoDesdeLocalStorage();

    document.querySelectorAll(".btn-agregar").forEach((boton, index) => {
        boton.addEventListener("click", () => agregarAlCarrito(index));
    });

    document.getElementById("icono-carrito").addEventListener("click", toggleCarrito);
});

// Agregar producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index];
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Actualizar visualmente el carrito
function actualizarCarrito() {
    document.getElementById("contador-carrito").innerText = carrito.length;
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        listaCarrito.innerHTML += `<li>${producto.nombre} - $${producto.precio.toLocaleString()} 
            <button onclick="eliminarDelCarrito(${index})">❌</button></li>`;
    });
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Mostrar/Ocultar carrito
function toggleCarrito() {
    const carritoDropdown = document.getElementById("carrito-dropdown");
    carritoDropdown.style.display = carritoDropdown.style.display === "block" ? "none" : "block";
}
