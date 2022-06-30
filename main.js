class Car {
    constructor (id, carModel, dayprice){
        this.id = parseInt(id);
        this.name = carModel;
        this.dayprice = parseInt(dayprice);
    }
}

const arrayCars = [];
arrayCars.push(new Car (nextIndexOf(arrayCars),"etios", 2000));
arrayCars.push(new Car (nextIndexOf(arrayCars),"corolla", 3000));
arrayCars.push(new Car (nextIndexOf(arrayCars),"hilux", 4000)); 

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
let keepBuying; 

do {
let reserveThis;
let modelInput = prompt("Que modelo desea reservar?");

if (modelInput && isNaN(modelInput)){
    modelInput = modelInput.toLowerCase();
    reserveThis = arrayCars.find(model => model.name === modelInput);
} else {
    alert('No encontramos el modelo solicitado');
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
    console.log(total);
    arrayReservations.push(new Reservation (nextIndexOf(arrayReservations), name, quantityInput, daysInput, dayprice, total));
    sum('total');

} else {
    alert('Algo salio mal');
}

keepBuying = confirm('Quiere seguir comprando?')

} while(keepBuying);

function nextIndexOf(array) {
    return array.length +1;
};

function sum (key){
    let finaltotal = arrayReservations.reduce((a, b) => a + b[key], 0);
    console.log(finaltotal);
}

console.log(arrayReservations);

