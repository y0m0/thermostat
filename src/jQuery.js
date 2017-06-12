$( document ).ready(function() {
  var thermostat = new Thermostat();
  var city;

  $.getJSON('http://localhost:9292', function(data) {
    thermostat._temperature = data.temperature;
    thermostat.powerSaving = data.psm;
    city = data.city;
    updateUserInterface();
    displayWeather(city);
  });

  function storeSettings() {
    var temperature = thermostat.temperature();
    var powerSavingMode = thermostat.isPowerSaving();
    $.ajax({
      url     : 'http://localhost:9292',
      dataType: 'json',
      type    : 'POST',
      data    : JSON.stringify({ temperature : temperature, psm: powerSavingMode, city : city })
    });
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var token = '&appid=a012ce56b3fea36ffd408256d4eeb21a';
    var units = '&units=metric';
    $.get(url + city + token + units, function(data) {
      $('#local-temperature').text(data.main.temp + '℃');
      $('#local-weather-icon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
      $('#local-weather-description').text(data.weather[0].description);
    });
  }


  // Updates the displayed values on the user interface

  function updateUserInterface() {

    function updateTemperature() {
      $('#temperature>p').text(thermostat.temperature());
      $('#temperature>p').attr('class', thermostat.currentEnergyUsage());
    }

    function updatePowerSaving() {
      $('#toggle-power-saving i').attr('class', 'fa fa-toggle-' + (thermostat.isPowerSaving() ? 'on' : 'off'));
    }

    function updateEnergyUsage() {
      $('#energy > p').text(thermostat.currentEnergyUsage());
    }

    function updateThermometer() {
      $('#temperature > p').css("width", thermostat.temperature() + '%');
    }

    updateTemperature();
    updatePowerSaving();
    updateEnergyUsage();
    updateThermometer();
  }



  // Event listeners

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    updateUserInterface();
    storeSettings();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateUserInterface();
    storeSettings();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateUserInterface();
    storeSettings();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving();
    updateUserInterface();
    storeSettings();
  });

  $('#search-city').on('change paster', function() {
    city = $('#search-city').val();
    displayWeather(city);
    storeSettings();
  });
});


