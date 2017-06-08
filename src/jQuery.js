$( document ).ready(function() {
  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature>p').text(thermostat.temperature());
    $('#temperature>p').attr('class', thermostat.currentEnergyUsage());
  }

  function updatePowerSaving() {
    switch(thermostat.isPowerSaving()) {
      case true:
        return 'On';
      case false:
        return 'Off';
    }
  }

  function updateEnergyUsage() {
    $('#energy > p').text(thermostat.currentEnergyUsage());
  }

  function updateThermometer() {
    $('#temperature > p').css("width", thermostat.temperature() + '%');
  }

  updateTemperature();

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving();
    updateTemperature();
    $('#power_saving > p').text(updatePowerSaving());
  });
});
