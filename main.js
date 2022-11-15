"use strict";

//Menu responsive
document.getElementById("hamburguesa").addEventListener("click", ActivaMenu);
function ActivaMenu() {
  let menu = document.querySelector("nav.menu");
  menu.classList.toggle("show");
  console.log("Función ActivaMenu");
}

//Aca forzamos que comience por inicio
let inicio = document.querySelector("#inicio");
let evento = document.createEvent("MouseEvents");
seleccion("inicio");
LlamarPagina(evento, "inicio");

//Aca comienza el Nav con partial render

function seleccion(id) {
  // Eliminar la clase seleccionada de todos los botones
  document
    .querySelectorAll(".ruta")
    .forEach((item) => item.classList.remove("seleccionado"));
  // seleccione el elemento clicado (visualmente)
  //document.querySelectorAll("#" + id).forEach(item => item.classList.add('selected'));
  document.querySelector("#" + id).classList.add("seleccionado");
}

function push(event) {
  // Obtenga el atributo de identificación del botón o enlace en el que se hizo clic
  let id = event.target.id;
  // Seleccionar visualmente el botón/pestaña/cuadro en el que se hizo clic
  seleccion(id);
  // Actualizar título en la pestaña de la ventana
  document.title = id;
  // Finalmente empuje el cambio de estado a la barra de direcciones
  window.history.pushState({ id }, `${id}`, `/${id}`);
  // Cargar contenido para esta pestaña/página
  LlamarPagina(event, id);
}

window.onload = (event) => {
  // Agregue el evento push () del historial cuando se hace clic en las casillas

  window["inicio"].addEventListener("click", (event) => push(event));
  window["tarifas"].addEventListener("click", (event) => push(event));
  window["contratacion"].addEventListener("click", (event) => push(event));
  window["administrador"].addEventListener("click", (event) => push(event));
  window["contacto"].addEventListener("click", (event) => push(event));
};

// Escuche PopStateEvent
// (Se hace clic en los botones Atrás o Adelante)
window.addEventListener("popstate", (event) => {
  // Grab the history state id
  let estado = event.state.id;
  // Mostrar ID de clic en la consola (solo por diversión)
  console.log("estado = ", estado);
  // Seleccionar visualmente el botón/pestaña/cuadro en el que se hizo clic
  seleccion(estado);
  // Cargar contenido para esta pestaña/página
  //contenido(estado);
  LlamarPagina(event, estado);
});

// llamando a cada pagina //

async function LlamarPagina(event, pagina) {
  event.preventDefault();
  let contenedorppal = document.querySelector("#contenedorppal");
  contenedorppal.innerHTML = "<h1>Cargando...</h1>";
  try {
    let response = await fetch("/" + pagina + ".html");
    if (response.ok) {
      let textoaviso = await response.text();
      console.log(textoaviso);
      if (textoaviso == "") textoaviso = "<h1>¡URL en Construcción!</h1>";

      contenedorppal.innerHTML = textoaviso;
      //contenedorppal.innerHTML = "";
      //contenedorppal.appendChild(textoaviso);

      if (pagina == "contratacion") {

        GenerarCaptcha();
        //processText();

        let btnenviar = document.querySelector("#boton_enviar");
        btnenviar.addEventListener("click", ValidarCaptcha);
        let btncerrar = document.querySelector("#btncerrar");
        btncerrar.addEventListener("click", Cerrar);
        //let CaptchaIngresado= document.querySelector("#IngresarCaptcha") ;
      }

      //if(pagina=="administrador"){
      //    Llamadabotonesadmn();
      //}
    } else contenedorppal.innerHTML = "<h1>Error - ¡URL Fallida!</h1>";
  } catch (response) {
    contenedorppal.innerHTML = "<h1>Error - ¡Conexión fallida!</h1>";
  }
}

//Manejo de tablas de precios del HTML tarifas

async function DatosTarifas() {
  let url = "https://636a7a14b10125b78fdc9931.mockapi.io/api/v1/Distancia";
  let distancia = document.querySelector("#lista_nombres");
  distancia.innerHTML = "";
  try {
    let res = await fetch(url); // GET url
    let json = await res.json(); // texto json a objeto
    console.log(json);
    for (const usuario of json) {
      let nombre = usuario.nombre;
      lista.innerHTML += `<ul>${nombre}</ul>`;
    }
  } catch (error) {
    console.log(error);
  }
}
let CaptchaOrigen = "";
function GenerarCaptcha() {
    CaptchaOrigen = "";
  let abecedario = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let codigo = "";
  let item = "";
  for (let i = 1; i <= 7; i++) {
    if (i == 4) {
      let index = [Math.floor(Math.random() * (numeros.length - 0)) + 0];
      item = numeros[index];
    } else {
      let index = [Math.floor(Math.random() * (abecedario.length - 0)) + 0];
      item = abecedario[index];
    }
    codigo = codigo + item;
  }
  CaptchaOrigen = codigo;
  CreaIMG(codigo);
}

