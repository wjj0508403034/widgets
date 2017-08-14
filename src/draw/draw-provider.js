'use strict';

angular.module('huoyun.widget').provider("draw", function() {

  this.line = {
    stroke: {
      color: '#f06',
      width: 1,
      linecap: 'round'
    }
  };

  this.fill = "rgba(109, 33, 33, 0.25)";

  this.text = {
    font: {
      size: 18,
      family: 'Verdana'
    },
    fill: "#f06"
  };

  this.$get = function() {
    return this;
  };
});