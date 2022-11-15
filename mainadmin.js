let elemento;
let celda;
let solicitud = [];
let pagina;

let solicitud_datos = [
  {
    nombre: "Lorena",
    apellido: "Colombo",
    dni: "55555555",
    servicio: "Encomiendas",
    forma: "Credito",
    calle_origen: "23",
    altura_origen: "3032",
    entre_origen: "11 y 13",
    obs_origen: "",
    calle_destino: "102",
    altura_destino: "4071",
    entre_destino: "86 y 88",
    obs_destino: "tocar timbre",
  },
  {
    nombre: "Delia",
    apellido: "Varela",
    dni: "12121212",
    servicio: "Papelería y Documentación",
    forma: "Debito",
    calle_origen: "100",
    altura_origen: "3650",
    entre_origen: "71 y 73",
    obs_origen: "golpear las manos",
    calle_destino: "97",
    altura_destino: "2071",
    entre_destino: "186 y 188",
    obs_destino: "puerta gris",
  },
  {
    nombre: "Santino",
    apellido: "Luchini",
    dni: "54343434",
    servicio: "Muebles y Hogar",
    forma: "A convenir",
    calle_origen: "109",
    altura_origen: "115",
    entre_origen: "2 y 4",
    obs_origen: "coordinar al celular 15608754",
    calle_destino: "10",
    altura_destino: "171",
    entre_destino: "146 y 148",
    obs_destino: "Coordinar al celular",
  },
];
let json = [];
const origen =
  "https://636a7a14b10125b78fdc9931.mockapi.io/api/v1/Solicitudes/";

Agregar_filas_tabla();
let btnedicion = document.querySelectorAll(".btnedicion");
btnedicion.forEach((item) => item.addEventListener("click", LoadEdicion));
let btnborrar = document.querySelectorAll(".btnborrar");
btnborrar.forEach((item) => item.addEventListener("click", LoadBorrar));
let cantdatos = 0;
let paginavigente = 1;
//let cantdatos = ConsultaCantidad();
CargarTabla("", ConsultaCantidad(), 1, 10);

let btn_si = document.getElementById("si").addEventListener("click", OpcionSI);
let btn_no = document.getElementById("no").addEventListener("click", OpcionNO);

let btnatras = document
  .getElementById("atras")
  .addEventListener("click", Atras);
let btnadelante = document
  .getElementById("adelante")
  .addEventListener("click", Adelante);

/* Botones y aspectos de SOLICITUD.administrador.html */

document
  .getElementById("enviarmodal")
  ?.addEventListener("click", ValidarCaptchaEditar);
document.getElementById("cerrarmodal")?.addEventListener("click", CerrarModal);

let btn_eliminar = document
  .getElementById("boton_eliminar")
  .addEventListener("click", EliminarVector);

let btn_otras = document
  .getElementById("boton_otras")
  .addEventListener("click", Otras);

/* Funciones de SOLICITUD.administrador.html */
function EliminarVector() {
  solicitud = [];
  CargarTabla("");
}

