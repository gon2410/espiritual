const countryDiv = document.querySelector("#country");
const sunriseDiv = document.querySelector("#sunrise");
const actualTimeDiv = document.querySelector("#actualTime");
const stateDiv = document.querySelector("#state")
let actualTime = new Date();

// si el navegador soporta geolocalizacion
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
    
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e1414393ec8b28124eff5028e775326&units=metric`
        fetch(apiUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const countryCode = data.sys.country;

                const sunriseUnixTime = data.sys.sunrise;
                const sunriseTime = new Date(sunriseUnixTime * 1000);

                countryDiv.innerHTML += countryCode;
                sunriseDiv.innerHTML += sunriseTime;
                actualTimeDiv.innerHTML += actualTime;

                const state = getState(sunriseTime, actualTime);
                
                stateDiv.innerHTML += state;
               
            })
            .catch(error => {
                console.log(error.message);
            });
    });
} else {
    console.log("El navegador no soporta geolocalizacion.")
}


function getState(sunriseTime, actualTime) {
    let state = 0
    // suma 24 minutos desde el amanecer hasta que encuentra una hora actual que sea mayor
    // cuando encuentra, corta el loop y devuelve el estado
    while (sunriseTime < actualTime) {
        console.log(sunriseTime);
        state += 1
        if (state == 6) {
            state = 1
        }
        sunriseTime.setMinutes(sunriseTime.getMinutes() + 24);
    }

    return state;
}