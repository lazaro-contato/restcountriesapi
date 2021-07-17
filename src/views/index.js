/* Adicionando a função do filtro de continentes */

$(document).ready(function () {
  $(".drop-data").click(function () {
    $(".dropdown ul").toggleClass("active");
  });

  $(".drop-data").click(function () {
    $(".dropdown ul li").click(function () {
      var text = $(this).text();
      $(".default-option").text(text);
      $(".dropdown ul").removeClass("active");
    });
  });

fetch("https://restcountries.eu/rest/v2/all").then((response) => {
    response.json().then((data) => {
      data.forEach((country) => {

        let countryName = country.name;
        let countryPopulation = country.population;
        let countryRegion = country.region;
        let countryCapital = country.capital;

        const element = `<section class="card-country">
                    <div>
                      <img src="${country.flag}" alt="country-flag"> 
                    </div>
                      <div class="country-info">
                      <h3 class="country-name">${countryName}</h3>
                      <p class="population-number">Population: <span>${countryPopulation}</span></p>
                      <p>Region: <span>${countryRegion}</span></p>
                      <p>Capital: <span>${countryCapital}</span></p>
                    </div>
                   </section>`;

        $(".card-model").append(element);
        
      });
      $(".card-country").click(function () {
        const countryNameClicked = $(this).children(".country-info").children(".country-name").text().toLowerCase().replace(" ","%20");

        fetch (`https://restcountries.eu/rest/v2/name/${countryNameClicked}`).then((response) => {
          response.json()
        })
        console.log(countryNameClicked)


      });
     
    });
  });
});
