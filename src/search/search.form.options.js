'use strict';

angular.module('huoyun.widget').factory("SearchConditionValue", [function() {


  function SearchConditionValue() {
    this.op = null;
    this.value = null;
    this.left = null;
    this.right = null;
  };

  return SearchConditionValue;

}]);

angular.module('huoyun.widget').factory("SearchPropertyOption", ["SearchExpr",
  function(SearchExprProvider) {

    const props = ["name", "label", "type", "value", "getSearchExpr"];

    function SearchPropertyOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });
    }

    SearchPropertyOption.prototype.$$onChanged = function(val) {
      this.form.search();
    };

    SearchPropertyOption.prototype.setForm = function(form) {
      this.form = form;
    };

    SearchPropertyOption.prototype.clear = function() {
      this.value = null;
    };

    SearchPropertyOption.prototype.$$getSearchExpr = function() {
      if (typeof this.getSearchExpr === "function") {
        return this.getSearchExpr(this);
      }

      return SearchExprProvider.getExpr(this);
    };

    return SearchPropertyOption;
  }
]);

angular.module('huoyun.widget').factory("SearchFormOption", ["ButtonOption", "widgetsHelper", "SearchPropertyOption",
  function(ButtonOption, widgetsHelper, SearchPropertyOption) {

    const props = ["title", "icon"];
    const eventHandlers = ["onSearch"];

    function SearchFormOption(options) {
      var that = this;

      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      eventHandlers.forEach(function(eventHandler) {
        if (options[eventHandler] && typeof options[eventHandler] === "function") {
          that[eventHandler] = options[eventHandler];
        }
      });

      that.props = [];
      if (Array.isArray(options.props)) {
        options.props.forEach(function(prop) {
          var propOption = new SearchPropertyOption(prop);
          propOption.setForm(that);
          that.props.push(propOption);
        });
      }

      that.buttons = [];
      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(button) {
          that.buttons = new ButtonOption(button);
        });
      }
    }

    SearchFormOption.prototype.search = function() {
      if (this.onSearch) {
        var exprs = [];
        var that = this;
        that.props.forEach(function(prop) {
          var expr = prop.$$getSearchExpr();
          if (expr) {
            exprs.push(expr);
          }
        });
        this.onSearch(exprs.join(" and "));
      }
    };

    SearchFormOption.prototype.clear = function() {
      var that = this;
      that.props.forEach(function(prop) {
        prop.clear();
      });
      this.onSearch && this.onSearch();
    };

    return SearchFormOption;
  }
]);