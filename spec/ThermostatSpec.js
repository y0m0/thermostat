'use strict';

describe("Thermostat", function() {

  var thermostat;
  const DEFAULT_TEMPERATURE = 20

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("Starts at 20 degrees", function() {
    expect(thermostat.temperature()).toEqual(DEFAULT_TEMPERATURE);
  });

  it("Can increase the temperature", function(){
    thermostat.increaseTemperature();
    expect(thermostat.temperature()).toEqual(DEFAULT_TEMPERATURE + 1);
  });

  it("Can decrease the temperature", function() {
    thermostat.decreaseTemperature();
    expect(thermostat.temperature()).toEqual(DEFAULT_TEMPERATURE - 1);
  });

  it("Has a minimum temperature of 10", function(){
    for(var i = 0; i < 10; i++) { thermostat.decreaseTemperature(); }
    expect(function(){ thermostat.decreaseTemperature(); }).toThrow(new Error('Minimum temperature is 10 degrees'));
  });
});
