"use strict";
class MapaKML {

    constructor (){
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

        var typeFile = files[0].name.split(".");
        if(typeFile[1] == "kml"){
            this.load(files[0]);
        }else{
            alert("Lo sentimos, sólo se puede cargar un archivo de tipo kml");
        }
    }

    load(file){
        var center = {lat: 43.541178, lng: -5.655691};
        var mapa = new google.maps.Map(document.getElementById("map"),{
            zoom: 8,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var lector = new FileReader();
        lector.onload = function (evento) {
            var xml = $(lector.result);
            $("placemark", xml).each(function(){
                // mi kml no tiene nombre ni descripcion en los LineString
                // sólo los Point tienen name y a veces description
                var name = $("name", $(this));
                var description = $("description", $(this));
                $("point", $(this)).each(function(){
                    var coordinates = $("coordinates", $(this))[0].childNodes[0].data;
                    var values = coordinates.split(",");
                    var ubicacion = {
                        lat: parseFloat(values[1]),
                        lng: parseFloat(values[0])
                    };

                    var title = "";
                    if(name.length > 0){
                        title += name[0].childNodes[0].data;
                    }
                    // Si existe description para el Point antes tuvo que haber name, por lo menos en mi kml
                    if(description.length > 0){
                        title += ": " + description[0].childNodes[0].data;
                    }

                    new google.maps.Marker({
                        position: ubicacion,
                        title: title,
                        map: mapa
                    });
                })

                $("linestring", $(this)).each(function(){
                    var coordinates = $("coordinates", $(this))[0].childNodes[0].data;
                    var points = coordinates.split("\n");
                    var polylines = [];
                    if(points.length > 1){ // al pricipio y al final hay \n
                        points.forEach(element => {
                            var values = element.split(",");
                            if(values.length > 1){ 
                                var ubicacion = {
                                    lat: parseFloat(values[1]),
                                    lng: parseFloat(values[0])
                                };
                                polylines.push(ubicacion);
                            }
                        });
                    }

                    if(polylines.length > 0){
                        new google.maps.Polyline({
                            path: polylines,
                            geodesic: true,
                            map: mapa
                        });
                    };
                })
            })
        }; 
        lector.readAsText(file);
    }
}
var mapa = new MapaKML();