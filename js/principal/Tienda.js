 // Verificar si el usuario está registrado al cargar la página
 document.addEventListener("DOMContentLoaded", function() {
    let nombreUsuario = localStorage.getItem("nombreUsuario");

    if (!nombreUsuario) {
        // Si el usuario no está registrado, mostrar una alerta con SweetAlert2
        Swal.fire({
            title: "Acceso restringido",
            text: "Por favor, regístrate o inicia sesión para realizar tus compras.",
            icon: "warning",
            confirmButtonText: "Registrarse",
            showCancelButton: true,
            cancelButtonText: "Iniciar sesión"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "registro.html"; // Redirigir a registro
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                window.location.href = "login.html"; // Redirigir a inicio de sesión
            }
        });
    }
});

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

    let total = 0;

    carrito.forEach((producto, index) => {
        listaCarrito.innerHTML += `<li>${producto.nombre} - $${producto.precio.toLocaleString()} 
            <button onclick="eliminarDelCarrito(${index})">❌</button></li>`;
        total += producto.precio;
    });

    document.getElementById("total-carrito").innerText = `$${total.toLocaleString('es-CO')} COP`;
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

// Finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            title: "Carrito vacío",
            text: "No hay productos en el carrito.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    Swal.fire({
        title: "¿Finalizar compra?",
        text: "¿Estás seguro de que deseas finalizar la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, finalizar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Compra finalizada",
                text: "Gracias por tu compra.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            vaciarCarrito();
        }
    });
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