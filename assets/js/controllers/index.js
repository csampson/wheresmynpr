'use strict';

var angular = require('angular');

module.exports = angular.module('app.controllers', [])
  .controller('SearchCtrl', require('./search-controller'));
