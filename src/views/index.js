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
         .then(dataCountry => {

           let currentCountry = dataCountry[0]
           let singleCountryFlag = currentCountry.flag
           let singleCountryName = currentCountry.name;
           let singleCountryNativeName = currentCountry.nativeName;
           let singleCountryPopulation = currentCountry.population;
           let singleCountryRegion = currentCountry.region;
           let singleCountrySubRegion = currentCountry.subregion;
           let singleCountryCapital = currentCountry.capital;
           let singleCountryTopLevelDomain = currentCountry.topLevelDomain;
           let singleCountryCurrencies = currentCountry.currencies;
           let singleCountryLanguages = currentCountry.languages;
     
           localStorage.setItem('flag', `${singleCountryFlag}`)
           localStorage.setItem('name', `${singleCountryName}`)
           localStorage.setItem('nativeName', `${singleCountryNativeName}`)
           localStorage.setItem('population', `${singleCountryPopulation}`)
           localStorage.setItem('region', `${singleCountryRegion}`)
           localStorage.setItem('subregion', `${singleCountrySubRegion}`)
           localStorage.setItem('capital', `${singleCountryCapital}`)
           localStorage.setItem('topLevelDomain', `${singleCountryTopLevelDomain}`)
           localStorage.setItem('currencies', `${singleCountryCurrencies}`)
           localStorage.setItem('languages', `${singleCountryLanguages}`)

           console.log(dataCountry)
           window.location = "country.html"
         })   
        })
      });
         $(".first-country-flag").attr("src", `${localStorage.getItem('flag')}`)
         $(".mainCountryName").text(`${localStorage.getItem('name')}`)
         $(".native-name-text").text(`${localStorage.getItem('nativeName')}`)
         $(".population-text").text(`${localStorage.getItem('population')}`)
         $(".region-text").text(`${localStorage.getItem('region')}`)
         $(".sub-region-text").text(`${localStorage.getItem('subregion')}`)
         $(".capital-text").text(`${localStorage.getItem('capital')}`)
         $(".top-level-domain-text").text(`${localStorage.getItem('topLevelDomain')}`)
         $(".currencies-text").text(`${localStorage.getItem('currencies')}`)
         $(".language-text").text(`${localStorage.getItem('languages')}`)
    });
  });
});
