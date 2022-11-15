"use strict"

let solicitud = [{'nombre':"Lorena",'apellido':"Colombo",'dni':"55555555",'servicio': "Encomiendas",'forma':"Credito",'calle_origen':"23",'altura_origen':"3032",'entre_origen':"11 y 13",'obs_origen':"",'calle_destino':"102",'altura_destino':"4071",'entre_destino':"86 y 88",'obs_destino':"tocar timbre"},
{'nombre':"Delia",'apellido':"Varela",'dni':"12121212",'servicio': "Papelería y Documentación",'forma':"Debito",'calle_origen':"100",'altura_origen':"3650",'entre_origen':"71 y 73",'obs_origen':"golpear las manos",'calle_destino':"97",'altura_destino':"2071",'entre_destino':"186 y 188",'obs_destino':"puerta gris"},
{'nombre': "Santino",'apellido':"Luchini",'dni':"54343434",'servicio': "Muebles y Hogar",'forma':"A convenir",'calle_origen':"109",'altura_origen':"115",'entre_origen':"2 y 4",'obs_origen':"coordinar al celular 15608754",'calle_destino':"10",'altura_destino':"171",'entre_destino':"146 y 148",'obs_destino':"Coordinar al celular"}];

let CaptchaOrigen='';




let btn_enviar =  document.getElementById("boton_enviar").addEventListener("click",ValidarCaptcha);
let btn_cerrar =  document.getElementById("cerrar").addEventListener("click",Cerrar);
GenerarCaptcha();



let CaptchaIngresado= document.querySelector("#IngresarCaptcha") ;

/* Botones y aspectos de SOLICITUD.administrador.html */

let btn_mostrar =  document.getElementById('boton_mostrar').addEventListener("click",CargarTabla);
let btn_eliminar =  document.getElementById("boton_eliminar").addEventListener("click",EliminarVector);
let btn_eliminar_primerr =  document.getElementById("boton_eliminar_primer").addEventListener("click",EliminarPrimer);
let btn_eliminar_ultimor =  document.getElementById("boton_eliminar_ultimo").addEventListener("click",EliminarUltimo);
let btn_otras =  document.getElementById("boton_otras").addEventListener("click",Otras);
let btn_seleccion =  document.getElementById("boton_seleccion").addEventListener("click",PintarCeldas);

CargarTabla("");



