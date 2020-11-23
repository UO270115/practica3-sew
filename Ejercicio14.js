"use strict";
class Canvas {

    constructor() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {  
            alert("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }

        $(document).ready(this.inicializar.bind(this));
        this.x = 0;
        this.y = 0;
    }

    inicializar(){
        $(":button").each(function () {
            var color = this.name;
            if(color != undefined){
                $(this).css({backgroundColor: color});
            }
        });

        var qCanvas = $('#canvas').mousemove(this.iniciarDibujado.bind(this)).mouseup(this.finalizarDibujado.bind(this));
        this.canvas = qCanvas.get(0);
        this.canvas.width = qCanvas.width();
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
    }

    leerArchivo() {
        this.canvas.height = 550; // cuando se cambia el tamaño se vacía/se pierde el contenido

        var files = document.getElementById("archivo").files;
        var nArchivos = files.length;
        if(nArchivos > 1){
            alert("Lo sentimos, sólo se puede leer un archivo");
        }

        var typeFile = files[0].name.split(".");
        var imageTypes = ["jpeg", "jpe", "jpg", "png"];
        this.file = files[0];
        if(!imageTypes.includes(typeFile[typeFile.length-1])){ // archivos de texto
            this.loadTxtFile(files[0]);
        }else{ // imágenes
            this.loadImageFile(files[0]);
        }
    }

    loadTxtFile(file){
        var this_ = this;
        var lector = new FileReader();
        lector.onloadend = function (event) {
            var lines = lector.result.split("\n");
            this_.showContent(lines);
        }
        lector.readAsText(file);
    }

    showContent(lines){
        console.log(lines);

        var lineHeight = 15;
        var lastLineHeight = 20 + (lines.length - 1)*lineHeight;
        this.canvas.height = lastLineHeight;

        for (var i = 0; i < lines.length; i++){
            lastLineHeight = 20 + (i*lineHeight);
            this.context.fillText(lines[i], 20, lastLineHeight);
        }
    }

    loadImageFile(file) {
        var canvas = this.canvas;
        var context = this.context;

        var lector  = new FileReader();
        lector.onloadend = function (event) {
            $("<img>").attr("src", lector.result)
                      .attr("alt", "Imagen local cargada")
                      .on("load", function () {
                                    canvas.height = this.height;
                                    context.drawImage(this, 0, 0, canvas.width, canvas.height);
            });    
        };
        lector.readAsDataURL(file);
    }

    iniciarDibujado(event) {
        if (event.buttons == 1) {
            if (this.x != 0) {
                this.context.beginPath();
                this.context.moveTo(this.x, this.y);
                this.x = event.offsetX;
                this.y = event.offsetY;
                this.context.lineTo(this.x, this.y);
                this.context.stroke();
            }
            else {
                this.x = event.offsetX;
                this.y = event.offsetY;
            }
        }
    }

    finalizarDibujado(event) {
        this.x = 0;
        this.y = 0;
    }

    pantalla(){
        if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {  
                document.documentElement.requestFullScreen();  
            } else if (document.documentElement.mozRequestFullScreen) {  
                document.documentElement.mozRequestFullScreen();  
            } else if (document.documentElement.webkitRequestFullScreen) {  
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
            }  
            $("#pantalla").attr("src","noFullScreen.png");
        } else {  
            if (document.cancelFullScreen) {  
                document.cancelFullScreen();  
            } else if (document.mozCancelFullScreen) {  
                document.mozCancelFullScreen();  
            } else if (document.webkitCancelFullScreen) {  
                document.webkitCancelFullScreen();  
            }  
            $("#pantalla").attr("src","fullScreen.png");
        }  
    }

    guardar(){
        var file = this.file.name.split(".");
        var nombre = "";
        for (var i = 0; i < file.length - 1; i++){
            nombre += file[i];
        }
        var dato = this.canvas.toDataURL(nombre + "/png");
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = dato;
        a.download = nombre;
        a.click();
        window.URL.revokeObjectURL(dato);
    }

    highlight(){
        this.context.strokeStyle = "#FFE900";
        this.context.lineWidth = 10;
    }

    color(color){
        this.context.strokeStyle = color;
        //this.context.globalAlpha = 0.3;
        this.context.lineWidth = 2;
    }
}
var canvas = new Canvas();