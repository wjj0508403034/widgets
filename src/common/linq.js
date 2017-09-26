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

Linq.prototype.first = function(cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return array[index];
    }
  }
};

Linq.prototype.exists = function(item, cb) {
  if (!cb) {
    return this.getArray().indexOf(item) !== -1;
  }

  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return true;
    }
  }
};

Linq.prototype.any = function(cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return true;
    }
  }

  return false;
};

Linq.prototype.all = function(cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (!cb(array[index], index)) {
      return false;
    }
  }

  return true;
};

Linq.prototype.toMap = function(keyOrCallback) {
  var map = {};
  this.getArray().forEach(function(item, index) {
    if (typeof keyOrCallback === "string") {
      map[item[keyOrCallback]] = item;
    } else if (typeof key === "function") {
      map[keyOrCallback(item, index)] = item;
    } else {
      throw new Error("keyOrCallback is invalid");
    }
  });

  return map;
};

Array.prototype.linq = function() {
  return new Linq(this);
};