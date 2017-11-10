'use strict';

angular.module('huoyun.widget').factory("FormOrientation", [function() {

  const Orientations = {
    Horizontal: "horizontal",
    Vertical: "vertical"
  };

  function FormOrientation(val) {
    this.$$value = Orientations.Vertical;
    if (typeof val === "string") {
      if (val.toLowerCase() === "horizontal") {
        this.$$value = Orientations.Horizontal;
      }
    }
  }

  FormOrientation.prototype.getValue = function() {
    return this.$$value.toLowerCase();
  };

  FormOrientation.prototype.appendClass = function() {
    if (this.getValue() === Orientations.Horizontal) {
      return "form-horizontal";
    }
    return "";
  };


  return FormOrientation;
}]);

angular.module('huoyun.widget').factory("FormHeaderControl", ["HuoYunWidgetCore", "ButtonControl",
  function(HuoYunWidgetCore, ButtonControl) {

    function FormHeaderControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      var that = this;
      that.$$buttons = [];

      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(button) {
          that.$$buttons.push(new ButtonControl(button));
        });
      }
    }

    HuoYunWidgetCore.ClassExtend(FormHeaderControl, HuoYunWidgetCore.Control);

    FormHeaderControl.prototype.getTitle = function() {
      return this.getOptions().title;
    };

    FormHeaderControl.prototype.getButtons = function() {
      return this.$$buttons;
    };

    return FormHeaderControl;
  }
]);

angular.module('huoyun.widget').factory("FormFooterControl", ["HuoYunWidgetCore", "ButtonControl",
  function(HuoYunWidgetCore, ButtonControl) {

    function FormFooterControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      var that = this;
      that.$$buttons = [];

      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(button) {
          that.$$buttons.push(new ButtonControl(button));
        });
      }
    }

    HuoYunWidgetCore.ClassExtend(FormFooterControl, HuoYunWidgetCore.Control);

    FormFooterControl.prototype.getButtons = function() {
      return this.$$buttons;
    };

    return FormFooterControl;
  }
]);

angular.module('huoyun.widget').factory("FormControl", ["$log", "HuoYunWidgetCore", "FormGroupControl", "FormOrientation", "FormHeaderControl", "FormFooterControl",
  function($log, HuoYunWidgetCore, FormGroupControl, FormOrientation, FormHeaderControl, FormFooterControl) {

    function FormControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
      this.$$data = {};
      var that = this;

      that.$$orientation = new FormOrientation(options.orientation);
      that.$$groups = [];

      if (options.header) {
        that.$$header = new FormHeaderControl(options.header);
      }

      if (options.footer) {
        that.$$footer = new FormFooterControl(options.footer);
      }

      if (options.groups) {
        if (Array.isArray(options.groups)) {
          options.groups.forEach(function(group) {
            var control = new FormGroupControl(group);
            control.setFormControl(that).setValueChangedCallback(function(newVal, oldVal) {
              that.onPropertyChanged(control.getName(), newVal, oldVal);
            });
            that.$$groups.push(control);
          });
        } else {
          throw new Error("groups should be array.")
        }
      }
    }

    HuoYunWidgetCore.ClassExtend(FormControl, HuoYunWidgetCore.Control);

    FormControl.prototype.getOrientation = function() {
      return this.$$orientation.getValue();
    };

    FormControl.prototype.appendOrientationClass = function() {
      return this.$$orientation.appendClass();
    };

    FormControl.prototype.isReadonly = function() {
      return this.__isFalse("readonly");
    };

    FormControl.prototype.getHeader = function() {
      return this.$$header;
    };

    FormControl.prototype.getFooter = function() {
      return this.$$footer;
    };

    FormControl.prototype.isFooterVisibility = function() {
      return this.getFooter().isVisibility();
    };

    FormControl.prototype.getGroups = function() {
      return this.$$groups;
    };

    FormControl.prototype.getBindExpr = function(formGroup) {
      return this.getPropertyValue(formGroup.getName())
    };

    FormControl.prototype.setData = function(data) {
      this.$$data = data;
      return this;
    };

    FormControl.prototype.getData = function() {
      return this.$$data;
    };

    FormControl.prototype.getPropertyValue = function(propName) {
      return this.getData()[propName];
    };

    FormControl.prototype.onPropertyChanged = function(propName, newVal, oldVal) {
      var onPropertyChangedCallback = this.getOptions().onPropertyChanged;
      if (typeof onPropertyChangedCallback === "function") {
        onPropertyChangedCallback.apply(this, [propName, newVal, oldVal]);
      }
    };

    return FormControl;
  }
]);