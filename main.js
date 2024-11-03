let main = document.querySelector("#main");
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


                main.innerHTML = `<h3>Pais: ${countryCode} </h3>
                                  <h3>Amanecer: ${sunriseTime}</h3>
                                  <h3>Hora: ${actualTime}</h3>`;

                let estado = getState(sunriseTime, actualTime);
                
                main.innerHTML += `<h3>${estado}</h3>`

            })
            .catch(error => {
                main.innerHTML = `<h1>Error: ${error.message}</h1>`
            });
    });
} else {
    main.innerHTML = `<h1>El navegador no soporta geolocalizacion</h1>`
}

function getState(sunriseTime, actualTime) {
    let state = 1

    // suma 24 minutos desde el amanecer hasta que encuentra una hora actual que sea mayor
    // cuando encuentra, corta el loop y devuelve el estado
    while (sunriseTime < actualTime) {
        //console.log(sunriseTime);
        sunriseTime.setMinutes(sunriseTime.getMinutes() + 24);
        if (state == 6) {
            state = 1;
        }

        state += 1
    }

    return "Estado " + (state -1);
}
