'use strict';

angular.module('huoyun.widget').factory("Control", [function() {
  function Control(options) {
    this.$$eventMap = {};

    this.getOptions = function() {
      if (options === null || options === undefined) {
        options = {};
      }
      return options;
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

  Control.prototype.callSuperMethod = function(method, args) {
    this.constructor.super.prototype[method].apply(this, args);
  };

  Control.prototype.getName = function() {
    return this.getOptions().name;
  };

  Control.prototype.getControlName = function() {
    return this.constructor.name;
  };

  Control.prototype.setElement = function(elem) {
    this.$$elem = elem;
    return this;
  };

  Control.prototype.getElement = function() {
    return this.$$elem;
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

  Control.prototype.getEventListeners = function(eventName) {
    if (!this.$$eventMap[eventName]) {
      this.$$eventMap[eventName] = [];
    }
    return this.$$eventMap[eventName];
  };

  Control.prototype.clearEventListeners = function(eventName) {
    this.$$eventMap[eventName] = [];
    return this;
  };

  Control.prototype.on = function(eventName, listener) {
    if (typeof listener !== "function") {
      throw new Event("Event listener must be function");
    }
    this.getEventListeners(eventName).push(listener);

    return this;
  };

  Control.prototype.off = function(eventName, listener) {
    var listeners = this.getEventListeners(eventName);

    if (listener === undefined) {
      return this.clearEventListeners(eventName);
    }

    if (typeof listener !== "function") {
      throw new Event("Event listener must be function");
    }

    var index = listeners.indexOf(listener);
    listeners.splice(index, 1);
    return this;
  };

  Control.prototype.raiseEvent = function(eventName, args) {
    var that = this;
    var listeners = this.getEventListeners(eventName);
    listeners.forEach(function(listener) {
      listener.apply(that, args);
    });
  };

  return Control;
}]);