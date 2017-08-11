'use strict';

angular.module('huoyun.widget').factory("widgetsHelper", function() {

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
    }
  };
});