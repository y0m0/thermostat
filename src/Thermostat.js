'use strict';

var Thermostat = function() {
  this._temperature = 20;
  this._MINIMUM_TEMPERATURE = 10;
};

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.increaseTemperature = function(){
  this._temperature ++
};

Thermostat.prototype.decreaseTemperature = function() {
  if (this._temperature === this._MINIMUM_TEMPERATURE) throw new Error('Minimum temperature is 10 degrees')
  this._temperature --
};
