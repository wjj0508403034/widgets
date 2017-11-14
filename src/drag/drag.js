'use strict';

angular.module('huoyun.widget').factory("Drag", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function Drag(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
      this.$$draggable = true;
    }

    HuoYunWidgetCore.ClassExtend(Drag, HuoYunWidgetCore.Control);

    Drag.prototype.setDragData = function(dragData) {
      this.$$dragData = dragData;
      return this;
    };

    Drag.prototype.isDraggable = function() {
      return this.$$draggable;
    };

    Drag.prototype.onDragStart = function($event) {
      console.log(arguments)
    };

    return Drag;
  }
]);