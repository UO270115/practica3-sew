"use strict";
class Reader{

    constructor(){
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {  
            alert("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    leerArchivos(){
        var files = document.getElementById("archivos").files;
        var nAchivos = files.length;
        for(var i = 0; i < nAchivos; i++){
            var infoArchivo = "<p>Archivo "+ files[i].name  + " Tamaño: " + files[i].size +" bytes " + " Tipo: " + files[i].type + " Fecha última modificación: " + files[i].lastModified + "</p>"
            var info = document.getElementById("content");
            info.innerHTML += infoArchivo;

            var nombre = "areaTexto" + i;
            var pre = "<pre id='" + nombre + "'></pre>";
            var content = document.getElementById("content");
            content.innerHTML += pre;

            this.load(nombre, files[i]);
        }
    }

    load(nombre, file){

        var tipoTexto = /text.*/;
        var tipoJSON = "application/json";

        if (file.type.match(tipoTexto) || file.type.match(tipoJSON)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                console.log(lector.result);
                document.getElementById(nombre).innerHTML = lector.result;
            }; 
            lector.readAsText(file);
        }
    }

}
var reader = new Reader();