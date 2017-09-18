'use strict';

angular.module('huoyun.widget').factory("CheckBoxOption", ["widgetsHelper",
  function(CheckBoxOption) {

    const props = ["value", "label", "disabled", "appendClass"];

    function CheckBoxOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      if (typeof options.onChecked === "function") {
        this.onChecked = options.onChecked;
      }

      if (typeof options.onUnchecked === "function") {
        this.onUnchecked = options.onUnchecked;
      }

      if (typeof options.onCheckChanged === "function") {
        this.onCheckChanged = options.onCheckChanged;
      }
    }

    CheckBoxOption.prototype.$$onClicked = function(event) {
      var oldValue = this.value;
      this.value = !oldValue;
      this.onCheckChanged && this.onCheckChanged(event, oldValue, this.value);
      if (this.value) {
        this.onChecked && this.onChecked(event);
      } else {
        this.onUnchecked && this.onUnchecked(event);
      }
    };

    CheckBoxOption.prototype.isChecked = function() {
      return this.value === true;
    };

    return CheckBoxOption;
  }
]);