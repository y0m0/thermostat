'use strict';

describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("Starts at 20 degrees", function() {
    expect(thermostat.temperature()).toEqual(20);
  });

  it("can increase the temperature", function(){
    thermostat.increaseTemperature();
    expect(thermostat.temperature()).toEqual(21);
  });

});
