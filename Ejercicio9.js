"use strict";
class TiempoCiudad {

    constructor(index, ciudad) {
        this.apiKey = "f98c39c894e877e62ac8f132fbbc4991"; // my API Key
        this.index = index;
        this.ciudad = ciudad;
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apiKey;

        this.cargarDatos(this.index);
    }

    cargarDatos(index){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("pre").text((new XMLSerializer()).serializeToString(datos));
                alert("¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                console.log(datos);

                var ciudad = $('city',datos).attr("name");
                var numero = $('*',datos).length;
                var pais = $('country',datos).text();
                var latitud = $('coord',datos).attr("lat");
                var longitud = $('coord',datos).attr("lon");

                var amanece = $('sun',datos).attr("rise");
                var minutosZonaHoraria = new Date().getTimezoneOffset();
                var amaneceMiliSeg1970 = Date.parse(amanece);
                amaneceMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var amaneceLocal = (new Date(amaneceMiliSeg1970)).toLocaleTimeString("es-ES");

                var anochece = $('sun',datos).attr("set");
                var anocheceMiliSeg1970 = Date.parse(anochece);
                anocheceMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var anocheceLocal = (new Date(anocheceMiliSeg1970)).toLocaleTimeString("es-ES");

                var hora = $('lastupdate',datos).attr("value");
                var horaMiliSeg1970 = Date.parse(hora);
                horaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaLocal = (new Date(horaMiliSeg1970)).toLocaleTimeString("es-ES");

                var fecha = (new Date(horaMiliSeg1970)).toLocaleDateString("es-ES");
                var temperatura = $('temperature',datos).attr("value");
                var temperaturaMinima = $('temperature',datos).attr("min");
                var temperaturaMaxima = $('temperature',datos).attr("max");
                var temperaturaUnit       = $('temperature',datos).attr("unit");

                var presion = $('pressure',datos).attr("value");
                var presionUnit = $('pressure',datos).attr("unit");

                var humedad = $('humidity',datos).attr("value");
                var humedadUnit = $('humidity',datos).attr("unit");

                var visibilidad = $('visibility',datos).attr("value");
                var nubosidad = $('clouds',datos).attr("value");
                var nombreNubosidad = $('clouds',datos).attr("name")
                var descripcion = $('weather',datos).attr("value");
                var nombreViento = $('speed',datos).attr("name");

                var direccionViento = $('direction',datos).attr("value");
                var codigoViento = $('direction',datos).attr("code");

                var velocidadViento = $('speed',datos).attr("value");
                var precipitacionModo = $('precipitation',datos).attr("mode");

                $('#ciudad th').eq(index).text(ciudad);
                $('#numero td').eq(index).text(numero);
                $('#pais td').eq(index).text(pais);
                $('#latitud td').eq(index).text(latitud);
                $('#longitud td').eq(index).text(longitud);
                $('#amanece td').eq(index).text(amaneceLocal);
                $('#anochece td').eq(index).text(anocheceLocal);
                $('#hora td').eq(index).text(horaLocal);
                $('#fecha td').eq(index).text(fecha);
                $('#temperatura td').eq(index).text(temperatura);
                $('#temperaturaMinima td').eq(index).text(temperaturaMinima);
                $('#temperaturaMaxima td').eq(index).text(temperaturaMaxima);
                $('#unidades td').eq(index).text(temperaturaUnit);
                $('#presion td').eq(index).text(presion + " " + presionUnit);
                $('#humedad td').eq(index).text(humedad + " " + humedadUnit);
                $('#visibilidad td').eq(index).text(visibilidad);
                $('#nubosidad td').eq(index).text(nubosidad);    
                $('#nombreNubosidad td').eq(index).text(nombreNubosidad);   
                $('#descripcion td').eq(index).text(descripcion); 
                $('#nombreViento td').eq(index).text(nombreViento);  
                $('#direccionViento td').eq(index).text(direccionViento); 
                $('#velocidadViento td').eq(index).text(velocidadViento); 
                $('#codigoViento td').eq(index).text(codigoViento); 
                $('#precipitacionModo td').eq(index).text(precipitacionModo); 
                $('#icono td').eq(index).html('<img src="https://openweathermap.org/img/w/' + $('weather', datos).attr('icon') + '.png"' +
                    'alt="Imagen que representa el tiempo de una ciudad"/>');
                    
            },
            error: function(){
                alert("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
            }   
        });
    }

}
var tiempoCiudad1 = new TiempoCiudad(1, 'Navia');
var tiempoCiudad2 = new TiempoCiudad(2, 'Ribadeo');
var tiempoCiudad3 = new TiempoCiudad(3, 'Foz');
var tiempoCiudad4 = new TiempoCiudad(4, 'San Ciprián');
var tiempoCiudad5 = new TiempoCiudad(5, 'Viveiro');   
