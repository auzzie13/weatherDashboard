$(document).ready(function () {
  const apiKey = "93db34aab5dfd344d185ccd0f5cfd855";
  const now = moment().format("MMMM DD, YYYY");
  let history = JSON.parse(localStorage.getItem("history")) || [];

  renderSearchHistory();

  function buildDataBox(data) {
    $("#city").text(data.name);
    $("#date").text(now);
    $("#icon")
      .attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
      .show(); // 🔹 Show the icon once it's set
    $("#data").html(`
      <li>Temperature: ${Math.round(data.main.temp)}° F</li>
      <li>Humidity: ${data.main.humidity}%</li>
      <li>Wind Speed: ${data.wind.speed} MPH</li>
    `);
  }

  function buildFiveDay(forecastList) {
    const dayContainer = $("#fiveDay");
    dayContainer.find("div").not("h2").remove();

    const days = [0, 7, 15, 23, 31];
    days.forEach(i => {
      const forecast = forecastList[i];
      const card = $(`
        <div class="day${i}">
          <div>${moment(forecast.dt_txt).format("MMM D")}</div>
          <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" />
          <div>Temp: ${Math.round(forecast.main.temp_max)}° F</div>
          <div>Humidity: ${forecast.main.humidity}%</div>
        </div>
      `);
      dayContainer.append(card);
    });
  }

  function searchCity(city) {
    const formattedCity = formatCityName(city);

    const queryURLCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&units=imperial&appid=${apiKey}`;
    const queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${formattedCity}&units=imperial&appid=${apiKey}`;

    $.ajax({
      url: queryURLCurrent,
      method: "GET"
    }).done(response => {
      buildDataBox(response);
      if (!history.includes(formattedCity)) {
        history.push(formattedCity);
        localStorage.setItem("history", JSON.stringify(history));
        renderSearchHistory();
      }
    }).fail(() => {
      alert("City not found. Please check spelling and try again.");
    });

    $.ajax({
      url: queryURLForecast,
      method: "GET"
    }).done(response => {
      buildFiveDay(response.list);
    });
  }

  function renderSearchHistory() {
    $("#searchHistory").empty();
    history.forEach(city => {
      const btn = $("<button>").text(city).on("click", function () {
        searchCity(city);
      });
      $("#searchHistory").append(btn);
    });
  }

  function formatCityName(name) {
    return name.trim().split(" ").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ");
  }

  $("#search").on("click", function () {
    const city = $("#cityInput").val();
    if (city) {
      searchCity(city);
    }
  });
});
