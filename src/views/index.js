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

        const element = `<section class="card-country" id="${countryName}">
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

          // Defining the variables //
           let currentCountry = dataCountry[0]
           let singleCountryFlag = currentCountry.flag
           let singleCountryName = currentCountry.name;
           let singleCountryNativeName = currentCountry.nativeName;
           let singleCountryPopulation = currentCountry.population;
           let singleCountryRegion = currentCountry.region;
           let singleCountrySubRegion = currentCountry.subregion;
           let singleCountryCapital = currentCountry.capital;
           let singleCountryTopLevelDomain = currentCountry.topLevelDomain;
           


           // Adding the currencies of a country in a string //
           let arrayCurrencies = []
           currentCountry.currencies.forEach((currencies) => {
             let countryCurrency = currencies.name
             arrayCurrencies.push(countryCurrency)
             let stringCurrencies = arrayCurrencies.toString().replaceAll(",", ", ")
             localStorage.setItem('currencies', `${stringCurrencies}`)
           });


           // Adding the languages of a country in a string //
           let arrayLanguages = []
           currentCountry.languages.forEach((languages) => {
            let countryLanguage = languages.name
            arrayLanguages.push(countryLanguage)
            let stringLanguages = arrayLanguages.toString().replaceAll(",", ", ")
            localStorage.setItem('languages', `${stringLanguages}`)
           })

           // Adding the border countries in a string //
           let arrayBorderCountries = []
           currentCountry.borders.forEach((borders) => {
             let countryBorders = borders
             arrayBorderCountries.push(countryBorders)
             let stringBorders = arrayBorderCountries.toString().replaceAll(",", ", ")
             localStorage.setItem('borderCountries', `${stringBorders}`)
           })


           // Adding the values of API to local storage //
           localStorage.setItem('flag', `${singleCountryFlag}`)
           localStorage.setItem('name', `${singleCountryName}`)
           localStorage.setItem('nativeName', `${singleCountryNativeName}`)
           localStorage.setItem('population', `${singleCountryPopulation}`)
           localStorage.setItem('region', `${singleCountryRegion}`)
           localStorage.setItem('subregion', `${singleCountrySubRegion}`)
           localStorage.setItem('capital', `${singleCountryCapital}`)
           localStorage.setItem('topLevelDomain', `${singleCountryTopLevelDomain}`)

           

           window.location = "country.html"

           console.log(dataCountry)
           console.log(dataCountry[0].borders)
         })   
        })
      });

        // Selecting the elements in country.html and assigning the text of the local storage //
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
         $(".borders-text").text(`${localStorage.getItem('borderCountries')}`)

    });
  });

  $(".back-button").click(() => {
    window.location = "index.html"
  })

  $(".separator-header h3").click(() => {
    window.location = "index.html"
  })

  $(".input-box").keyup(() => {
    var input = $("#input-name-country");
    var filter = input[0].value.toUpperCase();
    var cards = $(".card-country")

    console.log(input)
    console.log(filter)

    for (i = 0; i < cards.length; i++){
      a = cards[i].getElementsByTagName("h3")[0]
      textCountry = a.textContent || a.innetText;
      if(textCountry.toUpperCase().indexOf(filter) > -1){
        cards[i].style.display = ""
      } else {
        cards[i].display = "none";
      }
      
    }
  })

});
