$( document ).ready(function() {
  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature>p').text(thermostat.temperature());
  }

  function updatePowerSaving() {
    switch(thermostat.isPowerSaving()) {
      case true:
        return "On"
      case false:
        return "Off"
    }
  }

  updateTemperature();

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    updateTemperature();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving();
    updateTemperature();
    $('#power_saving>p').text(updatePowerSaving());
  });
});
