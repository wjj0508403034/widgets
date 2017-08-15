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

  this.fillColors = [
    "rgba(109, 33, 33, 0.25)",
    "rgba(46, 109, 164, 0.25)",
    "rgba(169, 68, 66, 0.25)",
    "rgba(0, 188, 212, 0.25)",
    "rgba(255, 152, 0, 0.25)",
    "rgba(255, 87, 34, 0.25)",
    "rgba(255, 235, 59, 0.25)",
    "rgba(76, 175, 80, 0.25)",
    "rgba(0, 150, 136, 0.25)",
    "rgba(121, 85, 72, 0.25)",
    "rgba(63, 81, 181, 0.25)",
    "rgba(156, 39, 176, 0.25)"
  ];

  this.randomColor = function() {
    var randomIndex = Math.round(Math.random() * (Object.keys(this.fillColors).length - 1));
    return this.fillColors[Object.keys(this.fillColors)[randomIndex]];
  };

  this.$get = function() {
    return this;
  };
});