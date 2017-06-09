$( document ).ready(function() {
  var thermostat = new Thermostat();
  var city;
  var state;


  $.get('http://localhost:9292', function(data){
    console.log('current ' + thermostat.powerSaving)
    state = JSON.parse(data)
    thermostat._temperature = state.temperature
    thermostat.powerSaving = state.psm
    city = state.city
    console.log(typeof(state.psm))
    console.log('new '+ thermostat.powerSaving)
    updateTemperature()
    // updatePowerSaving()
    console.log('check')
    updateEnergyUsage()
    updateThermometer()
  })

  $('#search-city').on('change paster', function(){
    city = $('#search-city').val();
    displayWeather(city);
    updateState();
  });

  function updateState(){
    $.post('http://localhost:9292', { state: {temperature: thermostat.temperature(), psm: thermostat.isPowerSaving(), city: city } } );
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

  function updateTemperature() {
    $('#temperature>p').text(thermostat.temperature());
    $('#temperature>p').attr('class', thermostat.currentEnergyUsage());
  }

  function updatePowerSaving() {
    console.log(thermostat.isPowerSaving())
    $('#toggle-power-saving i').attr('class', 'fa fa-toggle-' + (thermostat.isPowerSaving() == "true" ? 'on' : 'off'));
  }

  function updateEnergyUsage() {
    $('#energy > p').text(thermostat.currentEnergyUsage());
  }

  function updateThermometer() {
    $('#temperature > p').css("width", thermostat.temperature() + '%');
  }

  // updateTemperature();

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
    updateState();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
    updatePowerSaving()
    updateState();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
    updateState();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving()
    updateTemperature();
    updateThermometer();
    updatePowerSaving();
    updateState();
  });
});
