'use strict';

angular.module('huoyun.widget').factory("Control", [function() {
  function Control(options) {
    this.getOptions = function() {
      return options || {};
    };
  }

  Control.prototype.getId = function() {
    if (!this.$$id) {
      if (this.getOptions().id) {
        this.$$id = this.getOptions().id;
      } else {
        var now = new Date();
        this.$$id = now.getTime();
      }
    }

    return this.$$id;
  };

  Control.prototype.getName = function() {
    return this.getOptions().name;
  };

  Control.prototype.getControlName = function() {
    return this.constructor.name;
  };

  Control.prototype.appendClass = function() {
    return this.getOptions().appendClass;
  };

  Control.prototype.getTemplateUrl = function() {
    return this.getOptions().templateUrl;
  };

  Control.prototype.isCustomizeTemplate = function() {
    return !!this.getTemplateUrl();
  };

  Control.prototype.getStyle = function() {
    var style = this.getOptions().style;
    if (typeof style === "object") {
      return style;
    }

    if (typeof style === "function") {
      return style.apply(this);
    }
  };

  Control.prototype.isVisibility = function() {
    return this.__isTrue("visibility");
  };

  Control.prototype.isDisabled = function() {
    return this.__isFalse("disabled");
  };

  Control.prototype.__isTrue = function(propName) {
    return !this.__isFalse(propName);
  };

  Control.prototype.__isFalse = function(propName) {
    var propValue = this.getOptions()[propName];

    if (typeof propValue === "boolean") {
      return propValue;
    }

    if (typeof propValue === "function") {
      return propValue.apply(this);
    }

    return false;
  };

  return Control;
}]);