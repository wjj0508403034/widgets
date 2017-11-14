'use strict';

angular.module('huoyun.widget').factory("ListViewItemControl", ["HuoYunWidgetCore", "ItemControl",
  function(HuoYunWidgetCore, ItemControl) {

    function ListViewItemControl() {
      ItemControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(ListViewItemControl, ItemControl);


    return ListViewItemControl;
  }
]);