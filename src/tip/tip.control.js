'use strict';

angular.module('huoyun.widget').factory("TipControl", ['$compile', '$rootScope', "$templateCache", "HuoYunWidgetCore",
  function($compile, $rootScope, $templateCache, HuoYunWidgetCore) {

    function TipControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TipControl, HuoYunWidgetCore.Control);

    TipControl.prototype.getMessage = function() {
      return this.getOptions().message;
    };

    TipControl.prototype.getContainerElement = function() {
      return this.getOptions().containerElement || $('body');
    };

    TipControl.prototype.getTemplateUrl = function() {
      return this.callSuperMethod("getTemplateUrl", arguments) || "tip/tip.html";
    };

    TipControl.prototype.getDuration = function() {
      return this.getOptions().duration || 1000;
    };

    TipControl.prototype.newScope = function() {
      var $scope = $rootScope.$new();
      $scope.options = this;
      return $scope;
    };

    TipControl.prototype.pop = function() {
      var $tip = $compile($templateCache.get(this.getTemplateUrl()))(this.newScope());
      this.getContainerElement().append($tip);
      $tip.show();
      var that = this;
      var timer = setTimeout(function() {
        $tip.fadeOut(300, function() {
          $tip.remove();
        });
        clearTimeout(timer);
      }, that.getDuration());
    };

    return TipControl;
  }
]);