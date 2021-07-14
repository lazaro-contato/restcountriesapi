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

            fetch('https://restcountries.eu/rest/v2/all').then((response) =>{
            response.json().then((data) => {
                data.forEach(country => {
                    const element = 
                    `<section class="card-country">
                    <div>
                      <img src="${country.flag}" alt="country-flag"> 
                    </div>
                    <div class="country-info">
                      <h3 class="country-name">${country.name}</h3>
                      <p>Population: <span>${country.population}</span></p>
                      <p>Region: <span>${country.region}</span></p>
                      <p>Capital: <span>${country.capital}</span></p>
                    </div>
                   </section>`

                   $(".card-model").append(element)
                   console.log(response)
                });
            })
        }
        )
})




 