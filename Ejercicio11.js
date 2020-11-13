class Noticias {

    constructor() {
       
        var _this = this;

        var url = 'Access-Control-Allow-Origin: http://newsapi.org/v2/top-headlines?' +
                    'country=us&' +
                    'apiKey=59b9e814f29d444a9f135bd4af9f296a';
        var req = new Request(url);

        $.getJSON(req, function (datos) {
        
            console.log(datos);

            datos.articles.forEach(function (articulo) {

                var noticia = $('<article>')
                    .appendTo('#noticias');
                
                $('<h2/>')
                    .text(articulo.title)
                    .appendTo(noticia);

                $('<p/>')
                    .text(articulo.description)
                    .appendTo(noticia);

                $('<p/>')
                    .text(articulo.content)
                    .appendTo(noticia);

                var pEnlace = $('<p/>')
                    .appendTo(noticia);

                $('<a/>')
                    .attr('href', articulo.url)
                    .text('Ver la noticia')
                    .appendTo(pEnlace);

                $('<p/>')
                    .text('Fecha de la publicación: ' + articulo.publishedAt)
                    .appendTo(noticia);

            });
            
        });
        
}

}

$(document).ready(function () {
    new Noticias();
});