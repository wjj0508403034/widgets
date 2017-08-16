'use strict';

angular.module('huoyun.widget').factory("Timeline", [
  function() {

    function Timeline() {
      this.timeline = {};
      this.currentTime = null;
    }

    Timeline.prototype.getTimes = function() {
      return Object.keys(this.timeline);
    };

    Timeline.prototype.setEndTime = function(time) {
      this.endTime = time;
    };

    Timeline.prototype.beforeEndTime = function(time) {
      if (this.endTime === null || this.endTime === undefined) {
        return true;
      }

      return time <= this.endTime;
    };

    Timeline.prototype.setCurrentTime = function(time) {
      this.currentTime = time;
      return this;
    };

    Timeline.prototype.setData = function(data) {
      this.timeline[this.currentTime] = data;
      return this;
    };

    Timeline.prototype.getDataAtTime = function(time) {
      return this.timeline[time];
    };

    Timeline.prototype.getEndPoints = function() {
      if (this.timeline[this.currentTime]) {
        return {
          min: this.currentTime,
          max: this.currentTime
        };
      }

      var times = this.getTimes();
      var min = null;
      var max = null;
      for (var index = 0; index < times.length; index++) {
        var cur = parseFloat(times[index]);
        if (max === null && cur > this.currentTime) {
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