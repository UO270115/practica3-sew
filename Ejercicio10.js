"use strict;"
class Noticias {

    constructor() {
        this.actualizar();
    }

    actualizar(){
        var fechaHoy = new Date;
        var week = fechaHoy.getDate() - 7;
        var fechaHaceUnaSemana = new Date(fechaHoy.setDate(week)).toLocaleDateString("es-ES");

        this.url = "https://gnews.io/api/v4/search?everything?&q=COVID&lang=es&country=es&from=" + fechaHaceUnaSemana + "&sortBy=publishedAt&token=2956d20a0e0f5189c281f15099a359ee";

        $.ajax({
            dataType: "json",
            url: this.url,
            method: "GET",
            success: function(datos){
                $("pre").text(JSON.stringify(datos, null, 2));
                console.log(datos);
                datos.articles.forEach(function (articulo) {
                    var noticia = "";
                    noticia += "<article>";
                    noticia += "<h2>" + articulo.title + "</h2>";
                    noticia += "<p>" + articulo.description + "</p>";
                    noticia += "<p>" + articulo.content + "</p>";
                    noticia += "<img src='" + articulo.image + "' alt='Foto representativa de la noticia' height='500' width='100%'/>";
                    noticia += "<p>Fuente de información: " + articulo.source.name + "</p>";
                    noticia += "<p>Fecha de la punlicación: " + articulo.publishedAt + "</p>";
                    noticia += "<a href='" + articulo.url + "'>Ver la noticia completa</a>";
                    noticia += "</article>";
                    $(noticia).appendTo("#noticias");
                });
            },
            error: function(){
                alert("¡Tenemos problemas al cargar las noticias!</a>");
            }   
        });
    }
}
$(document).ready(function () {
    //Cada 60 segundos (60000 milisegundos) se ejecutará la función refrescar
    var noticias = new Noticias();
    //setTimeout(noticias.actualizar, 60000);
});