/* COMIENZAN LAS FUNCIONES */
function GenerarCaptcha(){ 
    let abecedario=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let numeros=['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let codigo='';
    let item='';
      for(let i=1;i<=7;i++){
        if (i == 4){
            let index=[Math.floor(Math.random()*(numeros.length-0))+0];
            item=numeros[index];
        }else{
            let index=[Math.floor(Math.random()*(abecedario.length-0))+0];
            item=abecedario[index];
        }  
        codigo=codigo+item;
      }
      CaptchaOrigen= codigo;
      CreaIMG(codigo);
}

function CreaIMG(texto) {
    let ctxCanvas = document.getElementById("captcha").getContext('2d');
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
    for (let i = 0; i < (width); i++) {
        line = i * 3;
        ctxCanvas.moveTo(line, 0);
        ctxCanvas.lineTo(0, line);
    }
    ctxCanvas.stroke();
    //formato texto
    ctxCanvas.direction = 'ltr';
    ctxCanvas.font = "bold " + fontSize + " " + fontFamily ;
    //texto posicion
    let x = (width / 9) * 2;
    let y = (height / 3) * 2;
    //color del borde del texto 
    ctxCanvas.strokeStyle = "yellow";
    ctxCanvas.strokeText(texto, x, y);
    //color del texto
    ctxCanvas.fillStyle = "red";
    ctxCanvas.fillText(texto, x, y);
    let imagen = document.getElementById ("imagen");
    //imagen.src=ctxCanvas.canvas.toDataURL();
}

function limpiar(){
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("dni").value="";
    document.getElementById("calle_origen").value="";
    document.getElementById("altura_origen").value="";
    document.getElementById("entre_origen").value="";
    document.getElementById("obs_origen").value="";
    document.getElementById("calle_destino").value="";
    document.getElementById("altura_destino").value="";
    document.getElementById("entre_destino").value="";
    document.getElementById("obs_destino").value="";
}

function ValidarCaptcha(){
   if(CaptchaOrigen == CaptchaIngresado.value){
      /* aca comienza a cargar los datos al vector*/
      /*Agregar_Solicitud(evento);*/
      Agregar_Solicitud();
      limpiar();
      document.getElementById("boton_enviar").disabled=true;
      document.getElementById("popout").style.display="block";
      document.getElementById("output").innerHTML="Exitosa.";
  }else{
      document.getElementById("popout").style.display="block";
      document.getElementById("output").innerHTML="Errónea. Intente nuevamente.";
  }
 }

function Cerrar(){
    document.getElementById("popout").style.display="none";
    document.getElementById("IngresarCaptcha").value="";
    document.getElementById("boton_enviar").disabled=false;

    GenerarCaptcha();
}

/*A partir de aca comienzo la carga del vector y la muestra de la tabla */
/*function Agregar_Solicitud(evento){
  evento.preventDefault();*/
function Agregar_Solicitud(){
    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let dni=document.getElementById("dni").value;
    let servicio=document.getElementById("servicio").selectedOptions[0].value;
    let forma=document.getElementById("formpago").selectedOptions[0].value;
    let calle_origen=document.getElementById("calle_origen").value;
    let altura_origen=document.getElementById("altura_origen").value;
    let entre_origen=document.getElementById("entre_origen").value;
    let obs_origen=document.getElementById("obs_origen").value;
    let calle_destino=document.getElementById("calle_destino").value;
    let altura_destino=document.getElementById("altura_destino").value;
    let entre_destino=document.getElementById("entre_destino").value;
    let obs_destino=document.getElementById("obs_destino").value;
    solicitud.push({'nombre':nombre,'apellido':apellido,'dni':dni,'servicio': servicio,'forma':forma,'calle_origen':calle_origen,'altura_origen':altura_origen,'entre_origen':entre_origen,'obs_origen':obs_origen,'calle_destino':calle_destino,'altura_destino':altura_destino,'entre_destino':entre_destino,'obs_destino':obs_destino});
    CargarTabla();
}

/* Funciones de SOLICITUD.administrador.html */
function EliminarVector(){
  solicitud=[];
  CargarTabla("");
}

function EliminarPrimer(){
  solicitud.shift();
  CargarTabla("");
}

function EliminarUltimo(){
     solicitud.pop();
     CargarTabla("");
}

function Otras(){
  solicitud.push({'nombre':"Juan",'apellido':"Perez",'dni':"22222222",'servicio': "Encomiendas",'forma':"Credito",'calle_origen':"10",'altura_origen':"3050",'entre_origen':"11 y 13",'obs_origen':"porton blanco",'calle_destino':"107",'altura_destino':"4071",'entre_destino':"86 y 88",'obs_destino':"tocar timbre"});
  solicitud.push({'nombre':"Ana",'apellido':"Gomez",'dni':"33333333",'servicio': "Papelería y Documentación",'forma':"Debito",'calle_origen':"100",'altura_origen':"3650",'entre_origen':"71 y 73",'obs_origen':"golpear las manos",'calle_destino':"97",'altura_destino':"2071",'entre_destino':"186 y 188",'obs_destino':"puerta gris"});
  solicitud.push({'nombre':"Pedro",'apellido':"Luchini",'dni':"11111111",'servicio': "Muebles y Hogar",'forma':"Efectivo",'calle_origen':"90",'altura_origen':"1150",'entre_origen':"81 y 83",'obs_origen':"coordinar al celular 15608754",'calle_destino':"10",'altura_destino':"171",'entre_destino':"146 y 148",'obs_destino':"Coordinar al celula"});
  CargarTabla("");
}

function PintarCeldas(){
  CargarTabla("Muebles y Hogar");
}

function EliminarTabla(){
  let i;
  let cant;
  let tabla=document.getElementById('tabla_solicitud');
  cant= tabla.rows.length;
  for(i=cant;i>1;i-- ){
    tabla.deleteRow(i-1);
  }
}

function CargarTabla(filaresaltada){
    let i;
    EliminarTabla();
    for(i=0; i<solicitud.length;i++){
      let pedido=solicitud[i];
      Agregar_filas_tabla(pedido, filaresaltada);
    }
}

function Agregar_filas_tabla(pedido, filaresaltada){
    let tabla=document.getElementById('tabla_solicitud');
    let nombre= pedido.nombre;
    let apellido=pedido.apellido;
    let dni= pedido.dni;
    let servicio=pedido.servicio;
    let forma=pedido.forma;
    let calle_origen=pedido.calle_origen;
    let altura_origen=pedido.altura_origen;
    let entre_origen=pedido.entre_origen;
    let obs_origen=pedido.obs_origen;
    let calle_destino=pedido.calle_destino;
    let altura_destino=pedido.altura_destino;
    let entre_destino=pedido.entre_destino;
    let obs_destino=pedido.obs_destino;

    let fila=document.createElement("tr");
    let columna1=document.createElement("td");
    let columna2=document.createElement("td");
    let columna3=document.createElement("td");
    let columna4=document.createElement("td");
    let columna5=document.createElement("td");
    let columna6=document.createElement("td");
    let columna7=document.createElement("td");
    let columna8=document.createElement("td");
    let columna9=document.createElement("td");
    let columna10=document.createElement("td");
    let columna11=document.createElement("td");
    let columna12=document.createElement("td");
    let columna13=document.createElement("td");
    
    columna1.innerHTML=nombre;
    columna2.innerHTML=apellido;
    columna3.innerHTML=dni;
    columna4.innerHTML=servicio;
    columna5.innerHTML=forma;
    columna6.innerHTML=calle_origen;
    columna7.innerHTML=altura_origen;
    columna8.innerHTML=entre_origen;
    columna9.innerHTML=obs_origen;
    columna10.innerHTML=calle_destino;
    columna11.innerHTML=altura_destino;
    columna12.innerHTML=entre_destino;
    columna13.innerHTML=obs_destino;

    if (servicio == filaresaltada)
      fila.style.backgroundColor="White";
    else
      fila.style.backgroundColor= "#6294c0";

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
}

