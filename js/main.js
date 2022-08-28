console.log(apiKey);
// FUNCTION handle submit -> await API info, then build the info cards

// FUNCTION get info from API

// FUNCTION build the info cards in CSS

// then link submit button to handleSubmit function

{
    // which form are we submitting?
    navForm = document.getElementById('navForm')

    async function handleNavSubmit(e){
        console.log('NAV FORM Handling Submission...');
        e.preventDefault()

        let cityInput = e.target.navCityInput.value;
        let countryInput = e.target.countryInput.value;
        let zipInput = e.target.zipInput.value;
        let latInput = e.target.latInput.value;
        let lonInput = e.target.lonInput.value;

        // if city alone, that's okay
        // if zip but no country, ERROR
        // if country but neither city nor zip, ERROR
        // if lat but no lon, ERROR
        // if lon but no lat, ERROR

        if (zipInput !== '' && countryInput === '') {
            console.warn('YES zip; NO country');
        } else if (countryInput !== '' && (zipInput === '' &&)) {

        }
        
        let weatherInfo = await getWeatherData(cityInput, countryInput, zipInput, latInput, lonInput)
        cityInput.value = ''

        
    }

    
    async function getWeatherData(city, country, zip, lat, lon){
        console.log('Getting Weather Data...');


        
    }


    function buildInfoCards(weatherData){

    }


    function buildErrorMessage(...missing){

    }


    navForm.addEventListener('submit', handleNavSubmit)
    advancedForm.addEventListener('submit', handleNavSubmit)
}