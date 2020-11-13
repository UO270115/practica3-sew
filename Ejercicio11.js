class Noticias {

    constructor() {
       
        var _this = this;

        var url = 'Access-Control-Allow-Origin: http://newsapi.org/v2/everything?q=Apple&from=2020-11-13&sortBy=popularity&apiKey=59b9e814f29d444a9f135bd4af9f296a';
        //var url = "Access-Control-Allow-Origin: http://newaspi.org/v2/top-headlines?sources=bbc-news&q=&from=&apiKey=eced2dc2f05c408fbebbf249fb3ef2f4";

        var req = new Request(url);

        /*
        fetch(req).then(function(response) {
            console.log(response.json());
        })*/

        $.getJSON(req).done(function(data){
                console.log(data);
            }
        );

       
        /*
        $.getJSON('https://newsapi.org/v2/top-headlines?sources=cnn-es&apiKey=0d00570bc7a0493b9e526c95fc081132', function (datos) {
        
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
            
        });*/
        
}

}

$(document).ready(function () {
    new Noticias();
});