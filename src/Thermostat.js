'use strict';

var Thermostat = function() {
  this._temperature = 20;
  this._MINIMUM_TEMPERATURE = 10;
  this.powerSaving = true;
};

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.increaseTemperature = function(){
  if (this.isPowerSaving && this._temperature >= 25 ) throw new Error('Maximum temperature in power saving mode is 25 degrees') 
  this._temperature ++;
};

Thermostat.prototype.decreaseTemperature = function() {
  if (this._temperature <= this._MINIMUM_TEMPERATURE) throw new Error('Minimum temperature is 10 degrees')
  this._temperature --;
};

Thermostat.prototype.isPowerSaving = function() {
  return this.powerSaving;
};

Thermostat.prototype.powerSavingOff = function() {
  this.powerSaving = false;
};

Thermostat.prototype.powerSavingOn = function() {
  this.powerSaving = true;
};
