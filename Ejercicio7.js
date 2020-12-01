"use strict";
class Query {

    constructor () {   
        this.descripcionOriginal = "";
        this.sinapsisOriginal = "";
    }
    
    ocultar(){
        $("p").hide();
    }

    mostrar(){
        $("p").show();
    }

    cambiar(){
        this.descripcionOriginal = $("#descripcion").html();
        this.sinapsisOriginal = $("#sinapsis").html();
        $("#descripcion").text("Aquí debería ir la descripción");
        $("#sinapsis").text("Aquí debería ir la sinapsis");
    }

    reset(){
        $("#descripcion").text(this.descripcionOriginal);
        $("#sinapsis").text(this.sinapsisOriginal);
    }

    añadir(){
        $("#section").before("<div id='peliculas'><h2>Películas</h2><ul'> " 
            + "<li>The Terminator (1984)</li><li>Terminator 2: El juicio final (1991)</li>"
            + "<li>Terminator 3: La rebelión de las máquina (2003)</li><li lang='en'>Terminator Salvation (2009)</li>"
            + "<li>Terminator Génesis (2015)</li><li>Terminator: Destino Oscuro (2019)</li></ul></div>");
    }

    eliminar(){
        $("#peliculas").remove();
    }

    // recorrer todos los elementos HTML y mostrar de cada uno de ellos:
    // quien es su elemento padre y que tipo de elemento es
    recorrer(){
        var counter = 0;
        $("*", document.body).each(function() {
            var padre = $(this).parent().get(0);
            this.result = "<p id='recorrer" + counter + "'>Elemento padre: " + padre.tagName + " tipo: " + $(this).get(0).tagName + "</p>";
            if(counter == 0){
                $("#section").before("<section><h2 id='tarea5'>Tarea5</h2>");
                $("#tarea5").after(this.result);
            }else{
                 var aux = counter - 1;
                $("#recorrer" + aux).after(this.result);
            }
            counter++;
        });
        $("#tarea5").after("</section>");
    }

    ampliarTabla(){
        var nfilas = prompt ("Ampliación de la tabla de doblaje: introducir el número de filas a añadir");
        var ncolumnas = prompt ("Cálculo del factorial: introducir el número de columnas a añadir");

        var cols = 0;
        $("#tr > th").each(function(){
            cols++;
        });
        var counter = 1;
        var columnaEncabezado = "";
        var restoColumna = "";
        while(counter <= ncolumnas){
            columnaEncabezado += "<th></th>";
            restoColumna += "<td></td>";
            counter++;
        }
        if(columnaEncabezado.length > 0){
            $('#tabla').find('th').eq(cols-1).after(columnaEncabezado);
            $('#tabla').find('tr').each(function () {
                    $(this).find('td').eq(cols-1).after(restoColumna);
                });
        }
        
        counter = 1;
        while(counter <= nfilas){
            var counter2 = 1;
            var fila = '<tr>';
            var currentNumberColumns = parseInt(cols) + parseInt(ncolumnas);
            while(counter2 <= currentNumberColumns){
                fila += '<td></td>'
                counter2++;
            }
            fila += '</tr>';
            $('#tabla').append(fila);
            counter++;
        }
    }

}
var query = new Query();