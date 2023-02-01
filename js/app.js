$(document).ready(function () {
    window.addEventListener('load', () => {
        let temperatureDegree = document.querySelector('.temperature-degree')
        let locationTimeZone = document.querySelector('.location-timezone')
        // let locationWeather = document.querySelector('img')
        let button = document.querySelector('#button')
        let degreeSection = document.querySelector('.temperature')
        let userInput = document.querySelector('#userInput')
        let history = document.querySelector('#hist')
        let rising = document.querySelector('.rising')
        let sunriseSection = document.querySelector('.sunrise')
        let weathericon = document.querySelector('.weather-icon')  
        let time = document.querySelector('.time')

        if (localStorage.getItem('city')) 
            history.textContent = `Last searched: ${
                localStorage.getItem('city')
            }`
        
        const temperatureSpan = document.querySelector('.temperature span')
        button.onclick = function () {
            var inputText = userInput.value
            console.log(inputText)

            history.textContent = `Last searched: ${
                localStorage.getItem('city')
            }`
            var request = $.ajax({
                method: 'GET',
                url: `https://api.api-ninjas.com/v1/weather?city=${inputText}`,
                headers: {
                    'X-Api-Key': '96vQAuBfOtTatG0XYxvuGg==uPPEhyv8zRhaatq3'
                },
                async: false,
                contentType: 'application/json',
                success: function (result) {
                    console.log(result)
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText)
                }
            })
            var responseJson = JSON.parse(request.responseText)
            localStorage.setItem('city', inputText)
            sessionStorage.setItem('city', inputText)

            const {temp} = responseJson
            temperatureDegree.textContent = temp
            locationTimeZone.textContent = inputText

            let fahr = Math.floor(temp * (9 / 5) + 32)
            console.log(fahr)
            let celsius = Math.floor((fahr - 32) * (5 / 9))

            degreeSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === '°C') {
                    temperatureSpan.textContent = '°F'
                    temperatureDegree.textContent = fahr
                } else {
                    temperatureSpan.textContent = '°C'
                    temperatureDegree.textContent = temp
                }
            })

            const {sunrise, sunset} = responseJson
            sun_hours = new Date(sunrise*1000).getHours()
            sun_minutes = new Date(sunrise*1000).getMinutes()
            sun_seconds = new Date(sunrise*1000).getSeconds()
            sunrise_test = sun_hours + ":" + sun_minutes + ":" + sun_seconds
            set_hours = new Date(sunset*1000).getHours()
            set_minutes = new Date(sunset*1000).getMinutes()
            set_seconds = new Date(sunset*1000).getSeconds()
            sunset_test = set_hours + ":" + set_minutes + ":" + set_seconds
            time.textContent = sunset_test
            time.textContent = sunrise_test
            
            rising.addEventListener('click', () =>{
              if(sunriseSection.textContent === 'Sunrise'){
                sunriseSection.textContent = 'Sunset'
                weathericon.src = 'img/icons/01n.png'
                time.textContent = sunset_test
              }else{
                sunriseSection.textContent = 'Sunrise'
                weathericon.src = 'img/icons/01d.png'
                time.textContent = sunrise_test
              }
            }) 
            console.log(responseJson)
            // const inputText = userInput.value;
            // console.log(inputText)
            // history.textContent = "Last searched: " + localStorage.getItem('city');
            //     const api = `https://api.api-ninjas.com/v1/weather?city=${inputText}`;
            //     //const key = '90dabef470cc7f3bb34688823ae1d104'
            //     //const api = `http://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${key}`;
            //     fetch(api).then(function (response) {
            //         return response.json();
            //     }).then(data => {
            //         console.log(data);
            //         const {temp} = data.main;
            //         const city = data.name;
            //         localStorage.setItem('city',city);
            //         sessionStorage.setItem('city',city);
            //         const {icon, description} = data.weather[0];
            //         let celsius = Math.floor(temp - 273.15);
            //         temperatureDegree.textContent = celsius;
            //         locationWeather.src = "img/icons/" + icon + ".png"
            //         temperatureDescription.textContent = description;
            //         locationTimeZone.textContent = city;
            //         let fahr = Math.floor(((temp - 273.15) * (9 / 5)) + 32);
            //         degreeSection.addEventListener('click', () => {
            //             if (temperatureSpan.textContent === "°C") {
            //                 temperatureSpan.textContent = "°F";
            //                 temperatureDegree.textContent = fahr;
            //             } else {
            //                 temperatureSpan.textContent = "°C";
            //                 temperatureDegree.textContent = celsius;
            //             }
            //         });
            //     })
        }
    })
})
