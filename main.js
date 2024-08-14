const producto = document.getElementById("Productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const Productos =[

        {
            titulo: "Funko Pop Messi",
            imagen: "https://dcdn.mitiendanube.com/stores/001/287/783/products/messi1-2cd773fbdb0b9292a316914023676865-1024-1024.webp",
            precio: 15000,
            
        },

        {
            titulo: "Capa Kamado Tanjirou",
            imagen: "https://m.media-amazon.com/images/I/81CEuMa9pdS._AC_SL1500_.jpg",
            precio: 25000,
         
        },
        {
            titulo: "Bufanda HARRY POTTER - SLYTHERIN",
            imagen: "https://acdn.mitiendanube.com/stores/003/702/378/products/bufanda-harry-potter-slytherin-frase1-465e895b672b0e77de16230257723865-1024-1024.jpg",
            precio: 10000,
         
        },
    
];

const sumadoraAlCarrito = (titulo, precio) => {

    const producto = Carrito.find(el => {
            return el.titulo == titulo
        })
        producto.cantidad += 1
    
    actualizadoraDeCarrito()
}



const restadoraAlCarrito = (titulo, precio) => {
    const producto = Carrito.find(el => {
            return el.titulo == titulo
        })
        if(producto.cantidad <= 1){
            let arrayDetitulos = Carrito.map(el => {
                return el.titulo
            })
           
            let index = arrayDetitulos.indexOf(titulo)
            Carrito.splice(index, 1)
        }else{
            producto.cantidad -= 1
        }    
    actualizadoraDeCarrito()
}



const creadoraDeCardsDeCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const contenedorCantidad = document.createElement("div")
    const cantidadDOM = document.createElement("p")
    const botonPlusDOM = document.createElement("button")
    const botonMinumDOM = document.createElement("button")


    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")


    tituloDOM.innerText = titulo
    precioDOM.innerText = precio    
    cantidadDOM.innerText = cantidad    
    
    botonPlusDOM.innerText = "+"
    botonMinumDOM.innerText = "-"

    botonPlusDOM.addEventListener("click", ()=>{
        sumadoraAlCarrito(titulo)
    })

    botonMinumDOM.addEventListener("click", ()=>{
        restadoraAlCarrito(titulo)
    })



    contenedorCantidad.appendChild(botonMinumDOM)
    contenedorCantidad.appendChild(cantidadDOM)
    contenedorCantidad.appendChild(botonPlusDOM)

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(contenedorCantidad)


    return contenedor
}






const actualizadoraDeCarrito = () => {
    carrito.innerHTML = ""

    const totalDOM = document.createElement("h3")

    const total = Carrito.reduce((acc, el)=>{
        return acc + el.cantidad * el.precio
    },0)
    
    totalDOM.innerText = total

    Carrito.forEach(el =>{
        carrito.appendChild(creadoraDeCardsDeCarrito(el.titulo, el.precio, el.cantidad)) 
        carrito.appendChild(totalDOM) 
    })
    localStorage.setItem("carrito", JSON.stringify(Carrito))
}


const agregadoraAlCarrito = (titulo, precio) => {
    const booleano = Carrito.some(el =>{
        return el.titulo == titulo
    })

    if(booleano){
        const producto = Carrito.find(el => {
            return el.titulo == titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }
    actualizadoraDeCarrito()

}

const creadoraDeCards = (titulo, imagen, precio) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const imagenDOM = document.createElement("img")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    imagenDOM.classList.add("imagen")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "Comprar"
    
    imagenDOM.src = imagen

    botonDOM.addEventListener("click", ()=>{
        agregadoraAlCarrito(titulo, precio)
    })
   
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)


    return contenedor
}



Productos.forEach(el => {
    const productoDOM = creadoraDeCards(el.titulo, el.imagen, el.precio)

    productos.appendChild(productoDOM)
})

document.addEventListener("DOMContentLoaded",()=>{
        actualizadoraDeCarrito()
})