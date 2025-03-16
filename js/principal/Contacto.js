document.getElementById("formulario-contacto").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario
    
    // Muestra la alerta con SweetAlert
    Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.",
        icon: "success",
        confirmButtonColor: "#6b8e23", // Verde oliva
        confirmButtonText: "OK"
    });

    // Opcional: Limpiar el formulario después de enviar
    this.reset();
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
