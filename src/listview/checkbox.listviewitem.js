'use strict';

angular.module('huoyun.widget').factory("CheckBoxListViewItemControl", ["HuoYunWidgetCore", "ListViewItemControl", "CheckBoxControl",
  function(HuoYunWidgetCore, ListViewItemControl, CheckBoxControl) {

    function CheckBoxListViewItemControl() {
      ListViewItemControl.apply(this, arguments);

      var that = this;
      this.$$checkBox = new CheckBoxControl();
      this.$$checkBox.getText = function() {
        return that.getDisplayText();
      };
    }

    HuoYunWidgetCore.ClassExtend(CheckBoxListViewItemControl, ListViewItemControl);

    CheckBoxListViewItemControl.prototype.getCheckBox = function() {
      return this.$$checkBox;
    };

    return CheckBoxListViewItemControl;
  }
]);