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
    Child.super_ = Parent;
    Object.setPrototypeOf(Child.prototype, Parent.prototype);　　
  }
  return ClassExtend;
}]);

angular.module('huoyun.widget').factory("HuoYunWidgetCore", ["ClassExtend", "Control",
  function(ClassExtend, Control) {
    return {
      ClassExtend: ClassExtend,
      Control: Control
    };
  }
]);

angular.module('huoyun.widget').run([function() {

}]);