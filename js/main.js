console.log(apiKey);

{
    /////////////////////////////
    // BUILD SEARCH BAR IN NAV //
    /////////////////////////////

    // <form class="d-flex" id="navForm">
    //     <input class="form-control me-2" placeholder="Quick Search by City..." id="navCityInput">
    //     <button class="btn btn-outline-warning me-2" type="submit">Search</button>
    //     <a class="btn btn-outline-light" href="./advancedsearch.html">Advanced&nbsp;Search</a>
    // </form>
    function buildNavSearch(){
        let form = document.createElement('form')
        form.className = 'd-flex'
        form.id = 'navForm'
        
        let input = document.createElement('input')
        input.className = 'form-control me-2'
        input.placeholder = 'Quick Search By City'
        input.id = 'navCityInput'
        
        let submit = document.createElement('button')
        submit.className = 'btn btn-outline-warning me-2'
        submit.type = 'submit'
        submit.innerHTML = 'Search'

        let advButton = document.createElement('button')
        advButton.type = 'button'
        advButton.innerHTML = 'Advanced&nbsp;Search'
        advButton.className = 'btn btn-outline-light'
        
        form.append(input)
        form.append(submit)
        form.append(advButton)
        
        document.getElementById('navSearchBar').append(form)
        advButton.addEventListener('click', buildAdvancedSearchCard)
    }

    buildNavSearch()


    ////////////////////////////////
    // BUILD ADVANCED SEARCH CARD //
    ////////////////////////////////

    // <div class="card text-center" style="margin: 10vh 20vw">
    //     <div class="card-header">Advanced Search</div>
    //         <div class="card-body">
    //             <form action="" id="advancedForm">
    //                 <div class="form-group row justify-content-center">
    //                     <div class="col-8">
    //                         <input class="form-control mt-3" name="season" type="text" placeholder="City" id="cityInput">
    //                         <input class="form-control mt-3" name="round" type="text" placeholder="Country" id="countryInput">
    //                         <input class="form-control mt-3" name="round" type="text" placeholder="Zip Code" id="zipInput">
    //                         <input class="form-control mt-3" name="round" type="text" placeholder="Latitude" id="latInput">
    //                         <input class="form-control mt-3" name="round" type="text" placeholder="Longitude" id="lonInput">
    //                         <button type="submit" class="mt-3 w-100 btn btn-dark">Submit</button>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </div>
    function buildAdvancedSearchCard(){
        document.getElementById('navSearchBar').innerHTML = ''

        let cityInp = document.createElement('input')
        cityInp.className = 'form-control mt-4 p-3 fs-5'
        cityInp.type = 'text'
        cityInp.placeholder = 'City...'
        cityInp.id = 'cityInput'
        
        let countryInp = document.createElement('input')
        countryInp.className = 'form-control mt-4 p-3 fs-5'
        countryInp.type = 'text'
        countryInp.placeholder = 'Country...'
        countryInp.id = 'countryInput'

        let zipInp = document.createElement('input')
        zipInp.className = 'form-control mt-4 p-3 fs-5'
        zipInp.type = 'text'
        zipInp.placeholder = 'Zip Code...'
        zipInp.id = 'zipInput'

        let latInp = document.createElement('input')
        latInp.className = 'form-control mt-4 p-3 fs-5'
        latInp.type = 'text'
        latInp.placeholder = 'Latitude...'
        latInp.id = 'latInput'

        let lonInp = document.createElement('input')
        lonInp.className = 'form-control mt-4 p-3 fs-5'
        lonInp.type = 'text'
        lonInp.placeholder = 'Longitude...'
        lonInp.id = 'lonInput'

        // <button type="submit" class="mt-4 p-3 fs-5 w-100 btn btn-dark">Submit</button>
        let submitButton = document.createElement('button')
        submitButton.className = 'mt-4 p-3 fs-5 w-100 btn btn-dark'
        submitButton.type = 'submit'
        submitButton.innerHTML = 'Submit'


        // making the boxes to put the main form in.
        let col8 = document.createElement('div')
        
        let formGroup = document.createElement('div')
        formGroup.className = 'form-group row justify-content-center'
        col8.className = 'col-8'
        
        let form = document.createElement('form')
        form.action = ''
        form.id = 'advancedForm'
        form.style='margin: 10vh 20vw'
        
        col8.append(cityInp)
        col8.append(countryInp)
        col8.append(zipInp)
        col8.append(latInp)
        col8.append(lonInp)
        col8.append(submitButton)
        formGroup.append(col8)
        form.append(formGroup)
        document.getElementById('advSearchCard').append(form)
    }

    // which form are we submitting?
    let navForm = document.getElementById('navForm')
    let advancedForm = document.getElementById('advancedForm')

    // handle submit from nav form
    async function handleNavSubmit(e){
        console.log('Handling NAV Submission...');
        e.preventDefault()

        let cityInput = e.target.navCityInput.value;
        if (cityInput){
            console.log(`SUBMITTED: city=${cityInput}`);
            
            let weatherData = await getWeatherData(cityInput)
            e.target.cityInput = ''
    
            console.log('WEATHER INFO FROM NAV: ', weatherData);
            buildInfoPage(weatherData)
        } else {
            console.warn('Nav search is empty');
        }
    }


    async function handleAdvSubmit(e){
        console.log('Handling ADVANCED Submission...');
        e.preventDefault()

        let cityInput = e.target.cityInput.value;
        let countryInput = e.target.countryInput.value;
        let zipInput = e.target.zipInput.value;
        let latInput = e.target.latInput.value;
        let lonInput = e.target.lonInput.value;

        console.log(`SUBMITTED: city=${cityInput} country=${countryInput} zip=${zipInput} lat=${latInput} lon=${lonInput}`);
        // if city alone, that's okay
        // if zip but no country, ERROR
        // if country but neither city nor zip, ERROR
        // if lat but no lon, ERROR
        // if lon but no lat, ERROR
        if (zipInput && !countryInput) {
            console.warn('YES zip; NO country');
            buildErrorMessage();

        } else if (countryInput && (!zipInput && !cityInput)) {
            console.warn('YES country; NEITHER zip nor city');
            buildErrorMessage();

        } else if ((latInput && !lonInput) || (lonInput && !latInput)) {
            console.warn('YES lat, NO lon; YES lon, NO lat');
            buildErrorMessage();
        } else {
            let weatherData = await getWeatherData(cityInput, countryInput, zipInput, latInput, lonInput)
            cityInput.value = ''
            countryInput.value = ''
            zipInput.value = ''
            latInput.value = ''
            lonInput.value = ''

            console.log('WEATHER INFO FROM ADV SUBMIT: ', weatherData);
            if (weatherData['cod'] === '400') {
                console.warn('Data not found');
                
                let cardPos = document.createElement('div')
                cardPos.className = 'd-flex justify-content-center'

                // make a card with Data Not Found
                let card = document.createElement('div')
                card.className = 'card text-white bg-danger mb-3'
                card.style = 'max-width: 18rem;'

                let cardBody = document.createElement('div')
                cardBody.className = 'card-body'
                
                let cardTitle = document.createElement('div')
                cardTitle.className = 'card-title'
                cardTitle.innerHTML = '400'

                let cardText = document.createElement('p')
                cardText.className = 'card-text'
                cardText.innerHTML = 'Sorry! We couldn\'t find anything for that location. Try again.'
                
                cardBody.append(cardTitle)
                cardBody.append(cardText)
                card.append(cardBody)
                cardPos.append(card)

                let display = document.getElementById('weatherData')
                display.innerHTML = ''
                display.append(cardPos)

            } else {
                buildInfoPage(weatherData)
            }
            
        }
    }

    
    async function getWeatherData(city, country, zip, lat, lon){
        console.log('Getting Weather Data...');

        // if zip code, call zip & country
        // if city, call city
        // if city and country, call city and country
        // if lat, call lat & lon
        let res;
        // latitude and longitude at the top bc it's the most specific.
        if (lat) {
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

        } else if (city && !country){
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

        } else if (city && country){
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
            
        } else if (zip){
            res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}`)
        }

        let data = await res.json()
        return data
    }

    

    ////////////////////////////////
    // BUILD INFORMATION FROM API //
    ////////////////////////////////

    function buildInfoPage(weatherData){
        console.log('Building Info Cards...');
        // main weather desc, current temp, high, low, feels like, humidity, wind
        console.log('City:', weatherData['name']);
        console.log('Weather:', weatherData['weather'][0]['main']);
        console.log('Current Temp:', weatherData['main']['temp']);
        console.log('High:', weatherData['main']['temp_max']);
        console.log('Low:', weatherData['main']['temp_min']);
        console.log('Feels Like:', weatherData['main']['feels_like']);
        console.log('Humidity:', weatherData['main']['humidity']);
        console.log('Wind:', weatherData['wind']['speed']);


        if (weatherData['cod'] === 400) {
            let 
        }
    }


    function buildErrorMessage(...missing){
        console.log('Building Error Message...');
    }


    if (navForm){
        navForm.addEventListener('submit', handleNavSubmit)
    }
    if (advancedForm){
        advancedForm.addEventListener('submit', handleAdvSubmit)
    }

}