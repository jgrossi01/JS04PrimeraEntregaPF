class Car {
    constructor (id, carModel, dayprice){
        this.id = parseInt(id);
        this.name = carModel;
        this.dayprice = parseInt(dayprice);
    }
}

const arrayCars = [];
arrayCars.push(new Car (nextIndexOf(arrayCars),"Etios", 2000));
arrayCars.push(new Car (nextIndexOf(arrayCars),"Corolla", 3000));
arrayCars.push(new Car (nextIndexOf(arrayCars),"Hilux", 4000)); 

console.log(arrayCars);

class Reservation {
    constructor (id, carname, quantity, rentedDays, dayPrice, total){
        this.id = parseInt(id);
        this.carname = carname;
        this.quantity = parseInt(quantity);
        this.renteddays = parseInt(rentedDays);
        this.dayprice = Number(dayPrice);
        this.total = Number(total); 
    }
}

const arrayReservations = [];
let keepBuying = true; 

do {
    let reserveThis;
    let modelInput = prompt("Que modelo desea reservar? Podemos ofrecerle los siguientes:\n" + availableCars());

    if (modelInput){
        modelInput = modelInput.toLowerCase();
        reserveThis = arrayCars.find(model => model.name.toLowerCase() === modelInput);
        while(!reserveThis && keepBuying) {
            keepBuying = confirm('No encontramos el modelo solicitado. Desea seguir comprando?')
            if(keepBuying){
                modelInput = prompt("Que modelo desea reservar?");
                modelInput = modelInput.toLowerCase();
                reserveThis = arrayCars.find(model => model.name.toLowerCase() === modelInput);
            } else {
                break;
            }
        }
    }

    let quantityInput;
    if(reserveThis){
        quantityInput = prompt(`Cuantos ${modelInput} precisa reservar?`);
        while (!quantityInput || isNaN(quantityInput) || quantityInput < 1){
            quantityInput = prompt(`Ingrese un número válido. Cuantos ${modelInput} precisa reservar?`);
        } 
    } else {
        break;
    }

    let daysInput;
    if(quantityInput){
        daysInput = prompt(`Por cuantos días precisa los ${quantityInput} ${modelInput}?`);
        while (!daysInput || isNaN(daysInput) || daysInput < 1){
            daysInput = prompt(`Ingrese un número válido. Por cuantos días precisa los ${quantityInput} ${modelInput}?`);
        } 
    } else {
        break;
    }

    if(reserveThis && quantityInput && daysInput) {
        
        let name = reserveThis.name;
        let dayprice = reserveThis.dayprice;
        let total = Number(reserveThis.dayprice) * daysInput * quantityInput;
        saveThis(name, quantityInput, daysInput, dayprice, total);   

    } else {
        alert('Algo salio mal');
    }

    keepBuying = confirm('Quiere seguir comprando?')
} while(keepBuying);


let tieneCupon;
let errorCupon;
let devolucionCupon;
let totalDescuento;
let finalqty;
let finaltotal;



if (arrayReservations.length > 0){
    finalqty = arrayReservations.reduce((a, b) => a + b['quantity'], 0);
    finaltotal = arrayReservations.reduce((a, b) => a + b['total'], 0);

    tieneCupon = confirm("Tiene un cupón de descuento?");
    while (tieneCupon) {
        if (errorCupon) {
          tieneCupon = confirm("No encontramos el cupón. Desea volver a intentar?");
          if (tieneCupon) {
            codigoCupon = prompt(`Ingrese su cupón`);
          }
        } else {
          codigoCupon = prompt(`Ingrese su cupón`);
        }

        if (codigoCupon) {
          devolucionCupon = aplicarCupon(codigoCupon.toLowerCase());
        }
    }
    
    console.log('Reservó correctamente '+ finalqty +' vehiculos por un total de $'+ finaltotal);
    if(devolucionCupon) {
        console.log(devolucionCupon);
    }
} else {
    console.log('No realizó ninguna reserva.')
}

console.log(arrayReservations);

function nextIndexOf(array) {
    return array.length +1;
};

function availableCars() {
    return arrayCars.map(u => u.name).join(`\n`);
}

function saveThis(name, quantityInput, daysInput, dayprice, total){
    let id = nextIndexOf(arrayReservations);
    arrayReservations.push(new Reservation (id, name, quantityInput, daysInput, dayprice, total));
    console.log('Se agregó a tu carrito '+ quantityInput +' '+ name +' por '+ daysInput +' días. Total parcial: $'+ total);
}

function aplicarCupon(codigoCupon) {
    switch (codigoCupon) {
      case "bariloche":
        totalDescuento = finaltotal - Number(finaltotal) * 0.1;
        tieneCupon = false;
        return `Se le aplicó el descuento "bariloche" del 10% sobre $${finaltotal}.</br>Su monto a pagar es de $${totalDescuento}`;
      case "rentit2022":
        totalDescuento = finaltotal - Number(finaltotal) * 0.15;
        tieneCupon = false;
        return `Se le aplicó el descuento "rentit" del 15% sobre $${finaltotal}.</br>Su monto a pagar es de $${totalDescuento}`;
      default:
        errorCupon = true;
        return false;
    }
}
