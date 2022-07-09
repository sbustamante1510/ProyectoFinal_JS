//Simulador de prestamos
//Nota: Se usara un interes simple

const prestamos = []

const cantidad = document.getElementById("cantidad");
const plazo = document.getElementById("plazo");
const tasa = document.getElementById("tasa");
const btnSimulador = document.getElementById("btnSimulador");
const btnPrestamos = document.getElementById("btn_prestamos");
const container_prestamos = document.getElementById("container_prestamos");
let tempAnadirPrestamoDisplay = 0;

const calculoValorCuota = (prestamox,tiempoMesesx,tasax) => {
    prestamox = Number(prestamox);
    tiempoMesesx = Number(tiempoMesesx);
    tasax = Number(tasax);
    conversionTiempoPorcentaje = 1200;

    let interes = (prestamox * tiempoMesesx * tasax)/(conversionTiempoPorcentaje); 
    let montoTotal = prestamox + interes;
    let valorCuotax = montoTotal/tiempoMesesx;

    return valorCuotax.toFixed(2);
}

const anhadirPrestamo = () => {
    if(cantidad.value > 0 && plazo.value>0 && tasa.value>0){
        prestamos.push({cantidadPrestamo : cantidad.value, 
                        plazoPrestamos : plazo.value,
                        tasaPrestamos : tasa.value,
                        valorCuotaMes : calculoValorCuota(cantidad.value,plazo.value,tasa.value)
                        });
        
        tempAnadirPrestamoDisplay = 1;
    }

    cantidad.value = "";
    plazo.value = "";
    tasa.value = "";

}


btnSimulador.onclick = anhadirPrestamo;

const updateDisplay = () => {

    container_prestamos.innerHTML = null;

    for(const prestamo of prestamos){
    
        let divPrestamo = document.createElement("div");
        let pPrestamo = document.createElement("p");
        let pPlazo = document.createElement("p");
        let pTasa = document.createElement("p");
        let h2Cuota = document.createElement("h2");
    
        divPrestamo.className = "cont_prestamo";
    
        pPrestamo.append(`Prestamo : ${prestamo.cantidadPrestamo}`);
        pPlazo.append(`Plazo : ${prestamo.plazoPrestamos}`);
        pTasa.append(`Tasa : ${prestamo.tasaPrestamos}`);
        h2Cuota.append(`Cuota : ${prestamo.valorCuotaMes}`);
            
        divPrestamo.append(pPrestamo,pPlazo,pTasa,h2Cuota)
    
        container_prestamos.append(divPrestamo);

    }
    const enJSON    = JSON.stringify(prestamos);
    localStorage.setItem("db", enJSON);

}

const verPrestamos = () => {

    if(prestamos.length == 0)
        alert("Simule un prestamo");

    if (tempAnadirPrestamoDisplay ==1){

        updateDisplay();

        tempAnadirPrestamoDisplay = 0;
    }
}

btnPrestamos.onclick = verPrestamos;

let prestamosInStorage =JSON.parse(localStorage.getItem("db"));

if(prestamosInStorage) {
    prestamosInStorage.forEach(e => {
        prestamos.push(e);
    });

    updateDisplay();
}
