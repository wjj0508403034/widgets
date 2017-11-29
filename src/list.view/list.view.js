'use strict';

angular.module('huoyun.widget').factory("ListViewControl", ["HuoYunWidgetCore", "SelectorControl", "ListViewItemControl",
  function(HuoYunWidgetCore, SelectorControl, ListViewItemControl) {

    function ListViewControl() {
      SelectorControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(ListViewControl, SelectorControl);

    ListViewControl.prototype.getItemTemplate = function() {
      return this.$$itemTemplate || ListViewItemControl;
    };

    return ListViewControl;
  }
]);