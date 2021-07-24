
/* Adding a continents filter function */

$(document).ready(function () {

  // variable of actives countries //
  let activesCountries = [];


  // Filter of regions //
  $(".drop-data").click(function () {
    $(".dropdown ul").toggleClass("active");
  });

  $(".drop-data").click(function () {
    $(".dropdown ul li").click(function () {
      var text = $(this).text();

        $(".default-option").text(text);
        $(".dropdown ul").removeClass("active");
        
        RegionFilter(text)

        if (text == "All"){
          var countryCards = $(".card-country");
          for(var i = 0; i < countryCards.length; i++){
            activesCountries = $(".card-country");
            countryCards[i].style.display = "";
        }
      }
    });
  });

  fetch("https://restcountries.eu/rest/v2/all").then((response) => {
    response.json().then((data) => {
      data.forEach((country) => {

        let countryName = country.name;
        let countryPopulation = country.population.toLocaleString();
        let countryRegion = country.region;
        let countryCapital = country.capital;

        const element = `<section class="card-country" id="${countryName}">
                    <div>
                      <img src="${country.flag}" alt="country-flag"> 
                    </div>
                      <div class="country-info">
                      <h3 class="country-name">${countryName}</h3>
                      <p class="population-number">Population: <span>${countryPopulation}</span></p>
                      <p class="regionCountryCard">Region: <span>${countryRegion}</span></p>
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
           let singleCountryFlag = currentCountry.flag;
           let singleCountryName = currentCountry.name;
           let singleCountryNativeName = currentCountry.nativeName;
           let singleCountryPopulation = currentCountry.population.toLocaleString();
           let singleCountryRegion = currentCountry.region;
           let singleCountrySubRegion = currentCountry.subregion;
           let singleCountryCapital = currentCountry.capital;
           let singleCountryTopLevelDomain = currentCountry.topLevelDomain;
           
           // Adding the currencies of a country in a string //
           let arrayCurrencies = []
           currentCountry.currencies.forEach((currencies) => {
             let countryCurrency = currencies.name;
             arrayCurrencies.push(countryCurrency);
             let stringCurrencies = arrayCurrencies.toString().replaceAll(",", ", ");
             localStorage.setItem('currencies', `${stringCurrencies}`);
           });


           // Adding the languages of a country in a string //
           let arrayLanguages = []
           currentCountry.languages.forEach((languages) => {
            let countryLanguage = languages.name;
            arrayLanguages.push(countryLanguage);
            let stringLanguages = arrayLanguages.toString().replaceAll(",", ", ");
            localStorage.setItem('languages', `${stringLanguages}`);
           })

           // Adding the border countries in a string //
           let arrayBorderCountries = []
           currentCountry.borders.forEach((borders) => {
             
             let countryBorders = borders;
             arrayBorderCountries.push(countryBorders);

             let stringBorders = arrayBorderCountries.toString().replaceAll(",", ", ");
             localStorage.setItem('borderCountries', `${stringBorders}`);
           })


           // Adding the values of API to local storage //
           localStorage.setItem('flag', `${singleCountryFlag}`);
           localStorage.setItem('name', `${singleCountryName}`);
           localStorage.setItem('nativeName', `${singleCountryNativeName}`);
           localStorage.setItem('population', `${singleCountryPopulation}`);
           localStorage.setItem('region', `${singleCountryRegion}`);
           localStorage.setItem('subregion', `${singleCountrySubRegion}`);
           localStorage.setItem('capital', `${singleCountryCapital}`);
           localStorage.setItem('topLevelDomain', `${singleCountryTopLevelDomain}`);

           window.location = "country.html";

         })   
        })
      });

        // Selecting the elements in country.html and assigning the text of the local storage //
         $(".first-country-flag").attr("src", `${localStorage.getItem('flag')}`);
         $(".mainCountryName").text(`${localStorage.getItem('name')}`);
         $(".native-name-text").text(`${localStorage.getItem('nativeName')}`);
         $(".population-text").text(`${localStorage.getItem('population')}`);
         $(".region-text").text(`${localStorage.getItem('region')}`);
         $(".sub-region-text").text(`${localStorage.getItem('subregion')}`);
         $(".capital-text").text(`${localStorage.getItem('capital')}`);
         $(".top-level-domain-text").text(`${localStorage.getItem('topLevelDomain')}`);
         $(".currencies-text").text(`${localStorage.getItem('currencies')}`);
         $(".language-text").text(`${localStorage.getItem('languages')}`);
         $(".borders-text").text(`${localStorage.getItem('borderCountries')}`);


    });
  });

  $(".back-button").click(() => {
    window.location = "index.html";
  })

  $(".separator-header h3").click(() => {
    $(".population-number").mask("#,##0.00", {reverse: true});
    // window.location = "index.html";// 
  })

  // Adding the filter to the input

$(".input-box").keyup(() => {
  var input = $("#input-name-country");
  var inputData = input[0];
  var filter = inputData.value.toUpperCase();
  var cards = activesCountries;

  for (i = 0; i < cards.length; i++){
    a = cards[i].getElementsByTagName("h3")[0]
    textCountry = a.textContent || a.innetText; 
    if(textCountry.toUpperCase().indexOf(filter) > -1){
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
});

// Adding the filter to the dropdown

function RegionFilter(region) {
  var regionFilterName = region.toUpperCase();
  var country = $(".card-country");
  var arrayActivesRegion = [];

  for (i = 0; i < country.length; i++){
    a = country[i].getElementsByClassName("regionCountryCard")[0];
    textCountry = a.textContent || a.innetText; 

      if(textCountry.toUpperCase().indexOf(regionFilterName) > -1){
        country[i].style.display = "";
        arrayActivesRegion.push(country[i]);
      } else {
        country[i].style.display = "none";
      } 
  }  
  activesCountries = arrayActivesRegion;
}



})