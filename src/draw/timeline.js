'use strict';

angular.module('huoyun.widget').factory("Timeline", [
  function() {

    function Timeline() {
      this.timeline = {};
    }

    Timeline.prototype.getTimes = function() {
      return Object.keys(this.timeline);
    };

    Timeline.prototype.setData = function(time, data) {
      this.timeline[time] = data;
    };

    Timeline.prototype.getEndPoints = function(time) {
      if (this.timeline[time]) {
        return {
          min: time,
          max: time
        };
      }

      var times = this.getTimes();
      var min = null;
      var max = null;
      for (var index = 0; index < times.length; index++) {
        var cur = parseFloat(times[index]);
        if (max === null && cur > time) {
          max = times[index];
          if (index > 0) {
            min = times[index - 1];
          }

          break;
        }
      }

      return {
        min: min,
        max: max
      };
    };

    return Timeline;
  }
]);