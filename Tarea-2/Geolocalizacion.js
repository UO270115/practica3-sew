"use strict";
class Geolocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.showErrors.bind(this));
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
}
var geolocalizacion = new Geolocalizacion();