'use strict';

angular.module('huoyun.widget').factory("TipControl", ['$compile', '$rootScope', '$timeout', "$templateCache", "HuoYunWidgetCore",
  function($compile, $rootScope, $timeout, $templateCache, HuoYunWidgetCore) {

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
      return this.super.getTemplateUrl() || "tip/tip.html";
    };

    TipControl.prototype.getDuration = function() {
      return this.getOptions().duration || 1000;
    };

    TipControl.prototype.newScope = function() {
      return $rootScope.$new();
    };

    TipControl.prototype.pop = function() {
      var $tip = $compile($templateCache.get(this.getTemplateUrl()))(this.newScope());
      $tip.show();
      var that = this;
      var timer = setTimeout(function() {
        $tip.fadeOut(300, function() {
          $tip.remove();
        });
        clearTimeout(timer);
      }, that.getDuration());
    };

    TipControl.show = function(options) {
      var tip = new TipControl(options);
      tip.pop();
    };

    return TipControl;
  }
]);