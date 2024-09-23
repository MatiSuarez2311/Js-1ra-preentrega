


const creadoraDeCard = (titulo, precio, imagen) => {
    main.innerHTML += `
        <div>
            <h3>${titulo}</h3>
            <p>${precio}</p>
            <img src="${imagen}" alt="">
            <button>comprar</button>
        </div>`;
};
const llamadoraDeProductos = async()=>{
    let resp = await fetch("./info.json")
    let data = await resp.json()
    data.forEach(el =>{
        creadoraDeCard(el.titulo, el.precio, el.imagen)
    Productos = data; 
    mostrarProductos(Productos);
    })
    
}

llamadoraDeProductos()

const Carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const buscador = document.getElementById("buscador");
const productos = document.getElementById("productos");
const carritoItems = document.getElementById("carritoItems");
const finalizarCompra = document.getElementById("finalizarCompra");


const creadoraDeCards = (titulo, precio, imagen) => {
    const card = document.createElement("div");
    card.className = "producto";

    const imagenDOM = document.createElement("img");
    imagenDOM.src = imagen;
    imagenDOM.alt = titulo;

    const tituloDOM = document.createElement("h3");
    tituloDOM.innerText = titulo;

    const precioDOM = document.createElement("p");
    precioDOM.innerText = `Precio: $${precio}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = "Agregar al carrito";
    botonAgregar.addEventListener("click", () => {
        sumadoraAlCarrito(titulo);
    });

    card.appendChild(imagenDOM);
    card.appendChild(tituloDOM);
    card.appendChild(precioDOM);
    card.appendChild(botonAgregar);

    return card;
};


const sumadoraAlCarrito = (titulo) => {
    const producto = Productos.find(p => p.titulo === titulo);
    const index = Carrito.findIndex(p => p.titulo === titulo);

    if (index > -1) {
        Carrito[index].cantidad += 1;
    } else {
        Carrito.push({...producto, cantidad: 1});
    }
    actualizadoraDeCarrito();
};


const restadoraAlCarrito = (titulo) => {
    const index = Carrito.findIndex(p => p.titulo === titulo);
    if (index > -1) {
        Carrito[index].cantidad -= 1;
        if (Carrito[index].cantidad <= 0) {
            Carrito.splice(index, 1);
        }
        actualizadoraDeCarrito();
    }
};


const creadoraDeCardsDeCarrito = (titulo, precio, cantidad) => {
    const card = document.createElement("div");
    card.className = "carrito-item";

    const tituloDOM = document.createElement("h3");
    tituloDOM.innerText = titulo;

    const precioDOM = document.createElement("p");
    precioDOM.innerText = `Precio: $${precio}`;

    const cantidadDOM = document.createElement("p");
    cantidadDOM.innerText = `Cantidad: ${cantidad}`;

    const botonReducir = document.createElement("button");
    botonReducir.innerText = "Reducir";
    botonReducir.addEventListener("click", () => {
        restadoraAlCarrito(titulo);
    });

    card.appendChild(tituloDOM);
    card.appendChild(precioDOM);
    card.appendChild(cantidadDOM);
    card.appendChild(botonReducir);

    return card;
};


const actualizadoraDeCarrito = () => {
    carritoItems.innerHTML = "";
    Carrito.forEach(item => {
        const card = creadoraDeCardsDeCarrito(item.titulo, item.precio, item.cantidad);
        carritoItems.appendChild(card);
    });
    const totalDOM = document.createElement("h3");
    const total = Carrito.reduce((acc, el) => acc + el.cantidad * el.precio, 0);
    totalDOM.innerText = "Total: $" + total;
    carritoItems.appendChild(totalDOM);
    localStorage.setItem("carrito", JSON.stringify(Carrito));
};


const mostrarProductos = (productosArray) => {
    productos.innerHTML = "";
    productosArray.forEach(el => {
        const productoDOM = creadoraDeCards(el.titulo, el.imagen, el.precio);
        productos.appendChild(productoDOM);
    });
};

buscador.addEventListener("input", () => {
    const termino = buscador.value.toLowerCase();
    const productosFiltrados = Productos.filter(p =>
        p.titulo.toLowerCase().includes(termino)
    );
    mostrarProductos(productosFiltrados);
});


finalizarCompra.addEventListener("click", () => {
    if (Carrito.length > 0) {
        alert(`Gracias por su compra. Total: $${Carrito.reduce((acc, el) => acc + el.cantidad * el.precio, 0)}`);
        Carrito.length = 0; 
        actualizadoraDeCarrito(); 
    } else {
        alert("El carrito está vacío.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(Productos);
    actualizadoraDeCarrito();
});

finalizarCompra.addEventListener("click", () => {
    if (Carrito.length > 0) {
        const total = Carrito.reduce((acc, el) => acc + el.cantidad * el.precio, 0);
        
        Swal.fire({
            title: 'Procesando su compra...',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

       
        fetch('/url-del-servidor', {  // Reemplaza con tu URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: Carrito,
                total: total
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: '¡Gracias por su compra!',
                text: `El total de su compra es $${total}. Pedido confirmado con ID: ${data.orderId}`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                Carrito.length = 0; 
                actualizadoraDeCarrito();
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema procesando su compra. Por favor intente de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });

    } else {
        Swal.fire({
            title: 'El carrito está vacío',
            text: 'Por favor, agregue productos antes de finalizar la compra.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
});