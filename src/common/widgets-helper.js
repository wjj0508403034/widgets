'use strict';

angular.module('huoyun.widget').factory("widgetsHelper", function() {

  String.prototype.pad = function(width) {
    var temp = this.split(".");
    if (temp[0].length < width) {
      temp[0] = new Array(width - temp[0].length + 1).join("0") + temp[0];
    }

    return temp.join(".");
  };

  return {

    visibility: function(obj) {
      if (typeof obj.visibility === "boolean") {
        return obj.visibility;
      }

      if (typeof obj.visibility === "function") {
        return obj.visibility.apply(obj);
      }

      return true;
    },

    disabled: function(obj) {
      if (typeof obj.disabled === "boolean") {
        return obj.disabled;
      }

      if (typeof obj.disabled === "function") {
        return obj.disabled.apply(obj);
      }

      return false;
    },

    style: function(obj) {
      if (typeof obj.style === "object") {
        return obj.style;
      }

      if (typeof obj.style === "function") {
        return obj.style.apply(obj);
      }
    },

    durationFormat: function(time) {
      var hour = 0;
      var minuter = 0;
      var second = 0;

      if (time) {
        if (time < 60) {
          second = time;
        } else {
          second = time % 60;
          var temp = time / 60;
          if (temp < 60) {
            minuter = temp;
          } else {
            hour = temp / 60;
            minuter = temp % 60;
          }
        }
      }

      return `${hour.toFixed(0).pad(2)}:${minuter.toFixed(0).pad(2)}:${second.toFixed(3).pad(2)}`;
    }
  };
});