console.log(apiKey);

{
    // default background image
    let body = document.getElementById('body')
    body.style= "background-image: url('../images/default.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover"

    //////////////////////////////
    // BUILD QUICK SEARCH FIELD //
    //////////////////////////////
    function buildNavQuickSearch(){
        console.log('Building quick search');
        let form = document.createElement('form')
        form.className = 'd-flex'
        form.action = ''
        form.id = 'quickForm'

        let input = document.createElement('input')
        input.placeholder = 'Quick Search By City...'
        input.id = 'navCityInput'
        
        let submit = document.createElement('button')
        submit.id = 'quickSubmitNav'
        submit.type = 'submit'
        submit.innerHTML = 'Search'
        
        let advButtonNav = document.createElement('button')
        advButtonNav.id = 'advButtonNav'
        advButtonNav.type = 'button'
        advButtonNav.innerHTML = 'Advanced&nbsp;Search'
        
    
        input.className = 'form-control me-2 mt-2 px-3 py-2 fs-5'
        submit.className = 'btn btn-outline-warning me-2 mt-2 px-3 py-2 fs-5'
        advButtonNav.className = 'btn btn-outline-light me-2 mt-2 px-3 py-2 fs-5'
        form.append(input)
        form.append(submit)
        form.append(advButtonNav)
        document.getElementById('navSearchBar').append(form)
        document.getElementById('advButtonNav').addEventListener('click', buildAdvancedSearchCard)
        document.getElementById('quickForm').addEventListener('submit', handleQuickSubmit)
    }


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
        document.getElementById('weatherData').innerHTML = ''
        document.getElementById('defaultForm').innerHTML = ''
        document.getElementById('defaultForm').style = ''
        // buildQuickSearch('nav')

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
        document.getElementById('weatherData').append(form)
        document.getElementById('advancedForm').addEventListener('submit', handleAdvSubmit)
    }


    // handle submit from quick form
    async function handleQuickSubmit(e){
        console.log('Handling QUICK Submit...');
        e.preventDefault()

        let cityInput;

        try{
            console.log('TRY defaultCityInput')
            cityInput = e.target.defaultCityInput.value;
        } catch {}

        try {
            console.log('CATCH navCityInput')
            cityInput = e.target.navCityInput.value;
        } catch {}

        if (cityInput){
            console.log(`SUBMITTED: city=${cityInput}`);
            
            let weatherData = await getWeatherData(cityInput)

            console.log('WEATHER INFO FROM NAV: ', weatherData);

            if (weatherData['cod'] >= '400') {
                buildErrorMessage()
            } else {
                console.log('building the weather data.');
                buildInfoPage(weatherData)
            }    
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

            console.log('WEATHER INFO FROM ADV SUBMIT: ', weatherData);
            if (weatherData['cod'] === '400') {
                buildErrorMessage()
            } else {
                console.log('building the weather data.');
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
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
            // https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1cdb39747dbb734b204e9195629e8a2e
        } else if (city && !country){
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)

        } else if (city && country){
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`)
            // https://api.openweathermap.org/data/2.5/weather?q=chicago,us&appid=1cdb39747dbb734b204e9195629e8a2e&units=imperial
            
        } else if (zip){
            res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}&units=imperial`)
            // http://api.openweathermap.org/geo/1.0/zip?zip=60631,us&appid=1cdb39747dbb734b204e9195629e8a2e&units=imperial
        }

        let data = await res.json()
        
        if (zip){
            let zipCity = data['name']
            let zipCountry = data['country']
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zipCity},${zipCountry}&appid=${apiKey}&units=imperial`)
            data = await res.json()
        }
        
        return data
    }



    ////////////////////////////////
    // BUILD INFORMATION FROM API //
    ////////////////////////////////

    function buildInfoPage(weatherData){
        document.getElementById('navSearchBar').innerHTML = ''
        buildNavQuickSearch()

        // clear out NAV SEARCH BAR DEFAULT FORM and MSG and ADVANCED SEARCH CARD and any other WEATHER DATA. It's new weather time.
        let defaultSearch = document.getElementById('defaultForm')
        defaultSearch.innerHTML = ''
        defaultSearch.style= ''

        document.getElementById('msg').innerHTML = ''
        document.getElementById('advSearchCard').innerHTML = ''
        document.getElementById('weatherData').innerHTML = ''

        // default, thunderstorm, drizzle, rain, snow, mist, smoke, haze, dust, fog, sand, ash, squail, tornado, clear, clouds        
        let possibleWeathers = ['clear', 'clouds', 'default', 'drizzle', 'fog', 'mist', 'rain', 'snow', 'thunderstorm', 'tornado']
        weather = weatherData['weather'][0]['main'].toLowerCase()
        if (possibleWeathers.includes(weather)){
            console.log('weather in the list');
            body.style= `background-image: url('../images/${weather}.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover`
        } else {
            body.style= "background-image: url('../images/default.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover"
        }

        console.log('Building Info Card...');
        // main weather desc, current temp, high, low, feels like, humidity, wind
        // console.log('City:', weatherData['name']);
        // console.log('Current Temp:', weatherData['main']['temp']);
        // console.log('Feels Like:', weatherData['main']['feels_like']);
        // console.log('Weather:', weatherData['weather'][0]['main']);
        // console.log('High:', weatherData['main']['temp_max']);
        // console.log('Low:', weatherData['main']['temp_min']);
        // console.log('Humidity:', weatherData['main']['humidity']);
        // console.log('Wind:', weatherData['wind']['speed']);

        if (weatherData['name']) {
//          ---------- ROW ----------
            let infoDiv = document.createElement('div')
            infoDiv.className = 'row'
            infoDiv.style = 'color:white; padding: 50px; margin: 9% 10%; border: 2px solid white; border-radius: 15px; background-color:rgba(0, 0, 50, 0.40)'

//          ---------- COLUMN 1: City, Temp, Feels Like ----------
            let col1 = document.createElement('div')            //
            col1.className = 'col-6'                            //
            col1.style=''                                       //
//          ------------------------------------------------------

            let city = document.createElement('p')
            city.innerHTML = `${weatherData['name']}, `
            city.style='font-size:9vh'

            let country = document.createElement('span')
            country.innerHTML = `${weatherData['sys']['country']}`
            country.style='font-size:5vh; color:lightgray'
            
            let currentTemp = document.createElement('h1')
            currentTemp.innerHTML = `${weatherData['main']['temp']}&deg;`
            currentTemp.style='font-size:15vh'
            
            let currWeather = document.createElement('p')
            currWeather.innerHTML = `${weatherData['weather'][0]['main']}`
            currWeather.style='font-size:6vh'


//          ----- COLUMN 2: weather, high, low, humidity, wind ---
            let col2 = document.createElement('div')            //
            col2.className = 'col-6'                            //
            col2.style='padding: 0 0 0 5%'                
//          ------------------------------------------------------

            let feelsLike = document.createElement('p')
            feelsLike.innerHTML = `Feels like ${weatherData['main']['feels_like']}&deg;`
            feelsLike.style='font-size:6vh; margin: 0 0 5vh 0;'

            let highTemp = document.createElement('p')
            highTemp.innerHTML = `High: ${weatherData['main']['temp_max']}&deg;`
            highTemp.style='font-size:3.5vh;'

            let lowTemp = document.createElement('p')
            lowTemp.innerHTML = `Low: ${weatherData['main']['temp_min']}&deg;`
            lowTemp.style='font-size:3.5vh; margin: 0 0 5vh 0;'

            let humidity = document.createElement('p')
            humidity.innerHTML = `Humidity: ${weatherData['main']['humidity']}%`
            humidity.style='font-size:3.5vh'

            let wind = document.createElement('p')
            wind.innerHTML = `Wind: ${weatherData['wind']['speed']} MPH`
            wind.style='font-size:3.5vh'


            col1.append(city)
            city.append(country)
            col1.append(currentTemp)
            col1.append(currWeather)
            infoDiv.append(col1)
            
            col2.append(feelsLike)
            col2.append(highTemp)
            col2.append(lowTemp)
            col2.append(humidity)
            col2.append(wind)
            infoDiv.append(col2)
            document.getElementById('weatherData').append(infoDiv) // spelled the .getElementById of the same element out twice for clarity
        }
        
    }

    /*
        TESTING
    */
    // async function test(){
    //     let testWeather = await getWeatherData('Chicago','','','','')
    //     buildInfoPage(testWeather)
    // }
    // test()


    function buildErrorMessage(){
        console.log('Building Error Message...');
        let defaultSearch = document.getElementById('defaultForm')
        defaultSearch.innerHTML = ''
        defaultSearch.style= ''

        document.getElementById('msg').innerHTML = ''
        document.getElementById('advSearchCard').innerHTML = ''
        document.getElementById('weatherData').innerHTML = ''


        let infoDiv = document.createElement('div')
        infoDiv.className = 'text-center'
        infoDiv.style = 'color:white; padding: 50px; margin: 9% 9%; border: 2px solid white; border-radius: 15px; background-color:rgba(0, 0, 50, 0.40); font-size: 3.5vh'
        infoDiv.innerHTML = 'Sorry! We couldn\'t find any information for that location.<br>Please try again.'

        document.getElementById('weatherData').append(infoDiv)
    }

    
    
    document.getElementById('advButton').addEventListener('click', buildAdvancedSearchCard)
    document.getElementById('defaultForm').addEventListener('submit', handleQuickSubmit)
}
