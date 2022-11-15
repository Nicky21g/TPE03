function GenerarCaptcha() {
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
  let ctxCanvas = document.getElementById("captcha")?.getContext("2d");
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
function Cerrar() {
  document.getElementById("popout").style.display = "none";
  document.getElementById("IngresarCaptcha").value = "";
  document.getElementById("boton_enviar").disabled = false;
  limpiar();
  GenerarCaptcha();
}
function ValidarCaptcha() {
  let CaptchaIngresado = document.querySelector("#IngresarCaptcha");

  if (CaptchaOrigen == CaptchaIngresado.value) {
    /* aca comienza a cargar los datos al mockapi*/
    Agregar_solicitud();

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
