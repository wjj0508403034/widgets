'use strict';

angular.module('huoyun.widget').provider("SearchExpr", function() {

  const CompareOps = ["eq", "ne", "gt", "ge", "lt", "le"];

  function SearchExpr() {

  }

  SearchExpr.prototype.getStringExpr = function(prop) {
    return prop.value && `${prop.name} like '${prop.value}'`;
  };

  SearchExpr.prototype.getNumberExpr = function(prop) {
    if (prop.value) {
      if (CompareOps.indexOf(prop.value.op) !== -1) {
        return `${prop.name} ${prop.value.op} ${prop.value.value}`;
      }

      if (prop.value.op === "between") {
        return `${prop.name} between (${prop.value.left} , ${prop.value.right})`;
      }
    }
  };


  SearchExpr.prototype.getExpr = function(prop) {
    if (typeof prop.type !== "string") {
      throw new Error(`Unkonwn property type.`, prop);
    }

    if (prop.type.toLocaleLowerCase() === "string") {
      return this.getStringExpr(prop);
    }
  };

  var expr = new SearchExpr();

  this.config = function(options) {
    ["String"].forEach(function(type) {
      if (typeof options[type] === "function") {
        SearchExpr.prototype[`get${type}Expr`] = options[type];
      }
    });
  };

  this.$get = function() {
    return expr;
  };
});