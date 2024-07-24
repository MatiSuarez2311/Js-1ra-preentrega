
console.log("a" == "a")
    const nombreUser = prompt("¿Cuál es tu ID?")
    const nombrePass = prompt("¿Cuál es tu contraseña?")

 if(nombrePass !="" && nombreUser != ""){
     alert("Podes pasar")
 }else{
     alert("Id o Contraseña incorrecto")
 }

  let edad = parseInt(prompt("¿Cuántos años tenes?"))
  if (edad >=18){
      alert("Puede pasar!")
  } else{
      alert("Necesitas la supervision de un Adulto")
  }

  let pasa = confirm("¿Quieres entrar a nuestra tienda?")
  if (pasa === true){
      alert("Bienvenido")
  } else{
      alert("Oh que lastima")
    
      const producto = parseInt(prompt("¿Queres cigarrilos? (1) o ¿QUeres gaseosas? o ¿Queres Productos para el hogar?"))
      
      if(producto ===1){
        alert("Tenemos variedad en marcas")
    } else if (producto === 2){
        alert("Tenemos solo marca Coca-Cola")
    } else if (producto === 3){
        alert("Nos esta quedado algunos productos")
    } else{
        alert("No reconocemos ese producto")
    } 
  
    let bandera = true
    let totalcompra = 0

    const logicaDeCompra = (valor , cantidad) =>{
        totalCompra += valor * cantidad
    }


    while(bandera){
        alert("Que desea comprar:\n 1-Cigarrilo Master \n 2-Gaseosa Coca cola 500ml \n 3-Esponja cocina")
    let opcionElegida = parseInt(prompt(""))
       
    switch (opcionElegida) {
        case 1:  
        let cantidad1 = parseInt(prompt("¿Cuantos deseas comprar?"))
        logicaDeCompra(1500)        
            break;
        case 2:
            let cantidad2 = parseInt(prompt("¿Cuantos deseas comprar?"))
            logicaDeCompra(1100)
            break;
        case 3:
            let cantidad3 = parseInt(prompt("¿Cuantos deseas comprar?"))
            logicaDeCompra(500)
            break;    
        default:
            alert("No tenemos por el momento")
            break;
    }
    if(totalcompra !== 0){

    }
    alert("El subtotal es: " + totalcompra)
        bandera = confirm("¿Desea continuar comprando?")
    }

alert("El total de la compra es: " + totalcompra)

 

