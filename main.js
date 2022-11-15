let CaptchaOrigen = "";

GenerarCaptcha();

let btn_enviar = document
  .getElementById("boton_enviar")
  .addEventListener("click", ValidarCaptcha);
let btn_cerrar = document
  .getElementById("cerrar")
  .addEventListener("click", Cerrar);

//Menu responsive
document.getElementById("hamburguesa").addEventListener("click", ActivaMenu);
function ActivaMenu() {
  let menu = document.querySelector("nav.menu");
  menu.classList.toggle("show");
  console.log("Función ActivaMenu");
}

function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("calle_origen").value = "";
  document.getElementById("altura_origen").value = "";
  document.getElementById("entre_origen").value = "";
  document.getElementById("obs_origen").value = "";
  document.getElementById("calle_destino").value = "";
  document.getElementById("altura_destino").value = "";
  document.getElementById("entre_destino").value = "";
  document.getElementById("obs_destino").value = "";
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

async function Agregar_solicitud() {
  //agregar solicitud al mockapi
  let origen = "https://636a7a14b10125b78fdc9931.mockapi.io/api/v1/Solicitudes";
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
    let llamada = await fetch(origen, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solicitud),
    });
    if (llamada.status == 201) {
      console.log("Creado!");
    }
  } catch (error) {
    console.log(error);
  }
}
