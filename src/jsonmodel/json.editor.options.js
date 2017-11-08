'use strict';

angular.module('huoyun.widget').factory("JsonEditor", ["JsonModel", function(JsonModel) {

  function JsonEditor(options) {

    this.$$currentTab = "Preview";

    this.getOptions = function() {
      return options;
    };
  }

  JsonEditor.prototype.isTabVisibility = function(tabName) {
    return tabName === this.$$currentTab;
  };

  JsonEditor.prototype.onTabClicked = function(tabName) {
    this.$$jsonModel = null;
    this.$$currentTab = tabName;
  };

  JsonEditor.prototype.tabSelectedClass = function(tabName) {
    return tabName === this.$$currentTab ? "btn-primary" : "btn-default";
  };

  JsonEditor.prototype.setValue = function(value) {
    this.$$value = value;
    return this;
  };

  JsonEditor.prototype.setFormGroup = function(formGroup) {
    this.$$formGroup = formGroup;
  };

  JsonEditor.prototype.getFormGroup = function() {
    return this.$$formGroup;
  };

  JsonEditor.prototype.getValue = function() {
    return this.$$value;
  };

  JsonEditor.prototype.getJsonModel = function() {
    if (!this.$$jsonModel) {
      this.$$jsonModel = new JsonModel(this.getFormGroup().getPropertyValue());
    }

    return this.$$jsonModel;
  };



  return JsonEditor;
}]);