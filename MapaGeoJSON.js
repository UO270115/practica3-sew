"use strict";
class MapaGeoJSON {

    constructor() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {  
            alert("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    leerArchivo(){
        var files = document.getElementById("archivo").files;
        var nArchivos = files.length;
        if(nArchivos > 1){
            alert("Lo sentimos, sólo se puede leer un archivo");
        }

        var ubicacion = {lat: 43.541178, lng: -5.655691};
        var mapa = new google.maps.Map(document.getElementById("map"),{
            zoom: 8,
            center: ubicacion,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var lector = new FileReader();
        lector.onload = function (evento) {
            var textoGeoJson = lector.result;
            console.log(textoGeoJson);
            var geoJson = JSON.parse(textoGeoJson);
            mapa.data.addGeoJson(geoJson);
        }; 
        lector.readAsText(files[0]);
    }

}
var mapa = new MapaGeoJSON();