async function Otras() {
  //agregar 3 solicitudes al mockapi
  for (let i = 0; i < solicitud_datos.length; i++) {
    try {
      let llamada = await fetch(origen, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solicitud_datos[i]),
      });
      if (llamada.status == 200) {
        console.log("Creado!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  cantdatos += solicitud_datos.length;
  paginavigente = Math.trunc(cantdatos / 10) + 1;
  document.querySelector("#infopagina").innerHTML =
    "Pagina " + paginavigente + " de " + (Math.trunc(cantdatos / 10) + 1);
  CargarTabla("", cantdatos, paginavigente, 10);
}

function PintarCeldas() {
  CargarTabla("Muebles y Hogar");
}

function EliminarTabla() {
  let fila = document.querySelectorAll("tr");
  let celda = document.querySelectorAll("td");
  for (let i = 0; i < 140; i++) {
    celda[i].textContent = "";
  }
}

async function CargarTabla(filaresaltada, totalelementos, pagina, cantidad) {
  //convocar al mockapi
  let filtrado = "?page=" + pagina + "&limit=" + cantidad;
  try {
    let llamada = await fetch(origen + filtrado);
    json = await llamada.json(); // texto json a objeto
    console.log(json);
    Traer_datos();
  } catch (error) {
    console.log(error);
  }
}

function Traer_datos() {
  EliminarTabla();
  let i = 0;
  let j = 0;
  let fila = document.querySelectorAll("tr");
  let celda = document.querySelectorAll("td");
  for (const Solicitudes of json) {
    let id = Solicitudes.id;
    let nombre = Solicitudes.nombre;
    let apellido = Solicitudes.apellido;
    let dni = Solicitudes.dni;
    let servicio = Solicitudes.servicio;
    let forma = Solicitudes.forma;
    let calle_origen = Solicitudes.calle_origen;
    let altura_origen = Solicitudes.altura_origen;
    let entre_origen = Solicitudes.entre_origen;
    let obs_origen = Solicitudes.obs_origen;
    let calle_destino = Solicitudes.calle_destino;
    let altura_destino = Solicitudes.altura_destino;
    let entre_destino = Solicitudes.entre_destino;
    let obs_destino = Solicitudes.obs_destino;

    //for(i=0; i<10;i++){
    console.log(i);
    console.log(j);
    celda[0 + i + j].textContent = id;
    celda[1 + i + j].textContent = nombre;
    celda[2 + i + j].textContent = apellido;
    celda[3 + i + j].textContent = dni;
    celda[4 + i + j].textContent = servicio;
    celda[5 + i + j].textContent = forma;
    celda[6 + i + j].textContent = calle_origen;
    celda[7 + i + j].textContent = altura_origen;
    celda[8 + i + j].textContent = entre_origen;
    celda[9 + i + j].textContent = obs_origen;
    celda[10 + i + j].textContent = calle_destino;
    celda[11 + i + j].textContent = altura_destino;
    celda[12 + i + j].textContent = entre_destino;
    celda[13 + i + j].textContent = obs_destino;
    i++;
    j += 13;
  }
}

function Agregar_filas_tabla() {
  let tabla = document.getElementById("tabla_solicitud");

  for (let i = 0; i < 10; i++) {
    let fila = document.createElement("tr");
    let columna1 = document.createElement("td");
    let columna2 = document.createElement("td");
    let columna3 = document.createElement("td");
    let columna4 = document.createElement("td");
    let columna5 = document.createElement("td");
    let columna6 = document.createElement("td");
    let columna7 = document.createElement("td");
    let columna8 = document.createElement("td");
    let columna9 = document.createElement("td");
    let columna10 = document.createElement("td");
    let columna11 = document.createElement("td");
    let columna12 = document.createElement("td");
    let columna13 = document.createElement("td");
    let columna14 = document.createElement("td");
    let columna15 = document.createElement("td");

    let boton = document.createElement("button"); // Creo el botón
    boton.classList.add("btnedicion");
    boton.setAttribute("id", "edicion" + i);
    boton.innerHTML = "<img src= Imagenes/editar.png class=imagenlista> </img>";

    let boton2 = document.createElement("button"); // Creo el botón
    boton2.classList.add("btnborrar");
    boton2.setAttribute("id", "borrar" + i);
    boton2.innerHTML =
      "<img src= Imagenes/borrar.png class=imagenlista> </img>";

    columna1.innerHTML = "";
    columna2.innerHTML = "";
    columna3.innerHTML = "";
    columna4.innerHTML = "";
    columna5.innerHTML = "";
    columna6.innerHTML = "";
    columna7.innerHTML = "";
    columna8.innerHTML = "";
    columna9.innerHTML = "";
    columna10.innerHTML = "";
    columna11.innerHTML = "";
    columna12.innerHTML = "";
    columna13.innerHTML = "";
    columna14.innerHTML = "";
    //columna15.innerHTML="";

    tabla.appendChild(fila);
    fila.appendChild(columna1);
    fila.appendChild(columna2);
    fila.appendChild(columna3);
    fila.appendChild(columna4);
    fila.appendChild(columna5);
    fila.appendChild(columna6);
    fila.appendChild(columna7);
    fila.appendChild(columna8);
    fila.appendChild(columna9);
    fila.appendChild(columna10);
    fila.appendChild(columna11);
    fila.appendChild(columna12);
    fila.appendChild(columna13);
    fila.appendChild(columna14);
    fila.appendChild(boton);
    fila.appendChild(boton2);
    fila.setAttribute("id", i);
  }
  AsignarEvento();
}

function AsignarEvento() {
  let btnedicion = document.querySelectorAll(".btnedicion");
  btnedicion.forEach((item) => item.addEventListener("click", LoadEdicion));
  let btnborrar = document.querySelectorAll(".btnborrar");
  btnborrar.forEach((item) => item.addEventListener("click", LoadBorrar));
}

function LoadBorrar() {
  document.querySelectorAll(".btnedicion").disabled = true;
  document.querySelectorAll(".btnborrar").disabled = true;
  elemento = document.activeElement;
  let id = elemento.id;
  let idfila = id.substr(6, 2);
  let fila = document.getElementById(idfila);
  let pedido = 14 * parseInt(idfila);
  celda = document.querySelectorAll("td");
  if (confirm("Confirma borrar")) {
    Borrar(celda[pedido].innerHTML);
  }
  document.querySelectorAll(".btnedicion").disabled = false;
  document.querySelectorAll(".btnborrar").disabled = false;
}

function LoadEdicion() {
  document.querySelectorAll(".btnedicion").disabled = true;
  document.querySelectorAll(".btnborrar").disabled = true;
  elemento = document.activeElement;
  let id = elemento.id;
  let idfila = id.substring(7);
  let fila = document.getElementById(idfila);
  let pedido = 14 * parseInt(idfila);
  celda = document.querySelectorAll("td");
  Buscar_Solicitud(celda[pedido].innerHTML);

  CargarTabla("", cantdatos, paginavigente, 10);

  document.querySelectorAll(".btnedicion").disabled = false;
  document.querySelectorAll(".btnborrar").disabled = false;
}

function OpcionSI() {
  // hay que eliminar datos de esa fila y del mockapi
  document.getElementById("abresino").style.display = "none";
  // document.getElementById("btnedicion").disabled=false;
  // document.getElementById("btnborrar").disabled=false;
  elemento = document.activeElement;
  elemento = document.console.log(elemento);
  id = elemento.id;
  console.log(id);

  document.getElementById(id);
}
function OpcionNO() {
  document.getElementById("abresino").style.display = "none";
  document.getElementById("btnedicion").disabled = false;
  document.getElementById("btnborrar").disabled = false;
}

async function Borrar(fila) {
  //convocar al mockapi
  let origen2 = origen + fila;
  try {
    let llamada = await fetch(origen2, {
      method: "DELETE",
    });
    if (llamada.status == 200) {
      console.log("Creado!");
      cantdatos--;
      CargarTabla("", cantdatos, paginavigente, 10);
    }
  } catch (error) {
    console.log(error);
  }
}
async function ConsultaCantidad() {
  //convocar al mockapi para saber conocer cantidad de elementos
  try {
    let llamada = await fetch(origen);
    json = await llamada.json(); // texto json a objeto
    console.log(json);
    cantdatos = json.length;
    document.querySelector("#infopagina").innerHTML =
      "Pagina " + paginavigente + " de " + (Math.trunc(cantdatos / 10) + 1);
    return cantdatos;
    if (llamada.status == 200) {
      console.log("Creado!");
    }
  } catch (error) {
    console.log(error);
  }
}

function Atras() {
  if (paginavigente > 1) {
    paginavigente--;
    document.querySelector("#infopagina").innerHTML =
      "Pagina " + paginavigente + " de " + (Math.trunc(cantdatos / 10) + 1);
    CargarTabla("", cantdatos, paginavigente, 10);
  }
}

function Adelante() {
  if (paginavigente < Math.trunc(cantdatos / 10) + 1) {
    paginavigente++;
    document.querySelector("#infopagina").innerHTML =
      "Pagina " + paginavigente + " de " + (Math.trunc(cantdatos / 10) + 1);
    CargarTabla("", cantdatos, paginavigente, 10);
  }
}

async function Buscar_Solicitud(elemento) {
  let origen2 = origen + elemento;
  try {
    let llamada = await fetch(origen2);
    json = await llamada.json(); // texto json a objeto
    console.log(json);
    Buscar_Formulario(elemento);
  } catch (error) {
    console.log(error);
  }
}

async function Buscar_Formulario(elemento) {
  try {
    let response = await fetch("/contratacion2.html");
    if (response.ok) {
      let textoaviso = await response.text();
      console.log(textoaviso);
      if (textoaviso == "") textoaviso = "<h1>¡URL en Construcción!</h1>";

      document.querySelector(".ventanamodal").innerHTML = textoaviso;
      Editar_Solicitud(elemento);
    } else alert("<h1>Error - ¡URL Fallida!</h1>");
  } catch (response) {
    alert("<h1>Error - ¡Conexión fallida!</h1>");
  }
}

function Editar_Solicitud(elemento) {
  let caja = document.querySelector("#modal1");
  document.getElementById("nombre").value = json.nombre;
  document.getElementById("apellido").value = json.apellido;

  document.getElementById("dni").value = json.dni;
  document.getElementById("servicio").value = json.servicio;
  debugger;
  document.getElementById("formpago").value = json.forma;
  document.getElementById("calle_origen").value = json.calle_origen;
  document.getElementById("altura_origen").value = json.altura_origen;
  document.getElementById("entre_origen").value = json.entre_origen;
  document.getElementById("obs_origen").value = json.obs_origen;
  document.getElementById("calle_destino").value = json.calle_destino;
  document.getElementById("altura_destino").value = json.altura_destino;
  document.getElementById("entre_destino").value = json.entre_destino;
  document.getElementById("obs_destino").value = json.obs_destino;

  caja.style.display = "block";
  GenerarCaptcha();
  document.getElementById("boton_enviar").setAttribute("id", "enviarmodal");
  document
    .getElementById("enviarmodal")
    .addEventListener("click", ValidarCaptchaEditar);
  document.getElementById("btncerrar").setAttribute("id", "cerrarmodal");
  document.getElementById("cerrarmodal").addEventListener("click", CerrarModal);
}

function ValidarCaptchaEditar() {
  let CaptchaIngresado = document.querySelector("#IngresarCaptcha");

  if (CaptchaOrigen == CaptchaIngresado.value) {
    /* aca comienza a cargar los datos al mockapi*/
    Guardar_solicitud();

    document.querySelector("#enviarmodal").disabled = true;

    document.getElementById("popout").style.display = "block";
    document.getElementById("output").innerHTML = "Exitosa.";
  } else {
    document.getElementById("popout").style.display = "block";
    document.getElementById("output").innerHTML =
      "Errónea. Intente nuevamente.";
  }
}

async function Guardar_solicitud() {
  //guardar solicitud modificada al mockapi
  let origen2 = origen + json.id;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let dni = document.getElementById("dni").value;
  let servicio = document.getElementById("servicio").selectedOptions[0].value;
  let forma = document.getElementById("formpago").selectedOptions[0].value;
  let calle_origen = document.getElementById("calle_origen").value;
  let altura_origen = document.getElementById("altura_origen").value;
  let entre_origen = document.getElementById("entre_origen").value;
  let obs_origen = document.getElementById("obs_origen").value;
  let calle_destino = document.getElementById("calle_destino").value;
  let altura_destino = document.getElementById("altura_destino").value;
  let entre_destino = document.getElementById("entre_destino").value;
  let obs_destino = document.getElementById("obs_destino").value;
  let solicitud = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    servicio: servicio,
    forma: forma,
    calle_origen: calle_origen,
    altura_origen: altura_origen,
    entre_origen: entre_origen,
    obs_origen: obs_origen,
    calle_destino: calle_destino,
    altura_destino: altura_destino,
    entre_destino: entre_destino,
    obs_destino: obs_destino,
  };
  try {
    let llamada = await fetch(origen2, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solicitud),
    });
    if (llamada.status == 200) {
      console.log("Modificado!");
    }
  } catch (error) {
    console.log(error);
  }
}

function CerrarModal() {
  document.getElementById("popout").style.display = "none";
  document.querySelector("#modal1").style.display = "none";
}