function CreaIMG(texto) {
  let ctxCanvas = document.getElementById("captcha").getContext("2d");
  let fontSize = "30px";
  let fontFamily = "Times New Roman";
  let width = 250;
  let height = 50;
  //tamaño
  ctxCanvas.canvas.width = width;
  ctxCanvas.canvas.height = height;
  //color de fondo
  ctxCanvas.fillStyle = "whitesmoke";
  ctxCanvas.fillRect(0, 0, width, height);
  //puntos de distorsion
  ctxCanvas.setLineDash([7, 10]);
  ctxCanvas.lineDashOffset = 5;
  ctxCanvas.beginPath();
  let line;
  for (let i = 0; i < width; i++) {
    line = i * 3;
    ctxCanvas.moveTo(line, 0);
    ctxCanvas.lineTo(0, line);
  }
  ctxCanvas.stroke();
  //formato texto
  ctxCanvas.direction = "ltr";
  ctxCanvas.font = "bold " + fontSize + " " + fontFamily;
  //texto posicion
  let x = (width / 9) * 2;
  let y = (height / 3) * 2;
  //color del borde del texto
  ctxCanvas.strokeStyle = "yellow";
  ctxCanvas.strokeText(texto, x, y);
  //color del texto
  ctxCanvas.fillStyle = "red";
  ctxCanvas.fillText(texto, x, y);
  let imagen = document.getElementById("imagen");
  //imagen.src=ctxCanvas.canvas.toDataURL();
}
function ValidarCaptcha() {
  let CaptchaIngresado= contenedorppal.querySelector("#IngresarCaptcha") ;
  if (CaptchaOrigen == CaptchaIngresado.value) {
    /* aca comienza a cargar los datos al vector*/
    /*Agregar_Solicitud(evento);*/
    //Agregar_Solicitud();
    //limpiar();
    document.querySelector("#boton_enviar").disabled = true;
    document.getElementById("popout").style.display = "block";
    document.getElementById("output").innerHTML = "Exitosa.";
  } else {
    document.getElementById("popout").style.display = "block";
    document.getElementById("output").innerHTML =
      "Errónea. Intente nuevamente.";
  }
}

function CargarTabla(filaresaltada) {
  let i;
  EliminarTabla();
  for (i = 0; i < solicitud.length; i++) {
    let pedido = solicitud[i];
    Agregar_filas_tabla(pedido, filaresaltada);
  }
}

/// aca intentamos cargar los botones de admin y contratacion

let jsloads = document.querySelectorAll("#contratación");
contratacion.addEventListener("click", loadClick);

function loadClick(event) {
  processText();
}

function processText() {
  //busco sobre lo que agregué y agrego evento
  let contenedorppal = document.querySelector("#contenedorppal");
  let contenedorcontratacion = document.querySelector(
    "#contenedorcontratacion"
  );

  contenedorppal
    .querySelectorAll(".js-btnload")
    .forEach((b) => b.addEventListener("click", loadAlerta));
  console.log(contenedorppal.text);
  //variables para carga de contratacion
  let CaptchaOrigen = "";
  //let btnenviar=  contenedorppal.querySelector("#boton_enviar");
  //btnenviar.addEventListener("click",ValidarCaptcha);
  //let btncerrar= contenedorppal.querySelector("#cerrar").
  //btncerrar.addEventListener("click",Cerrar);
  //let CaptchaIngresado= contenedorppal.querySelector("#IngresarCaptcha") ;
}

function Cerrar(){
    document.getElementById("popout").style.display="none";
    document.getElementById("IngresarCaptcha").value="";
    document.getElementById("boton_enviar").disabled=false;

    GenerarCaptcha();
}

function loadAlerta() {
  alert("ingreso");
}

let jsbtnadmn = document.querySelectorAll(".botones");
jsbtnadmn.forEach((e) => e.addEventListener("click", Llamadabotonesadmn));
let CaptchaIngresado = document.querySelector("#IngresarCaptcha");

/* Botones y aspectos de SOLICITUD.administrador.html */
async function Llamadabotonesadmn() {
  let btn_mostrar = await document
    .getElementById("boton_mostrar")
    .addEventListener("click", CargarTabla);
  let btn_eliminar = await document
    .getElementById("boton_eliminar")
    .addEventListener("click", EliminarVector);
  let btn_eliminar_primerr = await document
    .getElementById("boton_eliminar_primer")
    .addEventListener("click", EliminarPrimer);
  let btn_eliminar_ultimor = await document
    .getElementById("boton_eliminar_ultimo")
    .addEventListener("click", EliminarUltimo);
  let btn_otras = await document
    .getElementById("boton_otras")
    .addEventListener("click", Otras);
  let btn_seleccion = await document
    .getElementById("boton_seleccion")
    .addEventListener("click", PintarCeldas);
}
