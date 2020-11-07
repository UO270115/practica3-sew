"use strict";
class TiempoCiudad {

    constructor(index, ciudad) {
        this.apiKey = "f98c39c894e877e62ac8f132fbbc4991"; // my API Key
        this.index = index;
        this.ciudad = ciudad;
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apiKey;

        this.cargarDatos(this.index);
    }

    cargarDatos(index){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("pre").text(JSON.stringify(datos, null, 2));
                alert("¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                console.log(datos);
                $('#ciudad th').eq(index).text(datos.name);
                $('#pais td').eq(index).text(datos.sys.country);
                $('#latitud td').eq(index).text(datos.coord.lat);
                $('#longitud td').eq(index).text(datos.coord.lon);
                $('#amanece td').eq(index).text(new Date(datos.sys.sunrise *1000).toLocaleTimeString());
                $('#anochece td').eq(index).text(new Date(datos.sys.sunset *1000).toLocaleTimeString());
                $('#hora td').eq(index).text(new Date(datos.dt *1000).toLocaleTimeString());
                $('#fecha td').eq(index).text(new Date(datos.dt *1000).toLocaleDateString());
                $('#temperatura td').eq(index).text(datos.main.temp);
                $('#temperaturaMinima td').eq(index).text(datos.main.temp_min);
                $('#temperaturaMaxima td').eq(index).text(datos.main.temp_max);
                $('#presion td').eq(index).text(datos.main.pressure);
                $('#humedad td').eq(index).text(datos.main.humidity);
                $('#visibilidad td').eq(index).text(datos.visibility);
                $('#nubosidad td').eq(index).text(datos.clouds.all+"%");    
                $('#descripcion td').eq(index).text(datos.weather[0].description); 
                $('#direccionViento td').eq(index).text(datos.wind.deg); 
                $('#velocidadViento td').eq(index).text(datos.wind.speed); 
                $('#icono td').eq(index).html('<img src="http://openweathermap.org/img/w/' + datos.weather[0].icon + '.png"/>');
            },
            error: function(){
                alert("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
            }   
        });
    }

}
$(document).ready(function () {
    new TiempoCiudad(1, 'Ribadeo');
    new TiempoCiudad(2, 'San Ciprián');
    new TiempoCiudad(3, 'Viveiro');    
});