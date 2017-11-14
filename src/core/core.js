'use strict';

angular.module('huoyun.widget').factory("ClassExtend", [function() {


  function ClassExtend(Child, Parent) {

    if (Child === undefined || Child === null)
      throw new Error('ERR_INVALID_ARG_TYPE', 'Child', 'function');
    if (Parent === undefined || Parent === null)
      throw new Error('ERR_INVALID_ARG_TYPE', 'Parent', 'function');
    if (Parent.prototype === undefined) {
      throw new Error('ERR_INVALID_ARG_TYPE', 'Parent.prototype',
        'function');
    }
    Child.super = Parent;
    Object.setPrototypeOf(Child.prototype, Parent.prototype);　
  }
  return ClassExtend;
}]);



angular.module('huoyun.widget').factory("$Promise", ["$q", function($q) {

  return {
    resolve: function(obj) {
      if (obj instanceof Promise || obj instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.resolve(obj);
      return deferred.promise;
    },
    reject: function(obj) {
      if (obj instanceof Promise || obj instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.reject(obj);
      return deferred.promise;
    },
    all: function(promises) {
      return $q.all(promises);
    }
  };
}]);

angular.module('huoyun.widget').factory("HuoYunWidgetCore", ["ClassExtend", "Control", "$Promise",
  function(ClassExtend, Control, $Promise) {
    return {
      ClassExtend: ClassExtend,
      Control: Control,
      Promise: $Promise
    };
  }
]);