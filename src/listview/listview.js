'use strict';

angular.module('huoyun.widget').factory("ListViewControl", ["HuoYunWidgetCore", "SelectorControl", "ListViewItemControl",
  function(HuoYunWidgetCore, SelectorControl, ListViewItemControl) {

    function ListViewControl() {
      SelectorControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(ListViewControl, SelectorControl);


    ListViewControl.prototype.getSelectedItems = function() {

    };

    ListViewControl.prototype.getItemTemplate = function() {
      return ListViewItemControl;
    };

    return ListViewControl;
  }
]);