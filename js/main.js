console.log(apiKey);

{
    // default background image
    let body = document.getElementById('body')
    body.style= "background-image: url('../images/sunset.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover"


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
        document.getElementById('advSearchCard').innerHTML = ''
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
        document.getElementById('advSearchCard').append(form)
    }


    // handle submit from quick form
    async function handleQuickSubmit(e){
        console.log('Handling QUICK Submit...');
        e.preventDefault()

        let cityInput = e.target.navCityInput.value;
        if (cityInput){
            console.log(`SUBMITTED: city=${cityInput}`);
            
            let weatherData = await getWeatherData(cityInput)
            // e.target.cityInput = ''
    
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
            // cityInput.value = ''
            // countryInput.value = ''
            // zipInput.value = ''
            // latInput.value = ''
            // lonInput.value = ''

            console.log('WEATHER INFO FROM ADV SUBMIT: ', weatherData);
            if (weatherData['cod'] === '400') {
                // <div class="alert alert-danger" role="alert"> A simple danger alert—check it out! </div>
                console.warn('Data not found');

                let notFoundAlert = document.createElement('div')
                notFoundAlert.className = 'alert alert-warning alert-dismissible fade show'
                notFoundAlert.role = 'alert'


                let msg = document.createElement('h5')
                msg.innerHTML = 'Sorry! We couldn\'t find anything for that location. Try again.'

                // <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                let closeB = document.createElement('button')
                closeB.type = 'button'
                closeB.className = 'btn-close'

                notFoundAlert.append(msg)
                notFoundAlert.append(closeB)

                let display = document.getElementById('msg')
                display.innerHTML = ''
                display.append(notFoundAlert)
                closeB.addEventListener('click', () => {display.innerHTML = ''})
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
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)

        } else if (city && !country){
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)

        } else if (city && country){
            res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`)
            
        } else if (zip){
            res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}&units=imperial`)
        }

        let data = await res.json()
        return data
    }

    
    function buildNavQuickSearch(){

    }



    ////////////////////////////////
    // BUILD INFORMATION FROM API //
    ////////////////////////////////

    function buildInfoPage(weatherData){
        let navSearch = document.getElementById('navForm')
        navSearch.innerHTML = ''
        navSearch.style= ''
        console.log('Building Info Cards...');
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
            city.innerHTML = `${weatherData['name']}`
            city.style='font-size:9vh'
            
            let currentTemp = document.createElement('h1')
            currentTemp.innerHTML = `${weatherData['main']['temp']}&deg;`
            currentTemp.style='font-size:15vh'
            
            let feelsLike = document.createElement('p')
            feelsLike.innerHTML = `Feels like ${weatherData['main']['feels_like']}&deg;`
            feelsLike.style='font-size:4vh'


//          ----- COLUMN 2: weather, high, low, humidity, wind ---
            let col2 = document.createElement('div')            //
            col2.className = 'col-6'                            //
            col2.style='padding: 0 0 0 5%'                
//          ------------------------------------------------------

            let currWeather = document.createElement('p')
            currWeather.innerHTML = `${weatherData['weather'][0]['main']}`
            currWeather.style='font-size:9vh'

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
            col1.append(currentTemp)
            col1.append(feelsLike)
            infoDiv.append(col1)

            col2.append(currWeather)
            col2.append(highTemp)
            col2.append(lowTemp)
            col2.append(humidity)
            col2.append(wind)
            infoDiv.append(col2)
            document.getElementById('weatherData').append(infoDiv)
        }
        
    }

    /*
        TESTING
    */
    async function test(){
        let testWeather = await getWeatherData('Chicago','','','','')
        buildInfoPage(testWeather)
    }
    test()


    function buildErrorMessage(...missing){
        console.log('Building Error Message...');
    }

    
    
    document.getElementById('advButton').addEventListener('click', buildAdvancedSearchCard)
    document.getElementById('navForm').addEventListener('submit', handleQuickSubmit)
    try {
        document.getElementById('advancedForm').addEventListener('submit', handleAdvSubmit)
    } catch {}
    
}
