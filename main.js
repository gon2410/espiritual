let main = document.querySelector("#main");
let date = new Date();
let localTimeHours = date.getHours();
let localTimeMinutes = date.getMinutes();
let localTimeInt = parseInt(date.getHours() + "" + date.getMinutes());
let localTimeString = date.getHours() + ":" + date.getMinutes();

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

                const sunriseUnix = data.sys.sunrise;
                const sunriseUnixToDate = new Date(sunriseUnix * 1000);
                const sunriseHours = sunriseUnixToDate.getHours();
                const sunriseMinutes = sunriseUnixToDate.getMinutes();

                main.innerHTML = `<h3>Pais: ${countryCode} </h3>
                                  <h3>Amanecer: ${sunriseHours + ":" + sunriseMinutes}</h3>
                                  <h3>Hora: ${localTimeString}</h3>`;

                //console.log(getState(sunriseHours, sunriseMinutes, localTimeInt));
            })
            .catch(error => {
                main.innerHTML = `<h1>Error: ${error.message}</h1>`
            });
    });
} else {
    main.innerHTML = `<h1>El navegador no soporta geolocalizacion</h1>`
}

// function getState(sunriseHours, sunriseMinutes, localTime) {
//     let hoursList = [];
//     let flag = true
//     // creo una lista con horarios separados por 24 minutos empezando por el amanecer del pais
//     for (let i = 0; i < 50; i++) {


//         if (sunriseMinutes >= 60) {
//             sunriseHours += 1;
//             sunriseMinutes = Math.abs(60 - sunriseMinutes);
//             if (sunriseMinutes < 10) {
//                 flag = false
//             }
//         }

//         if (sunriseHours >= 24) {
//             sunriseHours = 0;
//             sunriseMinutes = Math.abs(60 - sunriseMinutes);
//             if (sunriseMinutes < 10) {
//                 flag = false
//             }
//         }

//         if (flag === true) {
//             hoursList.push(parseInt(sunriseHours + "" + sunriseMinutes));
//         } else {
//             hoursList.push(parseInt(sunriseHours + "0" + sunriseMinutes));
//             flag = true
//         }

//         sunriseMinutes += 24;
        
//     }
//     console.log(hoursList);

    // let state = 1;
    // for (let i = 0; i < hoursList.length; i++) {
    //     const element = hoursList[i];

    //     if (element >= localTime) {
    //         break
    //     } else {
    //         if (state == 5) {
    //             state = 1
    //         } else {
    //             state += 1
    //         }
    //     }
        
    // }

    // return "Estado " + state;
//}
