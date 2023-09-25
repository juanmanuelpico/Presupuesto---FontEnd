const ingresos = [
    new Ingreso("Salario", 2100),
    new Ingreso("Venta Coche", 1500)
];

const egresos = [
    new Egreso("Renta", 900),
    new Egreso("Ropa", 400)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let total = 0;
    for(let ingreso of ingresos){
        total += ingreso.valor;
    }
    return total;
}
let totalEgresos = ()=>{
    let total = 0;
    for(let egreso of egresos){
        total += egreso.valor;
    }
    return total;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor)=> {
    return valor.toLocaleString("en-US",{style:"currency", currency:"USD", minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor)=> {
    return valor.toLocaleString("en-US",{style:"percent", minimumFractionDigits: 2});
}
//----------INGRESOS--------
const cargarIngresos = ()=>{
    let ingresoHtml = "";
    for(let ingreso of ingresos){
        ingresoHtml += crearIngresoHtml(ingreso);
        }
        document.getElementById("lista-ingresos").innerHTML = ingresoHtml;
    }

const crearIngresoHtml = (ingreso)=>{
    let ingresoHtml = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHtml;
}

const eliminarIngreso = (id)=>{
    //misma funcionalidad que el for of, compara el id
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso === ingreso.id);
    ingresos.splice(indiceEliminar);
    cargarCabecero();
    cargarIngresos();
}

//----------EGRESOS--------
const cargarEgresos = ()=>{
    let egresoHtml = "";
    for(let egreso of egresos){
        egresoHtml += crearEgresoHtml(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresoHtml;
}

const crearEgresoHtml = (egreso)=>{
    let egresoHtml = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHtml;
}

const eliminarEgreso = (id)=>{
    let indice = egresos.findIndex(egreso => egreso === egreso.id);
    egresos.splice(indice);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = ()=>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if(descripcion.value !== "" && valor.value !==""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
}