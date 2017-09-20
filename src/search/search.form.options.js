'use strict';

angular.module('huoyun.widget').factory("SearchConditions", [function() {

  return [{
    name: "eq",
    label: "等于",
    op: "="
  }, {
    name: "ne",
    label: "不等于",
    op: "<>"
  }, {
    name: "gt",
    label: "大于",
    op: ">"
  }, {
    name: "ge",
    label: "大于等于",
    op: ">="
  }, {
    name: "lt",
    label: "小于",
    op: "<"
  }, {
    name: "le",
    label: "小于等于",
    op: "<="
  }, {
    name: "between",
    label: "在范围内"
  }];

}]);

angular.module('huoyun.widget').factory("SearchConditionValue", ["SearchConditions",
  function(SearchConditions) {

    const props = ["op", "value", "left", "right"];

    function SearchConditionValue(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });
    };

    SearchConditionValue.prototype.$$getValueExpr = function() {
      if (this.op === "between") {
        return `[ ${this.left} , ${this.right} ]`
      }

      for (var index = 0; index < SearchConditions.length; index++) {
        if (SearchConditions[index].name === this.op) {
          return `${SearchConditions[index].label} ${this.value}`;
        }
      }
    };

    return SearchConditionValue;
  }
]);

angular.module('huoyun.widget').factory("SearchPropertyDataListOption", ["HuoyunPromise",
  function(HuoyunPromise) {

    const props = ["valueField", "labelField", "itemTemplateUrl", "searchVisibility", "loadVisibility"];

    function SearchPropertyDataListOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      this.getOptions = function() {
        return options;
      };
    };

    SearchPropertyDataListOption.prototype.$$getDataSource = function() {
      return HuoyunPromise.resolve(this.getOptions().getDataSource());
    };

    SearchPropertyDataListOption.prototype.$$search = function(val) {
      return HuoyunPromise.resolve(this.getOptions().search(val));
    };

    SearchPropertyDataListOption.prototype.$$loadMore = function(loadCount, searchText) {
      return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
    };

    SearchPropertyDataListOption.prototype.$$loadVisibility = function() {
      return this.loadVisibility === true;
    };

    SearchPropertyDataListOption.prototype.$$searchVisibility = function() {
      return this.searchVisibility === true;
    };

    SearchPropertyDataListOption.prototype.$$getValueExpr = function(values) {
      if (Array.isArray(values)) {
        var that = this;

        return values.linq().join(function(value) {
          return value[that.labelField]
        }, ", ");
      }
    };

    return SearchPropertyDataListOption;
  }
]);

angular.module('huoyun.widget').factory("SearchPropertyOption", ["SearchExpr", "SearchPropertyDataListOption",
  "SearchConditionValue",
  function(SearchExprProvider, SearchPropertyDataListOption, SearchConditionValue) {

    const props = ["name", "label", "type", "value", "getSearchExpr", "getValueExpr"];

    function SearchPropertyOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      if (that.type === "DataList") {
        if (!options.datalist) {
          throw new Error("Not found property datalist");
        }
        that.datalist = new SearchPropertyDataListOption(options.datalist);
      }
    }

    SearchPropertyOption.prototype.$$onChanged = function(val) {
      this.form.search();
    };

    SearchPropertyOption.prototype.setForm = function(form) {
      this.form = form;
    };

    SearchPropertyOption.prototype.setValue = function(val) {
      this.value = val;
    };

    SearchPropertyOption.prototype.clear = function() {
      this.value = null;
    };

    SearchPropertyOption.prototype.$$getValueExpr = function() {
      if (typeof this.getValueExpr === "function") {
        return this.getValueExpr(this);
      }

      if (this.type === "DataList") {
        return this.datalist && this.datalist.$$getValueExpr(this.value);
      }

      if (this.value instanceof SearchConditionValue) {
        return this.value.$$getValueExpr();
      }
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
          that.buttons.push(new ButtonOption(button));
        });
      }
    }

    SearchFormOption.prototype.search = function() {
      if (this.onSearch) {
        var that = this;
        var expr = that.props.linq().join(function(prop) {
          return prop.$$getSearchExpr();
        }, " and ")
        this.onSearch(expr);
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