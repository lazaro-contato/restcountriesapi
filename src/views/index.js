/* Adicionando a função do filtro de continentes */

$(document).ready(function(){
    $(".drop-data").click(function(){
        $(".dropdown ul").toggleClass("active");
    })

    $(".drop-data").click(function(){
        $(".dropdown ul li").click(function(){
            var text = $(this).text();
            $(".default-option").text(text);
            $(".dropdown ul").removeClass("active");
        });
    })
})

 