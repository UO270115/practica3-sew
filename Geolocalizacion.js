"use strict";
class Geolocalizacion {

    constructor (){
        //navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.showErrors.bind(this));
        var listener = new google.maps.event.addDomListener(window, 'load', this.initMap.bind(this));
    }

    getPosicion(posicion){
        this.longitud = posicion.coords.longitude; 
        this.latitud  = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;       
    }

    showErrors(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    obtenerInfo(){
        this.ubicacion = document.getElementById("ubicacion");
        this.datos = ""; 
        this.datos += "<p>Longitud: " + this.longitud + " grados</p>"; 
        this.datos += "<p>Latitud: " + this.latitud + " grados</p>";
        this.datos += "<p>Precisión de la latitud y longitud: " + this.precision + " metros</p>";
        this.datos += "<p>Altitud: " + this.altitude + " metros</p>";
        this.datos += "<p>Precisión de la altitud: " + this.precisionAltitud + " metros</p>"; 
        this.datos += "<p>Rumbo: " + this.rumbo + " grados</p>"; 
        this.datos += "<p>Velocidad: " + this.velocidad + " metros/segundo</p>";
        this.ubicacion.innerHTML = this.datos;
    }

    getStaticMap(){
        var ubicacion=document.getElementById("ubicacion");
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";

        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";

        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;

        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";

        //Tamaóo del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";

        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;

        //rutas.path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='" + this.imagenMapa + "' alt='Imagen estática que muestra la posición del usuario con un zoom de calles' />";
    }

    initMap(){
        navigator.geolocation.getCurrentPosition(this.showMap.bind(this));
    }

    showMap(position){
        var ubicacion = new google.maps.LatLng(position.coords.latitude, position.coords.longitud);
        var mapaGeoposicionado = new google.maps.Map(document.getElementById("ubicacion"),{
            zoom: 13,
            center: ubicacion,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        //var mapa = new google.maps.Map(document.getElementById("ubicacion"), mapaGeoposicionado);
        //var marcador = new google.maps.Marker({position: ubicacion, map: mapa}); 

        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mapaGeoposicionado);

        //const transitLayer = new google.maps.TransitLayer();
        //transitLayer.setMap(mapaGeoposicionado);

        //const bikeLayer = new google.maps.BicyclingLayer();
        //bikeLayer.setMap(mapaGeoposicionado);

        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Localización encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
            });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
    }
}
var mapaDinamicoGoogle = new Geolocalizacion();