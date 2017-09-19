'use strict';


function Linq(array) {

  this.getArray = function() {
    return array;
  };
}

Linq.prototype.join = function(cb, separator) {
  if (typeof cb === "function") {
    var res = [];
    this.getArray().forEach(function(item) {
      var temp = cb(item);
      if (temp !== null && temp !== undefined && temp !== "") {
        res.push(temp);
      }
    });

    return res.join(separator);
  }

  return this.getArray().join(separator);
};

Array.prototype.linq = function() {
  return new Linq(this);
};