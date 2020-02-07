$(document).ready(function() {
//establishing moment format
    var now = moment().format("MMMM DD, YYYY");
 //function to build data box   
    function buildDataBox (obj1) {
        $("#city").text(obj1.name);
        $("#date").text(obj1.date);
        $("#icon").append(obj1.iconEl);
        var dataEl = $("#data");
        var tempEl = $("<li><br>").text("Temperature: " + obj1.temp + "\xB0 F");
        var humidityEl = $("<li><br>").text("Humidity: " + obj1.humidity + "%");
        var windSpeedEl = $("<li><br>").text("Wind Speed: " + obj1.wind + " MPH");
        dataEl.append(tempEl);
        dataEl.append(humidityEl);
        dataEl.append(windSpeedEl);
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
        var day1IconEl = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + obj2.iconDay1 + '.png');
        var day1TempEl = $("<div>").text("Temperature: " + obj2.tempDay1 + "\xB0 F");
        var day1HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay1 + "%");
        var day2DateEl = $("<div>").text(obj2.dateDay2);
        var day2IconEl = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + obj2.iconDay2 + '.png');
        var day2TempEl = $("<div>").text("Temperature: " + obj2.tempDay2 + "\xB0 F");
        var day2HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay2+ "%");
        var day3DateEl = $("<div>").text(obj2.dateDay3);
        var day3IconEl = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + obj2.iconDay3 + '.png');
        var day3TempEl = $("<div>").text("Temperature: " + obj2.tempDay3 + "\xB0 F");
        var day3HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay3+ "%");
        var day4DateEl = $("<div>").text(obj2.dateDay4);
        var day4IconEl = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + obj2.iconDay4 + '.png');
        var day4TempEl = $("<div>").text("Temperature: " + obj2.tempDay4 + "\xB0 F");
        var day4HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay4+ "%");
        var day5DateEl = $("<div>").text(obj2.dateDay5);
        var day5IconEl = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + obj2.iconDay5 + '.png');
        var day5TempEl = $("<div>").text("Temperature: " + obj2.tempDay5 + "\xB0 F");
        var day5HumidityEl = $("<div>").text("Humidity: " + obj2.humidityDay5+ "%");
        day1El.append(day1DateEl);
        day1El.append(day1IconEl);
        day1El.append(day1TempEl);
        day1El.append(day1HumidityEl);
        dayEl.append(day1El);

        day2El.append(day2DateEl);
        day2El.append(day2IconEl);
        day2El.append(day2TempEl);
        day2El.append(day2HumidityEl);
        dayEl.append(day2El);

        day3El.append(day3DateEl);
        day3El.append(day3IconEl);
        day3El.append(day3TempEl);
        day3El.append(day3HumidityEl);
        dayEl.append(day3El);

        day4El.append(day4DateEl);
        day4El.append(day4IconEl);
        day4El.append(day4TempEl);
        day4El.append(day4HumidityEl);
        dayEl.append(day4El);

        day5El.append(day5DateEl);
        day5El.append(day5IconEl);
        day5El.append(day5TempEl);
        day5El.append(day5HumidityEl);
        dayEl.append(day5El);

    }    
//click function
    $("#search").click("click", function() {
        clearTemplate();
        var city = $("#cityInput").val().trim();
        cityFormat(city);
    //    console.log(localStorage.getItem("new city"));
    //    if (localStorage.getItem("new city") !== null) {
    //        var tempCity = localStorage.getItem("new city");

    //        tempCity += "," + city;
    //        localStorage.setItem('new city', tempCity);
    //    } else {
    //     localStorage.setItem('new city', city);
    //    }

    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&uvi?&APPID=93db34aab5dfd344d185ccd0f5cfd855";

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&uvi?&APPID=93db34aab5dfd344d185ccd0f5cfd855"
//first ajax call-current weather
    $.ajax({
        url: queryURLCurrent,
        method: "GET",
        dataType: "json",
        success: function(data) {
 // create history link for this search
            if (history.indexOf(city) === -1) {
              history.push(city);
              window.localStorage.setItem("history", JSON.stringify(history));
        
              makeRow(city);
            };
        }
      }).then(function(response) {
          console.log(response);
          if (response) {
            var cityName = response.name;
            var date = now;
            var icon = response.weather[0].icon;
            var iconEl = $("#icon");
            iconEl.attr('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
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
                picture: iconEl,
                temp: tempCurrent,
                humidity: humidityCurrent,
                wind: windSpeedCurrent
            };
            buildDataBox(obj1);
          }
      })
      //second ajax call-forecast
      $.ajax({
        url: queryURLForecast,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        if (response) {
            var dateForecastDay1 = moment(response.list[0].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var iconForecastDay1 = response.list[0].weather[0].icon;
            var tempForecastDay1 = Math.round(response.list[0].main.temp_max);
            var humidityForecastDay1 = response.list[0].main.humidity;
 
            var dateForecastDay2 = moment(response.list[7].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var iconForecastDay2 = response.list[7].weather[0].icon;
            var tempForecastDay2 = Math.round(response.list[7].main.temp_max);
            var humidityForecastDay2 = response.list[7].main.humidity;

            var dateForecastDay3 = moment(response.list[15].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var iconForecastDay3 = response.list[15].weather[0].icon;
            var tempForecastDay3 = Math.round(response.list[15].main.temp_max);
            var humidityForecastDay3 = response.list[15].main.humidity;

            var dateForecastDay4 = moment(response.list[23].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var iconForecastDay4 = response.list[23].weather[0].icon;
            var tempForecastDay4 = Math.round(response.list[23].main.temp_max);
            var humidityForecastDay4 = response.list[23].main.humidity;

            var dateForecastDay5 = moment(response.list[31].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMMM DD, YYYY");
            var iconForecastDay5 = response.list[31].weather[0].icon;
            var tempForecastDay5 = Math.round(response.list[31].main.temp_max);
            var humidityForecastDay5 = response.list[31].main.humidity;

            var obj2 = {
                dateDay1: dateForecastDay1,
                iconDay1: iconForecastDay1,
                tempDay1: tempForecastDay1,
                humidityDay1: humidityForecastDay1,
                dateDay2: dateForecastDay2,
                iconDay2: iconForecastDay2,
                tempDay2: tempForecastDay2,
                humidityDay2: humidityForecastDay2,
                dateDay3: dateForecastDay3,
                iconDay3: iconForecastDay3,
                tempDay3: tempForecastDay3,
                humidityDay3: humidityForecastDay3,
                dateDay4: dateForecastDay4,
                iconDay4: iconForecastDay4,
                tempDay4: tempForecastDay4,
                humidityDay4: humidityForecastDay4,
                dateDay5: dateForecastDay5,
                iconDay5: iconForecastDay5,
                tempDay5: tempForecastDay5,
                humidityDay5: humidityForecastDay5
            }
            buildFiveDay(obj2);
        }
      });

    });
//clears data box and fiveday forecast box
function clearTemplate() {
    var dataEl = $("#data");
    var dayEl = $("#fiveDay");
    dataEl.empty();
    dayEl.children().empty();

}

//functions to properly format search city
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

function makeRow(text) {
    var li = $("<button>").addClass("").text(text);
    $("#searchHistory").append(li);
  }
//   function searchWeather(searchValue) {
//     $.ajax({
//       type: "GET",
//       url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
//       dataType: "json",
    //   success: function(data) {
    //     // create history link for this search
    //     if (history.indexOf(searchValue) === -1) {
    //       history.push(searchValue);
    //       window.localStorage.setItem("history", JSON.stringify(history));
    
    //       makeRow(searchValue);
    //     }