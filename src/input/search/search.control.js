'use strict';

angular.module('huoyun.widget').factory("SearchControl", ["HuoYunWidgetCore", "InputControl",
  function(HuoYunWidgetCore, InputControl) {

    function SearchControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(SearchControl, InputControl);

    SearchControl.prototype.isSearching = function() {
      return !!this.getValue();
    };

    SearchControl.prototype.appendSearchIconClass = function() {
      return this.isSearching() ? "fa-times" : "fa-search";
    };

    SearchControl.prototype.onSearchBoxButtonClicked = function() {
      if (this.isSearching()) {
        this.setValue(null);
      }
    };

    return SearchControl;
  }
]);