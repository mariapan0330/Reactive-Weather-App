console.log(apiKey);
// FUNCTION handle submit -> await API info, then build the info cards

// FUNCTION get info from API

// FUNCTION build the info cards in CSS

// then link submit button to handleSubmit function

{
    // which form are we submitting?
    let navForm = document.getElementById('navForm')
    let advancedForm = document.getElementById('advancedForm')

    // handle submit from any form
    async function handleNavSubmit(e){
        console.log('Handling NAV Submission...');
        e.preventDefault()

        let cityInput = e.target.navCityInput.value;
        if (cityInput){
            console.log(`SUBMITTED: city=${cityInput}`);
            
            let weatherData = await getWeatherData(cityInput)
            cityInput.value = ''
    
            console.log('WEATHER INFO FROM NAV: ', weatherData);
            buildInfoCards(weatherData)
        } else {
            console.warn('Nav search is empty');
        }
    }


    async function handleAdvSubmit(e){
        console.log('Handling ADVANCED Submission...');
        e.preventDefault()

        let cityInput = e.target.navCityInput.value;
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
            let weatherInfo = await getWeatherData(cityInput, countryInput, zipInput, latInput, lonInput)
            cityInput.value = ''
            countryInput.value = ''
            zipInput.value = ''
            latInput.value = ''
            lonInput.value = ''

            console.log('WEATHER INFO FROM ADV SUBMIT: ',weatherInfo);
            buildInfoCards(weatherData)

        }
    }

    
    async function getWeatherData(city, country, zip, lat, lon){
        console.log('Getting Weather Data...');

        return 123
    }


    function buildInfoCards(weatherData){
        console.log('Building Info Cards...');
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