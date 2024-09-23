
const Productos = [
    {
        titulo: "Bufanda HARRY POTTER - SLYTHERIN",
        imagen: "https://acdn.mitiendanube.com/stores/003/702/378/products/bufanda-harry-potter-slytherin-frase1-465e895b672b0e77de16230257723865-1024-1024.jpg",
        precio: 10000,
    },
    {
        titulo: "Bufanda HARRY POTTER - GRYFFINDOR",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_804812-MLU75501871277_032024-O.webp",
        precio: 10000,
    },
    {
        titulo: "Bufanda HARRY POTTER - REEVENCLAW",
        imagen: "https://acdn.mitiendanube.com/stores/907/020/products/1024x1024_bufanda-ravenclaw-escrita-1-harry-potter-abracadabra-juguetes1-db7174168fe996f46a15908565250660-640-0.jpg",
        precio: 10000,
    },
    {
        titulo: "Bufanda HARRY POTTER - HUFFLEPUFF",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_745764-MLA43462845079_092020-O.webp",
        precio: 10000,
    },
    {
        titulo: "Funko Pop POKEMON - MEWTWO",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_641293-MLM43571955301_092020-O.webp",
        precio: 9000,
    },
    {
        titulo: "Funko Pop DRAGONBALLZ - VEGETA",
        imagen: "https://dcdn.mitiendanube.com/stores/113/368/products/vegetared1-6527d00915478ef60416096323644724-640-0.png",
        precio: 15000,
    },
    {
        titulo: "Funko Pop STAN LEE",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_836818-MLA43484752357_092020-O.webp",
        precio: 15000,
    },
    {
        titulo: "Funko Pop RICK & MORTY - KING OF $#!+",
        imagen: "https://images.stockx.com/images/Funko-Pop-Animation-Rick-Morty-King-of-with-Sound-Figure-694.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1649962855",
        precio: 20000,
    },
]

const Carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const buscador = document.getElementById("buscador");
const productos = document.getElementById("productos");
const carritoItems = document.getElementById("carritoItems");
const finalizarCompra = document.getElementById("finalizarCompra");


const creadoraDeCards = (titulo, imagen, precio) => {
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

        // Envío de los datos del carrito a una API
        fetch('https://api.example.com/checkout', { // URL de la API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: Carrito,    // Detalles del carrito
                total: total       // Total de la compra
            })
        })
        .then(response => response.json())
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