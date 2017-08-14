'use strict';

angular.module('huoyun.widget').provider("draw", function() {

  this.line = {
    stroke: {
      color: '#f06',
      width: 3,
      linecap: 'round'
    }
  };

  this.fill = "rgba(109, 33, 33, 0.25)";

  this.$get = function() {
    return this;
  };
});