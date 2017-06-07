$( document ).ready(function() {
  var thermostat = new Thermostat();

  $('#temperature').text(thermostat.temperature());

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    $('#temperature').text(thermostat.temperature());
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    $('#temperature').text(thermostat.temperature());
  });
});
