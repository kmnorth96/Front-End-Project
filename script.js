//latitude input
const latitudeId = document.querySelector("#latitude");

//longitude input
const longitudeId = document.querySelector("#longitude");

//Searh Button
const searchButton = document.querySelector("#search");

//Weather Info Div
const weatherInfo = document.querySelector(".Weather-Info");

//City Search
const citySearch = document.querySelector('#city');


function weatherReport(_displayTemp) {
    const div = document.createElement("div");
    div.innerText = _displayTemp;
    weatherInfo.append(div);

}


//Render Weather Info Base on Search
// searchButton.addEventListener("click",() => {
//     const latitude = latitudeId.value;
//     const longitude = longitudeId.value;

//     weatherInfo.innerHTML = "";
//     $.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&models=best_match&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FLos_Angeles`
//     , function(data){
//         console.log(data);

//             const temperature = data.hourly.temperature_2m[0];

//             weatherReport(temperature);
//             console.log(temperature);
//     });
// });


searchButton.addEventListener("click", () => {
    const city = citySearch.value;
    const latitude = ''
    const longitude = ''
    weatherInfo.innerHTML = '';
    $.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`, function(data){
       
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        console.log('firt get', data);
        whatever(latitude, longitude);
        // console.log('latitude',typeof latitude);
        // console.log('longitude',typeof longitude);

    });
    console.log('latitude',typeof latitude);
    console.log('longitude',typeof longitude);
    // const latitude = data.results[0].latitude;
    // const longitude = data.results[0].longitude;


    // $.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`, function(tempData){
    //     console.log(tempData);

    //         const temperature = tempData.hourly.temperature_2m[0];

    //         weatherReport(temperature);
    //         console.log(temperature);
    // });

});
      function whatever(lat, long){ 
        $.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`, function(tempData){
            console.log(tempData);
    
                const temperature = tempData.hourly.temperature_2m[0];

                console.log(temperature);

                weatherReport(temperature);
              
        });
    }