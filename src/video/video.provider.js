'use strict';

angular.module('huoyun.widget').provider("video", function() {

  this.step = 5;
  this.fastStep = this.step * 2;

  /**
   * options
   *  - step
   *  - fastSteps
   */
  this.config = function(options) {
    var that = this;
    ["step", "fastStep"].forEach(function(prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function() {
    return this;
  };
});