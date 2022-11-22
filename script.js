//latitude input
const latitudeId = document.querySelector("#latitude");

//longitude input
const longitudeId = document.querySelector("#longitude");

//Searh Button
const searchButton = document.querySelector("#search");

//Weather Info Div
const weatherInfo = document.querySelector(".Weather-Info");


function weatherReport(_displayTemp) {
    const div = document.createElement("div");
    div.innerText = _displayTemp;
    weatherInfo.append(div);

}


//Render Weather Info Base on Search
searchButton.addEventListener("click",() => {
    const latitude = latitudeId.value;
    const longitude = longitudeId.value;

    weatherInfo.innerHTML = "";

    $.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`, function(data){
        console.log(data)

        for (let _key in data) {
            const temperature = `${data.hourly.temperature_2m[1]}`;

            weatherReport(temperature);
            console.log(temperature);
        }
    });
})