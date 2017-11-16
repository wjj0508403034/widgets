'use strict';

angular.module('huoyun.widget').factory("LoadingControl", ['$compile', '$rootScope', "$templateCache", "HuoYunWidgetCore",
  function($compile, $rootScope, $templateCache, HuoYunWidgetCore) {

    function LoadingControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(LoadingControl, HuoYunWidgetCore.Control);

    LoadingControl.prototype.getContent = function() {
      return this.getOptions().content;
    };

    LoadingControl.prototype.getContainerElement = function() {
      return this.getOptions().containerElement || $('body');
    };

    LoadingControl.prototype.getTemplateUrl = function() {
      return "loading/loading.template.html";
    };

    LoadingControl.prototype.newScope = function() {
      var $scope = $rootScope.$new();
      $scope.loading = this;
      return $scope;
    };

    LoadingControl.prototype.getTemplate = function() {
      return angular.element($templateCache.get(this.getTemplateUrl()));
    };

    LoadingControl.prototype.getWrapperTemplate = function() {
      return angular.element($templateCache.get("loading/loading.wrapper.html"));
    };

    LoadingControl.prototype.show = function() {
      if (this.$$inited) {
        return this.setVisibility(true);
      }

      var template = this.getTemplate();
      if (this.__isBody()) {
        this.getContainerElement().append(template);
      } else {
        this.getContainerElement().wrap(this.getWrapperTemplate()).after(template);
      }
      $compile(template)(this.newScope());
      this.$$inited = true;
      return this;
    };

    LoadingControl.prototype.close = function() {
      this.setVisibility(false);
    };

    LoadingControl.prototype.isVisibility = function() {
      return this.$$visibility !== false;
    };

    LoadingControl.prototype.setVisibility = function(visibility) {
      this.$$visibility = visibility;
      return this;
    };

    LoadingControl.prototype.__isBody = function() {
      var elem = this.getContainerElement();
      if (elem.length > 0) {
        return elem[0].tagName === "BODY";
      }

      return false;
    };

    return LoadingControl;
  }
]);