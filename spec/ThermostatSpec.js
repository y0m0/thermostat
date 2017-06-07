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

  it("Is in power saving mode by default", function() {
    expect(thermostat.isPowerSaving()).toBe(true);
  });

  it("Can turn off power saving mode", function() {
    thermostat.powerSavingOff();
    expect(thermostat.isPowerSaving()).toBe(false);
  });

  it("Can turn on power saving mode", function() {
    thermostat.powerSavingOff();
    thermostat.powerSavingOn();
    expect(thermostat.isPowerSaving()).toBe(true);
  });

  it("Can reset the temperature to 20 degrees", function() {
    thermostat.increaseTemperature();
    thermostat.resetTemperature();
    expect(thermostat.temperature()).toEqual(20);
  });

  describe("Power Saving mode On", function() {

    it("Restrict maximum temperature to 25 degrees", function() {
      for(var i = 0; i < 5; i++) { thermostat.increaseTemperature(); }
      expect(function(){ thermostat.increaseTemperature(); }).toThrow(new Error('Maximum temperature in power saving mode is 25 degrees'));
    });
  });

  describe("Power Saving mode Off", function() {

    it("Restricts maximum temperature to 32 degrees", function() {
      thermostat.powerSavingOff();
      for(var i = 0; i < 12; i++) { thermostat.increaseTemperature(); }
      expect(function(){ thermostat.increaseTemperature(); }).toThrow(new Error('Maximum temperature is 32 degrees'));
    });
  });
});
