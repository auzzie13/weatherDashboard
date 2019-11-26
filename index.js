$(document).ready(function() {
//establishing moment format
    var now = moment().format("MMMM DD, YYYY");
 //function to build data box   
    function buildDataBox (obj1) {
        $("#city").text(obj1.name);
        $("#date").text(obj1.date);
        $("#icon").append(obj1.icon);
        var dataEL = $("#data");
        var tempEl = $("<li>").text("Temperature: " + obj1.temp);
        var humidityEl = $("<li>").text("Humidity: " + obj1.humidity + "%");
        var windSpeedEl = $("<li>").text("Wind Speed: " + obj1.wind + " MPH");
        dataEL.append(tempEl);
        dataEL.append(humidityEl);
        dataEL.append(windSpeedEl);
    };
//function to build 5 day forecast
    function buildFiveDay (obj2) {
        var dayEl = $("#fiveDay");
        var day1El = $("<div>").addClass("day1");
        var day2El = $("<div>").addClass("day2");
        var day3El = $("<div>").addClass("day3");
        var day4El = $("<div>").addClass("day4");
        var day5El = $("<div>").addClass("day5");
        var day1DateEl = $("<div>").text(obj2.dateDay1);
        var day1TempEl = $("<div>").text("Temperature: " + obj2.tempDay1);
        var day1HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay1 + "%");
        var day2DateEl = $("<div>").text(obj2.dateDay2);
        var day2TempEl = $("<div>").text("Temperature: " + obj2.tempDay2);
        var day2HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay2+ "%");
        var day3DateEl = $("<div>").text(obj2.dateDay3);
        var day3TempEl = $("<div>").text("Temperature: " + obj2.tempDay3);
        var day3HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay3+ "%");
        var day4DateEl = $("<div>").text(obj2.dateDay4);
        var day4TempEl = $("<div>").text("Temperature: " + obj2.tempDay4);
        var day4HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay4+ "%");
        var day5DateEl = $("<div>").text(obj2.dateDay5);
        var day5TempEl = $("<div>").text("Temperature: " + obj2.tempDay5);
        var day5HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay5+ "%");
        day1El.append(day1DateEl);
        day1El.append(day1TempEl);
        day1El.append(day1HumidityEl);
        dayEl.append(day1El);

        day2El.append(day2DateEl);
        day2El.append(day2TempEl);
        day2El.append(day2HumidityEl);
        dayEl.append(day2El);

        day3El.append(day3DateEl);
        day3El.append(day3TempEl);
        day3El.append(day3HumidityEl);
        dayEl.append(day3El);

        day4El.append(day4DateEl);
        day4El.append(day4TempEl);
        day4El.append(day4HumidityEl);
        dayEl.append(day4El);

        day5El.append(day5DateEl);
        day5El.append(day5TempEl);
        day5El.append(day5HumidityEl);
        dayEl.append(day5El);

    }
    
//click function
    $("#search").click(function() {

    var city = $("#cityInput").val().trim();
    cityFormat(city);
    var queryURLCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&uvi?&APPID=93db34aab5dfd344d185ccd0f5cfd855";

    var queryURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&uvi?&APPID=93db34aab5dfd344d185ccd0f5cfd855"

    $.ajax({
        url: queryURLCurrent,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          if (response) {
            var cityName = response.name;
            var date = now;
            var icon = response.weather[0].icon;
            var tempCurrent = Math.round(response.main.temp);
            var humidityCurrent = response.main.humidity;
            var windSpeedCurrent = response.wind.speed;
            // console.log("city name: ", cityName);
            // console.log("date: ", date);
            // console.log("temp: ", tempCurrent);
            // console.log("humidity: ", humidityCurrent);
            // console.log("wind speed: ", windSpeedCurrent);
            var obj1 = {
                name: cityName,
                date: date,
                picture: icon,
                temp: tempCurrent,
                humidity: humidityCurrent,
                wind: windSpeedCurrent
            };
            buildDataBox(obj1);
          }
      })
      $.ajax({
        url: queryURLForecast,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        if (response) {
            var dateForecastDay1 = moment(response.list[0].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var tempForecastDay1 = Math.round(response.list[0].main.temp_max);
            var humidityForecastDay1 = response.list[0].main.humidity;
 
            var dateForecastDay2 = moment(response.list[7].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var tempForecastDay2 = Math.round(response.list[7].main.temp_max);
            var humidityForecastDay2 = response.list[7].main.humidity;

            var dateForecastDay3 = moment(response.list[15].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var tempForecastDay3 = Math.round(response.list[15].main.temp_max);
            var humidityForecastDay3 = response.list[15].main.humidity;

            var dateForecastDay4 = moment(response.list[23].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var tempForecastDay4 = Math.round(response.list[23].main.temp_max);
            var humidityForecastDay4 = response.list[23].main.humidity;

            var dateForecastDay5 = moment(response.list[31].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var tempForecastDay5 = Math.round(response.list[31].main.temp_max);
            var humidityForecastDay5 = response.list[31].main.humidity;

            var obj2 = {
                dateDay1: dateForecastDay1,
                tempDay1: tempForecastDay1,
                humidityDay1: humidityForecastDay1,
                dateDay2: dateForecastDay2,
                tempDay2: tempForecastDay2,
                humidityDay2: humidityForecastDay2,
                dateDay3: dateForecastDay3,
                tempDay3: tempForecastDay3,
                humidityDay3: humidityForecastDay3,
                dateDay4: dateForecastDay4,
                tempDay4: tempForecastDay4,
                humidityDay4: humidityForecastDay4,
                dateDay5: dateForecastDay5,
                tempDay5: tempForecastDay5,
                humidityDay5: humidityForecastDay5
            }
            buildFiveDay(obj2);
        }
      });

    });

function cityFormat(myCity) {
        city = upperLower(myCity);
    };
    
function upperLower(myStr){
        tempStr = myStr;
        tempArray = tempStr.split(" ");
        tempStr = "";
        tempArray.forEach(word => {
            tempStr += word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() + " ";
        });
        tempStr = tempStr.trim();
        return tempStr
    }


})