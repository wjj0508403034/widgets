'use strict';

angular.module('huoyun.widget', ['ngDialog']);

angular.module('huoyun.widget').provider("display", function () {

  this.date = "yyyy-MM-dd";
  this.datetime = "yyyy-MM-dd HH:mm";

  /**
   * options
   *  - date
   *  - datetime
   */
  this.config = function (options) {
    var that = this;
    ["date", "datetime"].forEach(function (prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function () {
    return this;
  };
});

angular.module('huoyun.widget').factory("HuoYunWidgets", ["Dialog", "Tip", "SidebarOption", "NavOption", "BreadCrumbOption", "FormOption", "SearchFormOption", "ButtonOption", "SidebarPanelOption", "ButtonControl", "FormControl", "HuoYunWidgetsInputs", "ListViewControl", "TableControl", function (Dialog, Tip, SidebarOption, NavOption, BreadCrumbOption, FormOption, SearchFormOption, ButtonOption, SidebarPanelOption, ButtonControl, FormControl, HuoYunWidgetsInputs, ListViewControl, TableControl) {

  return {
    Dialog: Dialog,
    SidebarOption: SidebarOption,
    NavOption: NavOption,
    BreadCrumbOption: BreadCrumbOption,
    Tip: Tip,
    FormOption: FormOption,
    SearchFormOption: SearchFormOption,
    ButtonOption: ButtonOption,
    SidebarPanelOption: SidebarPanelOption,
    ListView: ListViewControl,
    Controls: {
      Button: ButtonControl,
      Form: FormControl,
      Inputs: HuoYunWidgetsInputs,
      Table: TableControl
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsBreadCrumb', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'breadcrumb/breadcrumb.html',
    link: function link($scope, ele, attrs) {

      $scope.itemStyle = function (item) {
        return widgetsHelper.style(item);
      };

      $scope.onItemClicked = function (item, index) {
        if ($scope.options.items.length - 1 !== index) {
          if (typeof item.onClick === "function") {
            item.onClick.apply(item);
          } else {
            $log.warn("Nav item no click handler.", item);
          }
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("BreadCrumbOption", ["BreadCrumbItemOption", function (BreadCrumbItemOption) {

  function BreadCrumbOption(options) {
    this.items = [];
    if (Array.isArray(options.items)) {
      var that = this;
      options.items.forEach(function (item) {
        that.items.push(new BreadCrumbItemOption(item));
      });
    }
  }

  return BreadCrumbOption;
}]);

angular.module('huoyun.widget').factory("BreadCrumbItemOption", [function () {

  var props = ["name", "label", "onClick", "style", "icon"];

  function BreadCrumbItemOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  return BreadCrumbItemOption;
}]);
'use strict';

angular.module('huoyun.widget').factory("ButtonControl", ["$log", "HuoYunWidgetCore", function ($log, HuoYunWidgetCore) {

  function ButtonControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ButtonControl, HuoYunWidgetCore.Control);

  ButtonControl.prototype.getButtonName = function () {
    return this.getOptions().name;
  };

  ButtonControl.prototype.getButtonIcon = function () {
    return this.getOptions().icon;
  };

  ButtonControl.prototype.isButtonIconVisibility = function () {
    return !!this.getButtonIcon();
  };

  ButtonControl.prototype.getButtonText = function () {
    return this.getOptions().text;
  };

  ButtonControl.prototype.onClick = function () {
    if (this.isDisabled()) {
      return;
    }

    if (typeof this.getOptions().onClick === "function") {
      this.getOptions().onClick.apply(this);
      return;
    }

    $log.warn("Button no click handler.", this);
  };

  return ButtonControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsButton', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'button/button.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("ButtonOption", ["widgetsHelper", "$log", function (widgetsHelper, $log) {
  function ButtonOption(options) {
    this.getOptions = function () {
      return options;
    };
  }

  ButtonOption.prototype.getName = function () {
    return this.getOptions().name;
  };

  ButtonOption.prototype.getAppendClass = function () {
    return this.getOptions().appendClass;
  };

  ButtonOption.prototype.isVisibility = function () {
    return widgetsHelper.visibility(this.getOptions());
  };

  ButtonOption.prototype.isDisabled = function () {
    return widgetsHelper.disabled(this.getOptions());
  };

  ButtonOption.prototype.getStyle = function () {
    return widgetsHelper.style(this.getOptions());
  };

  ButtonOption.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  ButtonOption.prototype.getText = function () {
    return this.getOptions().label;
  };

  ButtonOption.prototype.onClick = function () {
    if (!this.isDisabled()) {
      if (typeof this.getOptions().onClick === "function") {
        this.getOptions().onClick.apply(this);
      } else {
        $log.warn("Button no click handler.", this);
      }
    }
  };

  return ButtonOption;
}]);
'use strict';

angular.module('huoyun.widget').factory("CheckBoxControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function CheckBoxControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(CheckBoxControl, HuoYunWidgetCore.Control);

  CheckBoxControl.prototype.getValue = function () {
    return this.getOptions().value;
  };

  CheckBoxControl.prototype.setValue = function (val) {
    this.getOptions().value = val;
    return this;
  };

  CheckBoxControl.prototype.isChecked = function () {
    return this.getValue() === true;
  };

  CheckBoxControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  CheckBoxControl.prototype.setText = function (text) {
    this.getOptions().text = text;
    return this;
  };

  CheckBoxControl.prototype.getIconClass = function () {
    return this.isChecked() ? "fa-check-square-o" : "fa-square-o";
  };

  CheckBoxControl.prototype.onClick = function ($event) {
    var oldValue = this.getValue();
    var newValue = !oldValue;
    this.setValue(newValue).raiseEvent(newValue ? "checked" : "unchecked");
  };

  return CheckBoxControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsCheckBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'checkbox/checkbox.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('huoyun.widget').factory("Control", [function () {
  function Control(options) {
    this.$$eventMap = {};

    this.getOptions = function () {
      if (options === null || options === undefined) {
        options = {};
      }
      return options;
    };
  }

  Control.prototype.getId = function () {
    if (!this.$$id) {
      if (this.getOptions().id) {
        this.$$id = this.getOptions().id;
      } else {
        var now = new Date();
        this.$$id = now.getTime();
      }
    }

    return this.$$id;
  };

  Control.prototype.getName = function () {
    return this.getOptions().name;
  };

  Control.prototype.getControlName = function () {
    return this.constructor.name;
  };

  Control.prototype.appendClass = function () {
    return this.getOptions().appendClass;
  };

  Control.prototype.getTemplateUrl = function () {
    return this.getOptions().templateUrl;
  };

  Control.prototype.isCustomizeTemplate = function () {
    return !!this.getTemplateUrl();
  };

  Control.prototype.getStyle = function () {
    var style = this.getOptions().style;
    if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === "object") {
      return style;
    }

    if (typeof style === "function") {
      return style.apply(this);
    }
  };

  Control.prototype.isVisibility = function () {
    return this.__isTrue("visibility");
  };

  Control.prototype.isDisabled = function () {
    return this.__isFalse("disabled");
  };

  Control.prototype.__isTrue = function (propName) {
    return !this.__isFalse(propName);
  };

  Control.prototype.__isFalse = function (propName) {
    var propValue = this.getOptions()[propName];

    if (typeof propValue === "boolean") {
      return propValue;
    }

    if (typeof propValue === "function") {
      return propValue.apply(this);
    }

    return false;
  };

  Control.prototype.getEventListeners = function (eventName) {
    if (!this.$$eventMap[eventName]) {
      this.$$eventMap[eventName] = [];
    }
    return this.$$eventMap[eventName];
  };

  Control.prototype.on = function (eventName, listener) {
    if (typeof listener !== "function") {
      throw new Event("Event listener must be function");
    }
    this.getEventListeners(eventName).push(listener);

    return this;
  };

  Control.prototype.off = function (eventName, listener) {
    var listeners = this.getEventListeners();

    if (listener === undefined) {
      listeners = [];
    }

    if (typeof listener !== "function") {
      throw new Event("Event listener must be function");
    }

    var index = listeners.indexOf(listener);
    listeners.splice(index, 1);
    return this;
  };

  Control.prototype.raiseEvent = function (eventName, args) {
    var that = this;
    var listeners = this.getEventListeners(eventName);
    listeners.forEach(function (listener) {
      listener.apply(that, args);
    });
  };

  return Control;
}]);
'use strict';

angular.module('huoyun.widget').factory("ClassExtend", [function () {

  function ClassExtend(Child, Parent) {

    if (Child === undefined || Child === null) throw new Error('ERR_INVALID_ARG_TYPE', 'Child', 'function');
    if (Parent === undefined || Parent === null) throw new Error('ERR_INVALID_ARG_TYPE', 'Parent', 'function');
    if (Parent.prototype === undefined) {
      throw new Error('ERR_INVALID_ARG_TYPE', 'Parent.prototype', 'function');
    }
    Child.super = Parent;
    Object.setPrototypeOf(Child.prototype, Parent.prototype);
  }
  return ClassExtend;
}]);

angular.module('huoyun.widget').factory("$Promise", ["$q", function ($q) {

  return {
    resolve: function resolve(obj) {
      if (obj instanceof Promise || obj instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.resolve(obj);
      return deferred.promise;
    },
    reject: function reject(obj) {
      if (obj instanceof Promise || obj instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.reject(obj);
      return deferred.promise;
    },
    all: function all(promises) {
      return $q.all(promises);
    }
  };
}]);

angular.module('huoyun.widget').factory("HuoYunWidgetCore", ["ClassExtend", "Control", "$Promise", "Validator", function (ClassExtend, Control, $Promise, Validator) {
  return {
    ClassExtend: ClassExtend,
    Control: Control,
    Promise: $Promise,
    Validator: Validator
  };
}]);

angular.module('huoyun.widget').run([function () {}]);
'use strict';

function Linq(array) {

  this.getArray = function () {
    return array;
  };
}

Linq.prototype.join = function (cb, separator) {
  if (typeof cb === "function") {
    var res = [];
    this.getArray().forEach(function (item) {
      var temp = cb(item);
      if (temp !== null && temp !== undefined && temp !== "") {
        res.push(temp);
      }
    });

    return res.join(separator);
  }

  return this.getArray().join(separator);
};

Linq.prototype.first = function (cb) {
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

Linq.prototype.exists = function (item, cb) {
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

Linq.prototype.any = function (cb) {
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

Linq.prototype.all = function (cb) {
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

Linq.prototype.toMap = function (keyOrCallback) {
  var map = {};
  this.getArray().forEach(function (item, index) {
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

Linq.prototype.toArray = function (keyOrCallback) {
  var array = [];
  this.getArray().forEach(function (item, index) {
    if (typeof keyOrCallback === "string") {
      array.push(item[keyOrCallback]);
    } else if (typeof key === "function") {
      array.push(keyOrCallback(item, index));
    } else {
      throw new Error("keyOrCallback is invalid");
    }
  });
  return array;
};

Array.prototype.linq = function () {
  return new Linq(this);
};
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('huoyun.widget').factory("HuoyunPromise", ["$q", function ($q) {

  return {
    resolve: function resolve(val) {
      if (val instanceof Promise || val instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.resolve(val);
      return deferred.promise;
    }
  };
}]);

angular.module('huoyun.widget').factory("widgetsHelper", function () {

  String.prototype.pad = function (width) {
    var temp = this.split(".");
    if (temp[0].length < width) {
      temp[0] = new Array(width - temp[0].length + 1).join("0") + temp[0];
    }

    return temp.join(".");
  };

  return {

    visibility: function visibility(obj, defaultValue) {
      if (typeof obj.visibility === "boolean") {
        return obj.visibility;
      }

      if (typeof obj.visibility === "function") {
        return obj.visibility.apply(obj);
      }

      if (typeof defaultValue === "boolean") {
        return defaultValue;
      }

      return true;
    },

    disabled: function disabled(obj) {
      if (typeof obj.disabled === "boolean") {
        return obj.disabled;
      }

      if (typeof obj.disabled === "function") {
        return obj.disabled.apply(obj);
      }

      return false;
    },

    readonly: function readonly(obj) {
      if (typeof obj.readonly === "boolean") {
        return obj.readonly;
      }

      if (typeof obj.readonly === "function") {
        return obj.readonly.apply(obj);
      }

      return false;
    },

    style: function style(obj) {
      if (obj) {
        if (_typeof(obj.style) === "object") {
          return obj.style;
        }

        if (typeof obj.style === "function") {
          return obj.style.apply(obj);
        }
      }
    },

    durationFormat: function durationFormat(time) {
      var hour = 0;
      var minuter = 0;
      var second = 0;

      if (time) {
        if (time < 60) {
          second = time;
        } else {
          second = time % 60;
          var temp = time / 60;
          if (temp < 60) {
            minuter = temp;
          } else {
            hour = temp / 60;
            minuter = temp % 60;
          }
        }
      }

      return hour.toFixed(0).pad(2) + ':' + minuter.toFixed(0).pad(2) + ':' + second.toFixed(3).pad(2);
    }
  };
});
'use strict';

/*
 * https://github.com/likeastore/ngDialog
 */

angular.module('huoyun.widget').config(["ngDialogProvider", function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

angular.module('huoyun.widget').controller("ConfirmDialogController", ["$scope", function ($scope) {
  $scope.onCancelButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onCancelButtonClicked === "function") {
      $scope.ngDialogData.onCancelButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('Cancel');
    }
  };

  $scope.onConfirmButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onConfirmButtonClicked === "function") {
      $scope.ngDialogData.onConfirmButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('OK');
    }
  };

  $scope.confirmClose = function () {
    $scope.closeThisDialog('OK');
  };

  $scope.cancelClose = function () {
    $scope.closeThisDialog('Cancel');
  };
}]);

angular.module('huoyun.widget').factory("Dialog", ['$q', 'ngDialog', function ($q, ngDialog) {

  return {
    showError: function showError(message, title, buttonText) {
      return this.showConfirm({
        title: title || "错误",
        content: message,
        cancel: {
          visibility: false
        },
        confirm: {
          text: buttonText || "知道了"
        }
      });
    },

    showConfirm: function showConfirm(options) {
      var dialogOptions = {
        template: "dialog/dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        closeByDocument: !!options.closeByDocument,
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: options.confirm && options.confirm.text || "确定",
          cancelButtonText: options.cancel && options.cancel.text || "取消",
          confirmButtonVisibility: !(options.confirm && options.confirm.visibility === false),
          cancelButtonVisibility: !(options.cancel && options.cancel.visibility === false),
          params: options.params
        }
      };

      ngDialog.open(dialogOptions).closePromise.then(function (data) {
        if (data.value) {
          if (Array.isArray(data.value) && data.value.length > 0) {
            var key = data.value[0];
            if (key === 'OK' && options.confirm && typeof options.confirm.callback === "function") {
              return options.confirm.callback.apply(this, data.value);
            }

            if (key === "Cancel" && options.cancel && typeof options.cancel.callback === "function") {
              return options.cancel.callback.apply(this, data.value);
            }

            if (typeof options.closeCallback === "function") {
              return options.closeCallback.apply(this, data.value);
            }
          }

          if (typeof options.closeCallback === "function") {
            return options.closeCallback.apply(this, [data.value]);
          }
        }

        if (typeof options.closeCallback === "function") {
          return options.closeCallback.apply(this);
        }
      });
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("FormOrientation", [function () {

  var Orientations = {
    Horizontal: "horizontal",
    Vertical: "vertical"
  };

  function FormOrientation(val) {
    this.$$value = Orientations.Vertical;
    if (typeof val === "string") {
      if (val.toLowerCase() === "horizontal") {
        this.$$value = Orientations.Horizontal;
      }
    }
  }

  FormOrientation.prototype.getValue = function () {
    return this.$$value.toLowerCase();
  };

  FormOrientation.prototype.appendClass = function () {
    if (this.getValue() === Orientations.Horizontal) {
      return "form-horizontal";
    }
    return "";
  };

  return FormOrientation;
}]);

angular.module('huoyun.widget').factory("FormHeaderControl", ["HuoYunWidgetCore", "ButtonControl", function (HuoYunWidgetCore, ButtonControl) {

  function FormHeaderControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    var that = this;
    that.$$buttons = [];

    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (button) {
        that.$$buttons.push(new ButtonControl(button));
      });
    }
  }

  HuoYunWidgetCore.ClassExtend(FormHeaderControl, HuoYunWidgetCore.Control);

  FormHeaderControl.prototype.getTitle = function () {
    return this.getOptions().title;
  };

  FormHeaderControl.prototype.getButtons = function () {
    return this.$$buttons;
  };

  return FormHeaderControl;
}]);

angular.module('huoyun.widget').factory("FormFooterControl", ["HuoYunWidgetCore", "ButtonControl", function (HuoYunWidgetCore, ButtonControl) {

  function FormFooterControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    var that = this;
    that.$$buttons = [];

    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (button) {
        that.$$buttons.push(new ButtonControl(button));
      });
    }
  }

  HuoYunWidgetCore.ClassExtend(FormFooterControl, HuoYunWidgetCore.Control);

  FormFooterControl.prototype.getButtons = function () {
    return this.$$buttons;
  };

  return FormFooterControl;
}]);

angular.module('huoyun.widget').factory("FormControl", ["$log", "HuoYunWidgetCore", "FormGroupControl", "FormOrientation", "FormHeaderControl", "FormFooterControl", function ($log, HuoYunWidgetCore, FormGroupControl, FormOrientation, FormHeaderControl, FormFooterControl) {

  function FormControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
    this.$$data = {};
    var that = this;

    that.$$orientation = new FormOrientation(options.orientation);
    that.$$groups = [];

    if (options.header) {
      that.$$header = new FormHeaderControl(options.header);
    }

    if (options.footer) {
      that.$$footer = new FormFooterControl(options.footer);
    }

    if (options.groups) {
      if (Array.isArray(options.groups)) {
        options.groups.forEach(function (group) {
          var control = new FormGroupControl(group).setFormControl(that).on("valueChanged", function (newVal, oldVal) {
            that.setPropertyValue(control.getName(), newVal);
          });

          that.$$groups.push(control);
        });
      } else {
        throw new Error("groups should be array.");
      }
    }
  }

  HuoYunWidgetCore.ClassExtend(FormControl, HuoYunWidgetCore.Control);

  FormControl.prototype.getOrientation = function () {
    return this.$$orientation.getValue();
  };

  FormControl.prototype.appendOrientationClass = function () {
    return this.$$orientation.appendClass();
  };

  FormControl.prototype.isReadonly = function () {
    return this.__isFalse("readonly");
  };

  FormControl.prototype.getHeader = function () {
    return this.$$header;
  };

  FormControl.prototype.getFooter = function () {
    return this.$$footer;
  };

  FormControl.prototype.isFooterVisibility = function () {
    return this.getFooter().isVisibility();
  };

  FormControl.prototype.getGroups = function () {
    return this.$$groups;
  };

  FormControl.prototype.getBindExpr = function (formGroup) {
    return this.getPropertyValue(formGroup.getName());
  };

  FormControl.prototype.setData = function (data) {
    this.$$data = data;
    return this;
  };

  FormControl.prototype.getData = function () {
    return this.$$data;
  };

  FormControl.prototype.getPropertyValue = function (propName) {
    return this.getData()[propName];
  };

  FormControl.prototype.setPropertyValue = function (propName, val) {
    var oldVal = this.getPropertyValue(propName);
    this.__setPropertyValue(propName, val);
    this.raiseEvent("propertyValueChanged", [propName, val, oldVal]);
    return this;
  };

  FormControl.prototype.__setPropertyValue = function (propName, val) {
    this.getData()[propName] = val;
    return this;
  };

  return FormControl;
}]);
'use strict';

angular.module('huoyun.widget').provider("FormControlProvider", [function () {

  var controls = {};

  this.registerControl = function (type, control) {
    controls[type] = control;
    return this;
  };

  this.getControlbyType = function (type) {
    return controls[type];
  };

  this.$get = function () {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["FormControlProvider", "HuoYunWidgetsInputs", function (FormControlProvider, HuoYunWidgetsInputs) {
  FormControlProvider.registerControl("DROPDOWN", HuoYunWidgetsInputs.Dropdown);
  FormControlProvider.registerControl("EMAIL", HuoYunWidgetsInputs.EmailBox);
  FormControlProvider.registerControl("STRING", HuoYunWidgetsInputs.TextBox);
  FormControlProvider.registerControl("DATALIST", HuoYunWidgetsInputs.DataList);
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsForm', ["$log", function ($log) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'form/form.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("FormHeaderOption", ["ButtonOption", "widgetsHelper", function (ButtonOption, widgetsHelper) {

  function FormHeaderOption(options) {
    this.title = options.title;
    this.buttons = [];

    var that = this;
    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (buttonOption) {
        that.buttons.push(new ButtonOption(buttonOption));
      });
    }
  }

  FormHeaderOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  return FormHeaderOption;
}]);

angular.module('huoyun.widget').factory("FormFooterOption", ["ButtonOption", "widgetsHelper", function (ButtonOption, widgetsHelper) {

  function FormFooterOption(options) {
    this.visibility = options.visibility;

    this.buttons = [];

    var that = this;
    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (buttonOption) {
        that.buttons.push(new ButtonOption(buttonOption));
      });
    }
  }

  FormFooterOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  return FormFooterOption;
}]);

angular.module('huoyun.widget').factory("FormGroupDataListSelection", [function () {
  var Modes = {
    Single: "Single",
    Multiple: "Multiple"
  };

  function FormGroupDataListSelection(options) {
    this.mode = Modes.Single;

    if (options && typeof options.mode === "string") {
      if (options.mode.toLowerCase() === "single") {
        this.mode = TableSelection.Single;
      } else if (options.mode.toLowerCase() === "multiple") {
        this.mode = TableSelection.Multiple;
      }
    }
  }

  FormGroupDataListSelection.prototype.isSingle = function () {
    return this.mode === Modes.Single;
  };

  return FormGroupDataListSelection;
}]);

angular.module('huoyun.widget').factory("FormGroupDataListOption", ["HuoyunPromise", "FormGroupDataListSelection", function (HuoyunPromise, FormGroupDataListSelection) {

  var props = ["valueField", "labelField", "itemTemplateUrl"];

  function FormGroupDataListOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.selection = new FormGroupDataListSelection(options.selection);

    this.getOptions = function () {
      return options;
    };
  }

  FormGroupDataListOption.prototype.$$getDataSource = function () {
    return HuoyunPromise.resolve(this.getOptions().getDataSource());
  };

  FormGroupDataListOption.prototype.$$search = function (val) {
    return HuoyunPromise.resolve(this.getOptions().search(val));
  };

  FormGroupDataListOption.prototype.$$loadMore = function (loadCount, searchText) {
    return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
  };

  FormGroupDataListOption.prototype.$$loadVisibility = function () {
    return this.getOptions().loadVisibility === true;
  };

  FormGroupDataListOption.prototype.$$searchVisibility = function () {
    return this.getOptions().searchVisibility === true;
  };

  FormGroupDataListOption.prototype.$$getItemValueLabel = function (item) {
    return item && item[this.labelField];
  };

  FormGroupDataListOption.prototype.$$getItemsValueLabel = function (items) {
    if (Array.isArray(items)) {
      var that = this;

      return items.linq().join(function (item) {
        return item[that.labelField];
      }, ", ");
    }

    return items;
  };

  FormGroupDataListOption.prototype.$$getValueLabel = function (val) {
    if (this.selection.isSingle()) {
      return this.$$getItemValueLabel(val);
    }

    return this.$$getItemsValueLabel(val);
  };

  return FormGroupDataListOption;
}]);

angular.module('huoyun.widget').factory("FormGroupDropDownOption", [function () {

  function FormGroupDropDownOption(options) {

    this.getOptions = function () {
      return options;
    };
  }

  FormGroupDropDownOption.prototype.getDataSource = function () {
    if (!this.dataSource) {
      this.dataSource = this.getOptions().data;
    }

    if (!Array.isArray(this.dataSource)) {
      throw new Error("data isn't array");
    }

    return this.dataSource;
  };

  FormGroupDropDownOption.prototype.getLabelField = function () {
    return this.getOptions().labelField;
  };

  FormGroupDropDownOption.prototype.getLabel = function (option) {
    var labelField = this.getLabelField();
    if (labelField) {
      return option[labelField];
    }

    return option;
  };

  FormGroupDropDownOption.prototype.getValueField = function () {
    return this.getOptions().valueField;
  };

  FormGroupDropDownOption.prototype.getValue = function (option) {
    var valueField = this.getValueField();
    if (valueField) {
      return option[valueField];
    }
    return option;
  };

  return FormGroupDropDownOption;
}]);

angular.module('huoyun.widget').factory("FormGroupOption", ["widgetsHelper", "Form", "FormOrientation", "FormValidators", "FormGroupDataListOption", "FormGroupDropDownOption", function (widgetsHelper, FormProvider, FormOrientation, FormValidators, FormGroupDataListOption, FormGroupDropDownOption) {

  var props = ["name", "label", "mandatory", "type", "readonly", "visibility", "disabled", "templateUrl", "appendLabelClass", "appendControlClass", "placeholder", "appendClass"];

  function FormGroupOption(options) {
    this.validators = [];
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    if (this.type === "DataList") {
      if (!options.datalist) {
        throw new Error("Not found property datalist");
      }
      that.datalist = new FormGroupDataListOption(options.datalist);
    } else if (this.type === "DropDown") {
      if (!options.dropdown) {
        throw new Error("Not found property dropdown");
      }
      that.control = new FormGroupDropDownOption(options.dropdown);
    }
  }

  FormGroupOption.prototype.setFormOption = function (formOption) {
    this.formOption = formOption;
  };

  FormGroupOption.prototype.setValue = function (val) {
    this.formOption.setPropertyValue(this.name, val);
  };

  FormGroupOption.prototype.getValue = function () {
    return this.formOption.getPropertyValue(this.name);
  };

  FormGroupOption.prototype.getControl = function () {
    return this.control;
  };

  FormGroupOption.prototype.$$getValueLabel = function () {
    var value = this.getValue();
    if (this.type === "DataList") {
      return this.datalist.$$getValueLabel(value);
    }

    return value;
  };

  FormGroupOption.prototype.$$visibility = function () {
    return widgetsHelper.visibility(this);
  };

  FormGroupOption.prototype.$$disabled = function () {
    return widgetsHelper.disabled(this);
  };

  FormGroupOption.prototype.$$readonly = function () {
    return widgetsHelper.readonly(this);
  };

  FormGroupOption.prototype.$$appendLabelClass = function () {
    if (this.formOption.getReadOnly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
      return this.appendLabelClass || FormProvider.getLabelClass();
    }
  };

  FormGroupOption.prototype.$$appendControlClass = function () {
    if (this.formOption.getReadOnly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
      return this.appendControlClass || FormProvider.getControlClass();
    }
  };

  FormGroupOption.prototype.addValidator = function (validator) {
    this.validators.push(new validator(this));
  };

  FormGroupOption.prototype.getValidators = function () {
    var validators = this.validators.concat([]);
    if (this.mandatory === true) {
      validators.push(new FormValidators.Mandatory(this));
    }

    if (this.type === "email") {
      validators.push(new FormValidators.Email(this));
    }

    return validators;
  };

  FormGroupOption.prototype.validator = function (val) {
    var promises = [];
    this.getValidators().forEach(function (validator) {
      promises.push(validator.onValid(val));
    });
    return Promise.all(promises);
  };

  FormGroupOption.prototype.setError = function (errorMessage) {
    this.hasError = true;
    if (errorMessage) {
      this.errorMessage = errorMessage;
    }
  };

  FormGroupOption.prototype.clearError = function () {
    this.hasError = false;
    this.errorMessage = null;
  };

  return FormGroupOption;
}]);

angular.module('huoyun.widget').provider("Form", [function () {
  this.orientation = "horizontal";
  this.labelClass = "col-sm-2";
  this.controlClass = "col-sm-10";

  this.config = function (options) {
    // if (options.orientation) {
    //   if (typeof options.orientation === "string") {
    //     if ([FormOrientation.Horizontal, FormOrientation.Vertical].indexOf(options.orientation.toLocaleLowerCase()) !==
    //       -1) {
    //       this.orientation = options.orientation;
    //     } else {
    //       throw new Error(`Form orientation value must be "horizontal" or "vertical"`);
    //     }
    //   } else {
    //     throw new Error(`Form orientation value must be "horizontal" or "vertical"`);
    //   }
    // }

    this.labelClass = options.labelClass;
    this.controlClass = options.controlClass;
  };

  this.getOrientation = function () {
    return this.orientation;
  };

  this.getLabelClass = function () {
    return this.labelClass;
  };

  this.getControlClass = function () {
    return this.controlClass;
  };

  this.$get = function () {
    return this;
  };
}]);

angular.module('huoyun.widget').factory("FormOption", ["$q", "FormHeaderOption", "FormGroupOption", "FormFooterOption", "FormOrientation", "Form", function ($q, FormHeaderOption, FormGroupOption, FormFooterOption, FormOrientation, FormProvider) {
  this.data = {};

  function FormOption(options) {

    if (options.orientation) {
      if ([FormOrientation.Horizontal, FormOrientation.Vertical].indexOf(options.orientation.toLocaleLowerCase()) !== -1) {
        this.orientation = options.orientation;
      } else {
        //throw new Error(`Form orientation value must be "horizontal" or "vertical"`);
      }
    }

    if (options.header) {
      this.header = new FormHeaderOption(options.header);
    }

    if (options.footer) {
      this.footer = new FormFooterOption(options.footer);
    }

    this.readonly = options.readonly;

    this.groups = [];

    var that = this;

    if (Array.isArray(options.groups)) {
      options.groups.forEach(function (groupOption) {
        var formGroupOption = new FormGroupOption(groupOption);
        formGroupOption.setFormOption(that);
        that.groups.push(formGroupOption);
      });
    }
  }

  FormOption.prototype.getFormOrientation = function () {
    if (this.orientation) {
      return this.orientation;
    }
    return FormProvider.getOrientation();
  };

  FormOption.prototype.$$formOrientationClass = function () {
    if (this.getFormOrientation() === FormOrientation.Horizontal) {
      return "form-horizontal";
    }
  };

  FormOption.prototype.getReadOnly = function () {
    if (typeof this.readonly === "boolean") {
      return this.readonly;
    }

    return false;
  };

  FormOption.prototype.setReadOnly = function (readonly) {
    this.readonly = readonly;
    return this;
  };

  FormOption.prototype.setData = function (data) {
    this.data = data;
    return this;
  };

  FormOption.prototype.getData = function () {
    return this.data;
  };

  FormOption.prototype.setPropertyValue = function (name, val) {
    if (!this.data) {
      this.data = {};
    }

    this.data[name] = val;
  };

  FormOption.prototype.getPropertyValue = function (name) {
    return this.data && this.data[name];
  };

  FormOption.prototype.validator = function () {
    var that = this;

    var promises = [];
    this.groups.forEach(function (group) {
      promises.push(group.validator(that.data[group.name]));
    });

    var dtd = $q.defer();
    Promise.all(promises).then(function () {
      dtd.resolve();
    }).catch(function (ex) {
      dtd.reject(ex);
    });

    return dtd.promise;
  };

  return FormOption;
}]);

angular.module('huoyun.widget').factory("FormValidators", ["MandatoryValidator", "EmailValidator", function (MandatoryValidator, EmailValidator) {
  return {
    Mandatory: MandatoryValidator,
    Email: EmailValidator
  };
}]);
'use strict';

/**
 * options:
 *  title:
 *  titleStyle
 *  onTitleClicked
 */

angular.module('huoyun.widget').directive('widgetsHead', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'head/head.html',
    link: function link($scope, ele, attrs) {

      $scope.titleStyle = function (style) {
        return widgetsHelper.style({
          style: style
        });
      };

      $scope.onTitleClick = function () {
        if (typeof $scope.options.onTitleClicked === "function") {
          $scope.options.onTitleClicked.apply(null);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("InputControl", ["HuoYunWidgetCore", "InputValidatorProvider", "InputErrorControl", function (HuoYunWidgetCore, InputValidatorProvider, InputErrorControl) {

  function InputControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(InputControl, HuoYunWidgetCore.Control);

  InputControl.prototype.getPlaceholder = function () {
    return this.getOptions().placeholder;
  };

  InputControl.prototype.isReadonly = function () {
    return this.__isFalse("readonly");
  };

  InputControl.prototype.setValue = function (value) {
    var oldVal = this.getValue();
    if (oldVal !== value) {
      this.$$value = value;
      this.raiseEvent("valueChanged", [value, oldVal]);
    }
    return this;
  };

  InputControl.prototype.getValue = function () {
    return this.$$value;
  };

  InputControl.prototype.addValidator = function (validator) {
    this.getValidators().push(validator);
  };

  InputControl.prototype.getValidators = function () {
    if (!this.$$validators) {
      this.$$validators = [];
    }

    return this.$$validators.concat(this.getGlobalValidators()).filter(function (validator) {
      return !!validator;
    });
  };

  InputControl.prototype.getGlobalValidators = function () {
    return InputValidatorProvider.getValidatorsByInputControl(this.constructor);
  };

  InputControl.prototype.validator = function () {
    var that = this;
    HuoYunWidgetCore.Promise.all(this.getValidators().map(function (validator) {
      var validatorInstance = new validator(that.getValue());
      return validatorInstance.onValid();
    })).then(function () {
      that.getErrorControl() && that.getErrorControl().clear();
    }).catch(function (ex) {
      that.$$error = new InputErrorControl(ex);
    });
  };

  InputControl.prototype.hasError = function () {
    return this.getErrorControl() && this.getErrorControl().hasError();
  };

  InputControl.prototype.getErrorControl = function () {
    return this.$$error;
  };

  return InputControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsInputs", ["TextControl", "EmailControl", "DropdownControl", "DataListControl", "SearchControl", function (TextControl, EmailControl, DropdownControl, DataListControl, SearchControl) {

  return {
    TextBox: TextControl,
    EmailBox: EmailControl,
    Dropdown: DropdownControl,
    DataList: DataListControl,
    Search: SearchControl
  };
}]);
'use strict';

angular.module('huoyun.widget').provider("InputValidatorProvider", [function () {

  var validators = {};

  this.registerValidator = function (input, validator) {
    validators[input] = validator;
    return this;
  };

  this.getValidatorsByInputControl = function (input) {
    return validators[input];
  };

  this.$get = function () {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["InputValidatorProvider", "HuoYunWidgetsValidators", "HuoYunWidgetsInputs", function (InputValidatorProvider, HuoYunWidgetsValidators, HuoYunWidgetsInputs) {
  InputValidatorProvider.registerValidator(HuoYunWidgetsInputs.EmailBox, HuoYunWidgetsValidators.Email);
}]);
'use strict';

angular.module('huoyun.widget').factory("CheckBoxListViewItemControl", ["HuoYunWidgetCore", "ListViewItemControl", "CheckBoxControl", function (HuoYunWidgetCore, ListViewItemControl, CheckBoxControl) {

  function CheckBoxListViewItemControl() {
    ListViewItemControl.apply(this, arguments);

    var that = this;
    this.$$checkBox = new CheckBoxControl();
    this.$$checkBox.getText = function () {
      return that.getDisplayText();
    };
  }

  HuoYunWidgetCore.ClassExtend(CheckBoxListViewItemControl, ListViewItemControl);

  CheckBoxListViewItemControl.prototype.getCheckBox = function () {
    return this.$$checkBox;
  };

  return CheckBoxListViewItemControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsListView', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'listview/listview.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("ListViewControl", ["HuoYunWidgetCore", "SelectorControl", "ListViewItemControl", function (HuoYunWidgetCore, SelectorControl, ListViewItemControl) {

  function ListViewControl() {
    SelectorControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ListViewControl, SelectorControl);

  ListViewControl.prototype.getItemTemplate = function () {
    return this.$$itemTemplate || ListViewItemControl;
  };

  return ListViewControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("ListViewItemControl", ["HuoYunWidgetCore", "ItemControl", function (HuoYunWidgetCore, ItemControl) {

  function ListViewItemControl() {
    ItemControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ListViewItemControl, ItemControl);

  return ListViewItemControl;
}]);
'use strict';

/**
 * options:
 *  items:
 *    label
 *    visibility
 *    style
 */

angular.module('huoyun.widget').directive('widgetsNav', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'nav/nav.html',
    link: function link($scope, ele, attrs) {

      $scope.itemVisibility = function (item) {
        return widgetsHelper.visibility(item);
      };

      $scope.itemStyle = function (item) {
        return widgetsHelper.style(item);
      };

      $scope.onItemClicked = function (item) {
        if (typeof item.onClick === "function") {
          item.onClick.apply(item);
        } else {
          $log.warn("Nav item no click handler.", item);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("NavOption", ["NavItemOption", function (NavItemOption) {

  function NavOption(options) {
    this.items = [];
    if (Array.isArray(options.items)) {
      var that = this;
      options.items.forEach(function (item) {
        that.items.push(new NavItemOption(item));
      });
    }
  }

  NavOption.prototype.setSelected = function (name) {
    this.items.forEach(function (item) {
      if (item.name === name) {
        item.setSelected();
      } else {
        item.setUnSelected();
      }
    });
  };

  return NavOption;
}]);

angular.module('huoyun.widget').factory("NavItemOption", [function () {

  var props = ["name", "label", "onClick", "visibility", "style", "selected"];

  function NavItemOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  NavItemOption.prototype.setSelected = function () {
    this.selected = true;
  };

  NavItemOption.prototype.setUnSelected = function () {
    this.selected = false;
  };

  return NavItemOption;
}]);
'use strict';

angular.module('huoyun.widget').provider("SearchExpr", function () {

  var CompareOps = ["eq", "ne", "gt", "ge", "lt", "le"];

  function SearchExpr() {}

  SearchExpr.prototype.getStringExpr = function (prop) {
    return prop.value && prop.name + ' like \'' + prop.value + '\'';
  };

  SearchExpr.prototype.getNumberExpr = function (prop) {
    if (prop.value) {
      if (CompareOps.indexOf(prop.value.op) !== -1) {
        return prop.name + ' ' + prop.value.op + ' ' + prop.value.value;
      }

      if (prop.value.op === "between") {
        return prop.name + ' between (' + prop.value.left + ' , ' + prop.value.right + ')';
      }
    }
  };

  SearchExpr.prototype.getDataListExpr = function (prop) {
    if (Array.isArray(prop.value) && prop.value.length > 0) {
      var res = [];
      prop.value.forEach(function (item) {
        res.push(item[prop.datalist.valueField]);
      });

      return prop.name + ' in ( ' + res.join(", ") + ' )';
    }
  };

  SearchExpr.prototype.getExpr = function (prop) {
    if (typeof prop.type !== "string") {
      throw new Error('Unkonwn property type.', prop);
    }

    if (prop.type.toLocaleLowerCase() === "string") {
      return this.getStringExpr(prop);
    }

    if (prop.type.toLocaleLowerCase() === "integer") {
      return this.getNumberExpr(prop);
    }

    if (prop.type.toLocaleLowerCase() === "datalist") {
      return this.getDataListExpr(prop);
    }
  };

  var expr = new SearchExpr();

  this.config = function (options) {
    ["String"].forEach(function (type) {
      if (typeof options[type] === "function") {
        SearchExpr.prototype['get' + type + 'Expr'] = options[type];
      }
    });
  };

  this.$get = function () {
    return expr;
  };
});
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchForm', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/search.form.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SearchConditions", [function () {

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

angular.module('huoyun.widget').factory("SearchConditionValue", ["SearchConditions", function (SearchConditions) {

  var props = ["op", "value", "left", "right"];

  function SearchConditionValue(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  };

  SearchConditionValue.prototype.$$getValueExpr = function () {
    if (this.op === "between") {
      return '[ ' + this.left + ' , ' + this.right + ' ]';
    }

    for (var index = 0; index < SearchConditions.length; index++) {
      if (SearchConditions[index].name === this.op) {
        return SearchConditions[index].label + ' ' + this.value;
      }
    }
  };

  return SearchConditionValue;
}]);

angular.module('huoyun.widget').factory("SearchPropertyDataListOption", ["HuoyunPromise", function (HuoyunPromise) {

  var props = ["valueField", "labelField", "itemTemplateUrl", "searchVisibility", "loadVisibility"];

  function SearchPropertyDataListOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.getOptions = function () {
      return options;
    };
  };

  SearchPropertyDataListOption.prototype.$$getDataSource = function () {
    return HuoyunPromise.resolve(this.getOptions().getDataSource());
  };

  SearchPropertyDataListOption.prototype.$$search = function (val) {
    return HuoyunPromise.resolve(this.getOptions().search(val));
  };

  SearchPropertyDataListOption.prototype.$$loadMore = function (loadCount, searchText) {
    return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
  };

  SearchPropertyDataListOption.prototype.$$loadVisibility = function () {
    return this.loadVisibility === true;
  };

  SearchPropertyDataListOption.prototype.$$searchVisibility = function () {
    return this.searchVisibility === true;
  };

  SearchPropertyDataListOption.prototype.$$getValueExpr = function (values) {
    if (Array.isArray(values)) {
      var that = this;

      return values.linq().join(function (value) {
        return value[that.labelField];
      }, ", ");
    }
  };

  return SearchPropertyDataListOption;
}]);

angular.module('huoyun.widget').factory("SearchPropertyOption", ["SearchExpr", "SearchPropertyDataListOption", "SearchConditionValue", function (SearchExprProvider, SearchPropertyDataListOption, SearchConditionValue) {

  var props = ["name", "label", "type", "value", "getSearchExpr", "getValueExpr"];

  function SearchPropertyOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    if (that.type === "DataList") {
      if (!options.datalist) {
        throw new Error("Not found property datalist");
      }
      that.datalist = new SearchPropertyDataListOption(options.datalist);
    }
  }

  SearchPropertyOption.prototype.$$onChanged = function (val) {
    this.form.search();
  };

  SearchPropertyOption.prototype.setForm = function (form) {
    this.form = form;
  };

  SearchPropertyOption.prototype.setValue = function (val) {
    this.value = val;
  };

  SearchPropertyOption.prototype.clear = function () {
    this.value = null;
  };

  SearchPropertyOption.prototype.$$getValueExpr = function () {
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

  SearchPropertyOption.prototype.$$getSearchExpr = function () {
    if (typeof this.getSearchExpr === "function") {
      return this.getSearchExpr(this);
    }

    return SearchExprProvider.getExpr(this);
  };

  return SearchPropertyOption;
}]);

angular.module('huoyun.widget').factory("SearchFormOption", ["ButtonOption", "widgetsHelper", "SearchPropertyOption", function (ButtonOption, widgetsHelper, SearchPropertyOption) {

  var props = ["title", "icon"];
  var eventHandlers = ["onSearch"];

  function SearchFormOption(options) {
    var that = this;

    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    eventHandlers.forEach(function (eventHandler) {
      if (options[eventHandler] && typeof options[eventHandler] === "function") {
        that[eventHandler] = options[eventHandler];
      }
    });

    that.props = [];
    if (Array.isArray(options.props)) {
      options.props.forEach(function (prop) {
        var propOption = new SearchPropertyOption(prop);
        propOption.setForm(that);
        that.props.push(propOption);
      });
    }

    that.buttons = [];
    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (button) {
        that.buttons.push(new ButtonOption(button));
      });
    }
  }

  SearchFormOption.prototype.search = function () {
    if (this.onSearch) {
      var that = this;
      var expr = that.props.linq().join(function (prop) {
        return prop.$$getSearchExpr();
      }, " and ");
      this.onSearch(expr);
    }
  };

  SearchFormOption.prototype.clear = function () {
    var that = this;
    that.props.forEach(function (prop) {
      prop.clear();
    });
    this.onSearch && this.onSearch();
  };

  return SearchFormOption;
}]);
'use strict';

angular.module('huoyun.widget').factory("ItemControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function ItemControl() {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ItemControl, HuoYunWidgetCore.Control);

  ItemControl.prototype.setSelector = function (selector) {
    this.$$selector = selector;
    return this;
  };

  ItemControl.prototype.getSelector = function () {
    return this.$$selector;
  };

  ItemControl.prototype.setData = function (data) {
    this.$$data = data;
    return this;
  };

  ItemControl.prototype.getData = function () {
    return this.$$data;
  };

  ItemControl.prototype.isSelected = function () {
    return this.$$isSelected === true;
  };

  ItemControl.prototype.setSelected = function () {
    this.$$isSelected = true;
    return this;
  };

  ItemControl.prototype.setUnselected = function () {
    this.$$isSelected = false;
    return this;
  };

  ItemControl.prototype.toggleSelected = function () {
    this.$$isSelected = !this.$$isSelected;
    return this;
  };

  ItemControl.prototype.getValue = function () {
    return this.__getValueByPathFunc("getValuePath");
  };

  ItemControl.prototype.getDisplayText = function () {
    return this.__getValueByPathFunc("getDisplayPath");
  };

  ItemControl.prototype.__getValueByPathFunc = function (pathFuncName) {
    var data = this.getData();

    if (data === null || data === undefined) {
      return data;
    }

    var selector = this.getSelector();
    if (!selector) {
      return data;
    }

    var displayPath = selector[pathFuncName]();
    if (displayPath) {
      return this.__getValueByPath(data, displayPath);
    }

    return data;
  };

  ItemControl.prototype.__getValueByPath = function (data, path) {
    if (typeof path === "string") {
      var paths = path.split(".");
      if (paths.length === 0) {
        return undefined;
      }

      var obj = data[paths[0]];
      if (obj === undefined || obj === null || paths.length === 1) {
        return obj;
      }

      return this.getValueByPath(obj, paths.slice(1).join("."));
    }

    throw new Error("path must be string");
  };

  return ItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("Selection", [function () {

  var Modes = {
    None: "none",
    Single: "single",
    Multiple: "multiple"
  };

  function Selection(val) {
    this.$$value = Modes.Single;
    if (typeof val === "string") {
      if (val.toLowerCase() === Modes.Multiple) {
        this.$$value = Modes.Multiple;
      }
    }
  }

  Selection.prototype.getValue = function () {
    return this.$$value.toLowerCase();
  };

  Selection.prototype.isSingle = function () {
    return this.getValue() === Modes.Single;
  };

  Selection.prototype.isMultiple = function () {
    return this.getValue() === Modes.Multiple;
  };

  Selection.Modes = Modes;

  return Selection;
}]);
'use strict';

angular.module('huoyun.widget').factory("SelectorControl", ["$q", "HuoYunWidgetCore", "ItemControl", "Selection", function ($q, HuoYunWidgetCore, ItemControl, Selection) {

  function SelectorControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(SelectorControl, HuoYunWidgetCore.Control);

  SelectorControl.prototype.getSelection = function () {
    if (!this.$$selection) {
      this.$$selection = new Selection(this.getOptions().selection);
    }
    return this.$$selection;
  };

  SelectorControl.prototype.setSelection = function (selection) {
    if (selection instanceof Selection) {
      this.$$selection = selection;
      return this;
    }

    throw new Error("selection must be Selection type.");
  };

  SelectorControl.prototype.setSelectionMode = function (selection) {
    return this.setSelection(new Selection(selection));
  };

  SelectorControl.prototype.getDataSource = function () {
    if (!this.$$dataSource) {
      var dataSource = this.getOptions().dataSource;
      if (Array.isArray(dataSource)) {
        this.$$dataSource = $q.resolve(dataSource);
      }

      if (typeof dataSource === "function") {
        this.$$dataSource = dataSource.apply(this);
      }
    }

    if (this.$$dataSource instanceof $q) {
      return this.$$dataSource;
    }

    return $q.resolve(this.$$dataSource);
  };

  SelectorControl.prototype.setDataSource = function (dataSource) {
    var oldDataSource = this.getDataSource();
    this.getOptions().dataSource = dataSource;
    this.$$dataSource = null;
    var newDataSource = this.getDataSource();
    this.raiseEvent("dataSourceChanged", [newDataSource, oldDataSource]);
    return this;
  };

  SelectorControl.prototype.getItems = function () {
    if (!this.$$items) {
      this.$$items = [];
      var that = this;
      this.getDataSource().then(function (data) {
        if (Array.isArray(data)) {
          data.forEach(function (itemData) {
            var ItemTemplate = that.getItemTemplate() || ItemControl;
            var itemControl = new ItemTemplate().setData(itemData).setSelector(that);
            that.$$items.push(itemControl);
          });
        }
      });
    }

    return this.$$items;
  };

  SelectorControl.prototype.setItemTemplate = function (itemTemplate) {
    this.$$itemTemplate = itemTemplate;
    return this;
  };

  SelectorControl.prototype.getItemTemplate = function () {
    return this.$$itemTemplate || ItemControl;
  };

  SelectorControl.prototype.setItemTemplateUrl = function (itemTemplateUrl) {
    this.$$itemTemplateUrl = itemTemplateUrl;
    return this;
  };

  SelectorControl.prototype.getItemTemplateUrl = function () {
    return this.$$itemTemplateUrl;
  };

  SelectorControl.prototype.hasItemTemplateUrl = function () {
    return !!this.getItemTemplateUrl();
  };

  SelectorControl.prototype.getValuePath = function () {
    return this.getOptions().valuePath;
  };

  SelectorControl.prototype.setValuePath = function (valuePath) {
    this.getOptions().valuePath = valuePath;
    return this;
  };

  SelectorControl.prototype.getDisplayPath = function () {
    return this.getOptions().displayPath;
  };

  SelectorControl.prototype.setDisplayPath = function (displayPath) {
    this.getOptions().displayPath = displayPath;
    return this;
  };

  SelectorControl.prototype.onItemClicked = function (item) {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Single) {
      var oldSelectedItem = this.getSelectionItem();
      if (item !== oldSelectedItem) {
        oldSelectedItem && oldSelectedItem.setUnselected();
        item.setSelected();
        this.raiseEvent("selectedChanged", [item, oldSelectedItem]);
      }

      return;
    }

    if (selection === Selection.Modes.Multiple) {
      var oldSelectedItems = this.getSelectedItems();
      item.toggleSelected();
      var newSelectedItems = this.getSelectedItems();
      this.raiseEvent("selectedChanged", [newSelectedItems, oldSelectedItems]);
    }
  };

  SelectorControl.prototype.getSelectionItem = function () {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Single) {
      var items = this.getItems();
      for (var index = 0; index < items.length; index++) {
        if (items[index].isSelected()) {
          return items[index];
        }
      }
    }
  };

  SelectorControl.prototype.getSelectedValue = function () {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Single) {
      var selectedItem = this.getSelectionItem();
      return selectedItem && selectedItem.getValue();
    }

    if (selection === Selection.Modes.Multiple) {
      var selectedItems = this.getSelectedItems();
      return selectedItems.map(function (selectedItem) {
        return selectedItem.getValue();
      });
    }
  };

  SelectorControl.prototype.getSelectedItems = function () {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Multiple) {
      return this.getItems().filter(function (item) {
        return item.isSelected();
      });
    }
  };

  return SelectorControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSideBarPanel', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'sidebar-panel/sidebar.panel.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SidebarPanelOption", ["SidebarMenuOption", function (SidebarMenuOption) {

  function SidebarPanelOption(options) {

    this.menus = [];

    if (Array.isArray(options.menus)) {
      var that = this;
      options.menus.forEach(function (menu) {
        var menuOption = new SidebarMenuOption(menu);
        that.menus.push(menuOption);
      });
    }

    this.getOptions = function () {
      return options;
    };
  }

  SidebarPanelOption.prototype.getMenus = function () {
    return this.menus;
  };

  return SidebarPanelOption;
}]);

angular.module('huoyun.widget').factory("SidebarMenuOption", ["SidebarMenuItemOption", "widgetsHelper", function (SidebarMenuItemOption, widgetsHelper) {

  function SidebarMenuOption(options) {

    this.items = [];
    if (Array.isArray(options.items)) {
      var that = this;
      options.items.forEach(function (item) {
        var menuItem = new SidebarMenuItemOption(item);
        menuItem.setMenu(that);
        that.items.push(menuItem);
      });
    }

    this.getOptions = function () {
      return options;
    };
  }

  SidebarMenuOption.prototype.getItems = function () {
    return this.items;
  };

  SidebarMenuOption.prototype.isVisibility = function () {
    return widgetsHelper.visibility(this.getOptions());
  };

  SidebarMenuOption.prototype.getLabel = function () {
    return this.getOptions().label;
  };

  SidebarMenuOption.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  SidebarMenuOption.prototype.onClick = function () {
    if (this.getItems().length > 0) {
      if (this.isExpand()) {
        this.collapse();
      } else {
        this.expand();
      }

      return;
    }

    var options = this.getOptions();
    if (typeof options.onClick === "function") {
      options.onClick(this);
    }
  };

  SidebarMenuOption.prototype.isExpand = function () {
    return this.$$activeClass === "active";
  };

  SidebarMenuOption.prototype.expand = function () {
    this.$$activeClass = "active";
  };

  SidebarMenuOption.prototype.collapse = function () {
    this.$$activeClass = "";
  };

  SidebarMenuOption.prototype.getAppendClass = function () {
    return this.$$activeClass + this.getOptions().appendClass;
  };

  return SidebarMenuOption;
}]);

angular.module('huoyun.widget').factory("SidebarMenuItemOption", ["widgetsHelper", function (widgetsHelper) {

  function SidebarMenuItemOption(options) {
    this.getOptions = function () {
      return options;
    };
  }

  SidebarMenuItemOption.prototype.setMenu = function (menu) {
    this.menu = menu;
  };

  SidebarMenuItemOption.prototype.isVisibility = function () {
    return widgetsHelper.visibility(this.getOptions());
  };

  SidebarMenuItemOption.prototype.onClick = function () {
    var options = this.getOptions();
    if (typeof options.onClick === "function") {
      options.onClick(this);
    }
  };

  SidebarMenuItemOption.prototype.getLabel = function () {
    return this.getOptions().label;
  };

  SidebarMenuItemOption.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  return SidebarMenuItemOption;
}]);
'use strict';

/**
 * options:
 *  items:
 *    label
 *    icon
 *    visibility
 *    style
 */

angular.module('huoyun.widget').directive('widgetsSideBar', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'sidebar/sidebar.html',
    link: function link($scope, ele, attrs) {

      $scope.groupVisibility = function (group) {
        return widgetsHelper.visibility(group);
      };

      $scope.itemVisibility = function (item) {
        return widgetsHelper.visibility(item);
      };

      $scope.itemStyle = function (item) {
        return widgetsHelper.style(item);
      };

      $scope.onGroupItemClicked = function (group, groupItem) {
        if (typeof groupItem.onClick === "function") {
          groupItem.onClick.apply(null, [group, groupItem]);
        } else {
          $log.warn("Side bar no click handler.", group, groupItem);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SidebarOption", ["SidebarGroupOption", function (SidebarGroupOption) {

  function SidebarOption(options) {
    this.groups = [];
    if (Array.isArray(options.groups)) {
      var that = this;
      options.groups.forEach(function (group) {
        that.groups.push(new SidebarGroupOption(group));
      });
    }
  }

  SidebarOption.prototype.setGroupItemSelected = function (groupName, groupItemName) {
    var that = this;
    this.groups.forEach(function (group) {
      if (group.name === groupName) {
        group.setGroupItemSelected(groupItemName);
      } else {
        group.unselectedAll();
      }
    });
  };

  return SidebarOption;
}]);

angular.module('huoyun.widget').factory("SidebarGroupOption", ["SidebarGroupItemOption", function (SidebarGroupItemOption) {

  var props = ["name", "label", "icon"];

  function SidebarGroupOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });

    this.items = [];
    if (Array.isArray(options.items)) {
      options.items.forEach(function (item) {
        that.items.push(new SidebarGroupItemOption(item));
      });
    }
  }

  SidebarGroupOption.prototype.unselectedAll = function () {
    this.items.forEach(function (groupItem) {
      groupItem.setUnselected();
    });
  };

  SidebarGroupOption.prototype.setGroupItemSelected = function (groupItemName) {
    this.items.forEach(function ($groupItem) {
      if ($groupItem.name === groupItemName) {
        $groupItem.setSelected();
      } else {
        $groupItem.setUnselected();
      }
    });
  };

  return SidebarGroupOption;
}]);

angular.module('huoyun.widget').factory("SidebarGroupItemOption", [function () {

  var props = ["name", "label", "onClick", "selected"];

  function SidebarGroupItemOption(options) {
    var that = this;
    props.forEach(function (prop) {
      that[prop] = options[prop];
    });
  }

  SidebarGroupItemOption.prototype.setSelected = function () {
    this.selected = true;
  };

  SidebarGroupItemOption.prototype.setUnselected = function () {
    this.selected = false;
  };

  return SidebarGroupItemOption;
}]);
'use strict';

angular.module('huoyun.widget').factory('Tip', ['$templateCache', '$compile', '$rootScope', '$timeout', function ($templateCache, $compile, $rootScope, $timeout) {

  return {
    show: function show(message) {
      var id = "tip-" + new Date().getTime();
      var $scope = $rootScope.$new();
      var template = $templateCache.get('tip/tip.html');
      $scope.message = message;
      var $tip = $compile(template)($scope);
      $tip.attr("id", id);
      $('body').append($tip);
      $tip.show();
      var timer = setTimeout(function () {
        $tip.fadeOut(300, function () {
          $tip.remove();
        });
        clearTimeout(timer);
      }, 1000);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsPagination', function () {
  return {
    restrict: 'A',
    scope: {
      pageData: "=",
      onPagingChanged: "&"
    },
    templateUrl: 'table/pagination.html',
    link: function link($scope, ele, attrs) {
      var MAXNumberCount = 5;
      $scope.numbers = [];

      $scope.$watch("pageData", function (newValue, oldValue) {
        if (newValue) {
          refresh(newValue);
        } else {
          $scope.numbers = [];
        }
      });

      $scope.onPagingClicked = function (pageIndex) {
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };

      function refresh(pageData) {
        $scope.numbers = [];
        var startIndex = parseInt(pageData.number / MAXNumberCount) * MAXNumberCount;
        var endIndex = startIndex + MAXNumberCount;
        if (endIndex > pageData.totalPages) {
          endIndex = pageData.totalPages;
        }
        for (var index = startIndex; index < endIndex; index++) {
          $scope.numbers.push(index);
        }
      }
    }
  };
});
'use strict';

angular.module('huoyun.widget').factory("TableControl", ["HuoYunWidgetCore", "SelectorControl", "TableHeaderControl", "TableRowControl", function (HuoYunWidgetCore, SelectorControl, TableHeaderControl, TableRowControl) {

  function TableControl(options) {
    SelectorControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TableControl, SelectorControl);

  TableControl.prototype.getHeader = function () {
    if (!this.$$header) {
      this.$$header = new TableHeaderControl(this.getOptions().header);
    }

    return this.$$header;
  };

  TableControl.prototype.getItemTemplate = function () {
    return this.$$itemTemplate || TableRowControl;
  };

  return TableControl;
}]);

angular.module('huoyun.widget').factory("TableHeaderControl", ["HuoYunWidgetCore", "TableColumnControl", function (HuoYunWidgetCore, TableColumnControl) {

  function TableHeaderControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$columns = [];

    var that = this;
    (options.columns || []).forEach(function (column) {
      that.$$columns.push(new TableColumnControl(column));
    });
  }

  HuoYunWidgetCore.ClassExtend(TableHeaderControl, HuoYunWidgetCore.Control);

  TableHeaderControl.prototype.getColumns = function () {
    return this.$$columns;
  };

  return TableHeaderControl;
}]);

angular.module('huoyun.widget').factory("TableRowControl", ["HuoYunWidgetCore", "ItemControl", function (HuoYunWidgetCore, ItemControl) {

  function TableRowControl(options) {
    ItemControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TableRowControl, ItemControl);

  TableRowControl.prototype.getColumnValue = function (columnName) {
    return this.getData()[columnName];
  };

  return TableRowControl;
}]);

angular.module('huoyun.widget').factory("TableColumnControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function TableColumnControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TableColumnControl, HuoYunWidgetCore.Control);

  TableColumnControl.prototype.getHeaderText = function () {
    return this.getOptions().text;
  };

  TableColumnControl.prototype.getColumnValue = function (row) {
    return row.getColumnValue(this.getName());
  };

  TableColumnControl.prototype.setColumnTemplate = function (template) {
    this.$$columnTemplate = template;
  };

  return TableColumnControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTable', ["display", function (displayProvider) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'table/table.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("EmailValidator", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  var PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  function EmailValidator(options) {
    HuoYunWidgetCore.Validator.apply(this, arguments);
    this.$$errors = {};

    this.addErrorType("invalidFormat", "邮箱地址格式不正确");
  }

  HuoYunWidgetCore.ClassExtend(EmailValidator, HuoYunWidgetCore.Validator);

  EmailValidator.prototype.onValid = function () {
    if (PATTERN.test(this.getOptions())) {
      return this.__success();
    }

    return this.__failed("invalidFormat");
  };

  return EmailValidator;
}]);
'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsValidators", ["EmailValidator", function (EmailValidator) {

  return {
    Email: EmailValidator
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Validator", ["$q", function ($q) {

  function Validator(options) {
    this.$$errors = {};

    this.getOptions = function () {
      return options;
    };
  }

  Validator.prototype.onValid = function () {
    return this.__success();
  };

  Validator.prototype.addErrorType = function (errorName, errorMessage) {
    this.$$errors[errorName] = errorMessage;
    return this;
  };

  Validator.prototype.getErrorMessage = function (errorName) {
    return this.$$errors[errorName];
  };

  Validator.prototype.__failed = function (errorType) {
    return $q.reject({
      validator: this,
      errorType: errorType
    });
  };

  Validator.prototype.__success = function () {
    return $q.resolve({
      validator: this
    });
  };

  return Validator;
}]);
'use strict';

angular.module('huoyun.widget').factory("FormGroupControl", ["$log", "HuoYunWidgetCore", "FormGroupLabelControl", "FormGroupInputControl", function ($log, HuoYunWidgetCore, FormGroupLabelControl, FormGroupInputControl) {

  function FormGroupControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$label = new FormGroupLabelControl(options.label || {}).setFromGroup(this);

    var that = this;
    this.$$input = new FormGroupInputControl(options.input || {}).setFromGroup(this).on("valueChanged", function (newVal, oldVal) {
      that.raiseEvent("valueChanged", [newVal, oldVal]);
    });
  }

  HuoYunWidgetCore.ClassExtend(FormGroupControl, HuoYunWidgetCore.Control);

  FormGroupControl.prototype.hasLabelControl = function () {
    return this.getLabelControl().isVisibility();
  };

  FormGroupControl.prototype.getLabelControl = function () {
    return this.$$label;
  };

  FormGroupControl.prototype.hasInputControl = function () {
    return this.getInputControl().isVisibility();
  };

  FormGroupControl.prototype.getInputControl = function () {
    return this.$$input;
  };

  FormGroupControl.prototype.setFormControl = function (form) {
    this.$$form = form;
    return this;
  };

  FormGroupControl.prototype.getFormControl = function () {
    return this.$$form;
  };

  FormGroupControl.prototype.getType = function () {
    var type = this.getOptions().type;
    return type && type.toUpperCase();
  };

  FormGroupControl.prototype.isMandatory = function () {
    return this.getOptions().mandatory;
  };

  FormGroupControl.prototype.getValue = function () {
    return this.getFormControl().getPropertyValue(this.getName());
  };

  FormGroupControl.prototype.setValueChangedCallback = function (callback) {
    var inputControl = this.getInputControl();
    inputControl && inputControl.setValueChangedCallback(callback);
    return this;
  };

  FormGroupControl.prototype.getValueChangedCallback = function () {
    var inputControl = this.getInputControl();
    return inputControl && inputControl.getValueChangedCallback();
  };

  return FormGroupControl;
}]);

angular.module('huoyun.widget').factory("FormGroupLabelControl", ["$log", "HuoYunWidgetCore", function ($log, HuoYunWidgetCore) {

  function FormGroupLabelControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(FormGroupLabelControl, HuoYunWidgetCore.Control);

  FormGroupLabelControl.prototype.setFromGroup = function (formGroup) {
    this.$$formGroup = formGroup;
    return this;
  };

  FormGroupLabelControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  return FormGroupLabelControl;
}]);

angular.module('huoyun.widget').factory("FormGroupInputControl", ["$log", "HuoYunWidgetCore", "TextControl", "FormControlProvider", function ($log, HuoYunWidgetCore, TextControl, FormControlProvider) {

  function FormGroupInputControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(FormGroupInputControl, HuoYunWidgetCore.Control);

  FormGroupInputControl.prototype.setFromGroup = function (formGroup) {
    this.$$formGroup = formGroup;
    return this;
  };

  FormGroupInputControl.prototype.getFormGroup = function () {
    return this.$$formGroup;
  };

  FormGroupInputControl.prototype.getInput = function () {
    if (!this.$$inputOptions) {
      var inputOptions = this.getOptions();
      inputOptions.appendClass = "form-control " + (inputOptions.appendClass || "");

      var control = FormControlProvider.getControlbyType(this.getFormGroup().getType());
      if (!control) {
        control = TextControl;
      }

      var that = this;

      this.$$inputOptions = new control(inputOptions).on("valueChanged", function (newVal, oldVal) {
        that.raiseEvent("valueChanged", [newVal, oldVal]);
      });
    }

    return this.$$inputOptions;
  };

  return FormGroupInputControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroup', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgroup/form-group.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupDataList', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'form/formgroup/formgroup.datalist.html',
    link: function link($scope, ele, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u9009\u62E9' + $scope.options.label,
          templateUrl: "form/formgroup/formgroup.datalist.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, data) {
            if (key === "OK") {
              $scope.options.setValue(data);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupDropDown', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgroup/formgroup.dropdown.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupEmail', ["$log", "display", "widgetsHelper", function ($log, displayProvider, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgroup/formgroup.email.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupString', ["$log", "display", "widgetsHelper", function ($log, displayProvider, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgroup/formgroup.string.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupLabelEmail', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'form/formgrouplabel/formgrouplabel.email.html',
    link: function link($scope, ele, attrs) {

      $scope.getEmailLink = function (value) {
        return value && 'mailto:' + value;
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupLabelString', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'form/formgrouplabel/formgrouplabel.string.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

// angular.module('huoyun.widget').factory("EmailValidator", function() {

//   const PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//   function EmailValidator(formGroupOption) {
//     this.formGroupOption = formGroupOption;
//   }

//   EmailValidator.prototype.onValid = function(value) {
//     if (PATTERN.test(value)) {
//       return Promise.resolve();
//     }

//     this.formGroupOption.errorMessage = `邮箱地址格式不正确`
//     return Promise.reject(this.formGroupOption);
//   }

//   return EmailValidator;
// });
'use strict';

angular.module('huoyun.widget').factory("MandatoryValidator", function () {

  function MandatoryValidator(formGroupOption) {
    this.formGroupOption = formGroupOption;
  }

  MandatoryValidator.prototype.onValid = function (value) {
    if (value === null || value === undefined) {
      this.formGroupOption.errorMessage = '\u5B57\u6BB5' + this.formGroupOption.label + '\u4E0D\u80FD\u4E3A\u7A7A';
      return Promise.reject(this.formGroupOption);
    }

    if (typeof value === "string") {
      if (value.trim() === "") {
        this.formGroupOption.errorMessage = '\u5B57\u6BB5' + this.formGroupOption.label + '\u4E0D\u80FD\u4E3A\u7A7A';
        return Promise.reject(this.formGroupOption);
      }
    }

    return Promise.resolve();
  };

  return MandatoryValidator;
});
'use strict';

angular.module('huoyun.widget').factory("DataListControl", ["HuoYunWidgetCore", "InputControl", "HuoyunPromise", function (HuoYunWidgetCore, InputControl, HuoyunPromise) {

  function DataListControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(DataListControl, InputControl);

  DataListControl.prototype.getInputText = function () {
    return this.$$inputText;
  };

  DataListControl.prototype.setInputText = function (text) {
    this.$$inputText = text;
    return this;
  };

  DataListControl.prototype.isReadonly = function () {
    return true;
  };

  return DataListControl;
}]);
'use strict';

angular.module('huoyun.widget').controller('DataListController', ["$scope", "CheckBoxControl", "ListViewControl", "HuoYunWidgetCore", "CheckBoxListViewItemControl", "SearchControl", function ($scope, CheckBoxControl, ListViewControl, HuoYunWidgetCore, CheckBoxListViewItemControl, SearchControl) {

  $scope.vm = {
    search: null,
    pageCount: 0,
    getDataListControl: function getDataListControl() {
      return $scope.ngDialogData.params.options;
    },
    getDataListOptions: function getDataListOptions() {
      return $scope.vm.getDataListControl().getOptions();
    },
    listView: null,
    loadPageDataSource: function loadPageDataSource() {
      var dataSource = $scope.vm.getDataListOptions().loadMore($scope.vm.pageCount, $scope.vm.search.getValue());
      return HuoYunWidgetCore.Promise.resolve(dataSource).then(function (result) {
        $scope.vm.pageCount = $scope.vm.pageCount + 1;
        return HuoYunWidgetCore.Promise.resolve(result);
      });
    }
  };

  $scope.vm.search = new SearchControl({
    placeholder: "Search ..."
  }).on("valueChanged", function () {
    console.log(arguments);
  });

  var options = $scope.vm.getDataListOptions();
  $scope.vm.listView = new ListViewControl().setValuePath(options.valueField).setDisplayPath(options.labelField).setSelectionMode(options.selection).setDataSource($scope.vm.loadPageDataSource).setItemTemplate(CheckBoxListViewItemControl).setItemTemplateUrl("listview/checkbox.listviewitem.html").on("dataSourceChanged", function () {
    console.log(arguments);
  });

  $scope.ngDialogData.onConfirmButtonClicked = function () {
    var value = $scope.vm.listView.getSelectedValue();
    var text = $scope.vm.listView.getSelectedItems().map(function (listviewItem) {
      return listviewItem.getDisplayText();
    }).join(", ");
    $scope.closeThisDialog(['OK', value, text]);
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDataList', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/datalist/datalist.html',
    link: function link($scope, ele, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u9009\u62E9' + $scope.options.label,
          templateUrl: "input/datalist/datalist.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, value, text) {
            if (key === "OK") {
              $scope.options.setValue(value).setInputText(text);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').run(['$templateCache', function ($templateCache) {
  $templateCache.put('breadcrumb/breadcrumb.html', '<div class="widgets-breadcrumb"><ol class="breadcrumb"><li ng-repeat="item in options.items" ng-click="onItemClicked(item,$index)" ng-style="itemStyle(item)"><i class="fa" ng-class="item.icon" aria-hidden="true"></i> <span ng-bind="item.label"></span></li></ol></div>');
  $templateCache.put('button/button.html', '<button class="btn" name="{{options.getButtonName()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-click="options.onClick()"><i class="fa" aria-hidden="true" ng-class="options.getButtonIcon()" ng-if="options.isButtonIconVisibility()"></i> <span ng-bind="options.getButtonText()"></span></button>');
  $templateCache.put('checkbox/checkbox.html', '<div class="widgets-checkbox" ng-click="options.onClick($event)"><i class="fa fa-check-square-o" aria-hidden="true" ng-class="options.getIconClass()"></i> <span class="widgets-checkbox-content" ng-bind="options.getText()"></span></div>');
  $templateCache.put('dialog/dialog.html', '<div class="box box-primary huoyun-dialog-content-container animated bounceInDown"><div class="box-header with-border"><h3 class="box-title"><i class="fa fa-info" aria-hidden="true"></i> <span ng-bind="ngDialogData.title"></span></h3></div><div class="box-body"><div ng-if="!ngDialogData.templateUrl" ng-bind="ngDialogData.content"></div><div ng-if="ngDialogData.templateUrl" ng-include="ngDialogData.templateUrl"></div></div><div class="box-footer"><button type="submit" ng-if="ngDialogData.cancelButtonVisibility" class="btn btn-default pull-right" ng-click="onCancelButtonClicked()" ng-bind="ngDialogData.cancelButtonText"></button> <button type="submit" ng-if="ngDialogData.confirmButtonVisibility" class="btn btn-primary pull-right" ng-click="onConfirmButtonClicked()" ng-bind="ngDialogData.confirmButtonText"></button></div></div>');
  $templateCache.put('form/form.html', '<div class="box widgets-form" form-readonly="{{options.isReadonly()}}"><div class="box-header" ng-if="options.getHeader().isVisibility()"><h3 class="box-title" ng-bind="options.getHeader().getTitle()"></h3><div class="box-tools pull-right"><div class="input-group input-group-sm"><div widgets-button="" options="button" ng-repeat="button in options.getHeader().getButtons()"></div></div></div></div><form ng-class="options.appendOrientationClass()"><div class="box-body" ng-if="!options.isReadonly()"><div ng-repeat="$formGroup in options.getGroups()" prop-name="{{$formGroup.getName()}}" prop-type="{{$formGroup.getType()}}" ng-if="$formGroup.isVisibility()"><div ng-if="$formGroup.isCustomizeTemplate()"><div ng-include="$formGroup.getTemplateUrl()"></div></div><div ng-if="!$formGroup.isCustomizeTemplate()"><div widgets-form-group="" options="$formGroup" ng-model="options.$$data[$formGroup.getName()]"></div></div></div></div><div class="box-footer" ng-if="options.isFooterVisibility()"><div widgets-button="" options="button" ng-repeat="button in options.getFooter().getButtons()"></div></div></form></div>');
  $templateCache.put('head/head.html', '<div class="row widgets-head"><div class="col-md-8 widgets-head-title-container"><div ng-bind="options.title" ng-style="titleStyle(options.titleStyle)" ng-click="onTitleClick()"></div></div><div class="col-md-4 widgets-head-tools"><div ng-if="options.rightTemplateUrl" ng-include="options.rightTemplateUrl"></div></div></div>');
  $templateCache.put('listview/checkbox.listviewitem.html', '<div class="checkbox-list-view-item"><div widgets-check-box="" options="$item.getCheckBox()"></div></div>');
  $templateCache.put('listview/listview.html', '<div class="widgets-list-view"><div class="list-view-item" data-selected="{{$item.isSelected()}}" ng-repeat="$item in options.getItems()" ng-click="options.onItemClicked($item)"><div ng-if="!options.hasItemTemplateUrl()" ng-bind="$item.getDisplayText()"></div><div ng-if="options.hasItemTemplateUrl()" ng-include="options.getItemTemplateUrl()"></div></div></div>');
  $templateCache.put('nav/nav.html', '<div class="row widgets-nav"><nav><ul><li ng-repeat="item in options.items" ng-bind="item.label" ng-show="itemVisibility(item)" ng-style="itemStyle(item)" ng-click="onItemClicked(item)" ng-class="{true: \'selected\', false: \'\'}[item.selected]"></li></ul></nav></div>');
  $templateCache.put('search/search.form.html', '<div class="box bo-search-area"><div class="box-header with-border"><h3 class="box-title"><i class="fa" aria-hidden="true" ng-class="options.icon" ng-if="options.icon"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><div widgets-button="" options="button" ng-repeat="button in options.buttons"></div></div></div></div><form class="form-horizontal" role="form"><div class="box-body"><div class="form-group col-md-4 bo-property-form-group" ng-repeat="prop in options.props" ng-switch="prop.type"><label for="{{prop.name}}" class="col-sm-3 control-label" ng-bind="prop.label"></label><div class="col-sm-9"><div ng-switch-when="Integer" widgets-search-form-number="" options="prop"></div><div ng-switch-when="DataList" widgets-search-form-data-list="" options="prop"></div><div ng-switch-default="" widgets-search-form-string="" options="prop"></div></div></div></div></form></div>');
  $templateCache.put('sidebar-panel/sidebar.panel.html', '<div class="widgets-side-bar-panel"><aside class="main-sidebar"><section class="sidebar"><ul class="sidebar-menu"><li class="treeview" ng-repeat="menu in options.getMenus()" ng-if="menu.isVisibility()" ng-class="menu.getAppendClass()"><a ng-click="menu.onClick()"><i class="fa" ng-class="menu.getIcon()"></i> <span ng-bind="menu.getLabel()"></span> <span class="pull-right-container" ng-if="options.getMenus().length !== 0"><i class="fa fa-angle-left pull-right"></i></span><div class="tri-angle" ng-if="options.getMenus().length !== 0"></div></a><ul class="treeview-menu"><li ng-repeat="menuitem in menu.getItems()" ng-if="menuitem.isVisibility()"><a ng-click="menuitem.onClick()"><i class="fa" ng-class="menuitem.getIcon()"></i> <span ng-bind="menuitem.getLabel()"></span></a></li></ul></li></ul></section></aside></div>');
  $templateCache.put('sidebar/sidebar.html', '<div class="widgets-side-bar"><aside><div ng-repeat="group in options.groups" ng-if="groupVisibility(group)"><div class="side-bar-group-header"><i class="fa" ng-class="group.icon" aria-hidden="true"></i> <span ng-bind="group.label"></span></div><ul class="side-bar-group-items-container"><li ng-repeat="groupItem in group.items" ng-bind="groupItem.label" ng-class="{true: \'selected\', false: \'\'}[groupItem.selected]" ng-click="onGroupItemClicked(group,groupItem)"></li></ul></div></aside></div>');
  $templateCache.put('tip/tip.html', '<div class="alert alert-success alert-dismissible widget-tip"><span ng-bind="message"></span></div>');
  $templateCache.put('table/pagination.html', '<ul class="pagination pagination-sm no-margin pull-right widgets-pagination"><li ng-disabled="pageData.first"><span ng-click="onPagingClicked(pageData.number - 1)">\xAB</span></li><li ng-repeat="number in numbers" ng-class="{true: \'active\', false: \'\'}[number === pageData.number]"><span ng-bind="number + 1" ng-click="onPagingClicked(number)"></span></li><li ng-disabled="pageData.last"><span ng-click="onPagingClicked(pageData.number + 1)">\xBB</span></li></ul>');
  $templateCache.put('table/table.html', '<div class="widgets-table"><table class="table" ng-class="options.appendClass()"><thead ng-if="options.getHeader().isVisibility()" ng-style="options.getHeader().getStyle()"><tr><th ng-repeat="$column in options.getHeader().getColumns()" column-name="{{$column.getName()}}" ng-style="$column.getStyle()" ng-bind="$column.getHeaderText()"></th></tr></thead><tbody><tr ng-repeat="$row in options.getItems()" data-selected="{{$row.isSelected()}}" ng-click="options.onItemClicked($row)"><td ng-repeat="$column in options.getHeader().getColumns()"><div ng-bind="$column.getColumnValue($row)"></div></td></tr></tbody></table></div>');
  $templateCache.put('form/formgroup/form-group.html', '<div class="form-group widgets-form-group" mandatory="{{options.isMandatory()}}" ng-class="options.appendClass()" has-error="{{options.hasError}}"><div ng-if="options.hasLabelControl()"><div ng-if="options.getLabelControl().isCustomizeTemplate()"><div ng-include="options.getLabelControl().getTemplateUrl()"></div></div><div ng-if="!options.getLabelControl().isCustomizeTemplate()"><label for="{{options.getName()}}" class="control-label" ng-bind="options.getLabelControl().getText()" ng-class="options.getLabelControl().appendClass()"></label></div></div><div ng-if="options.hasInputControl()"><div ng-if="options.getInputControl().isCustomizeTemplate()"><div ng-include="options.getInputControl().getTemplateUrl()"></div></div><div ng-if="!options.getInputControl().isCustomizeTemplate()" ng-switch="options.getType()"><div ng-switch-when="DATALIST" widgets-data-list="" options="options.getInputControl().getInput()"></div><div ng-switch-when="DROPDOWN" widgets-dropdown="" options="options.getInputControl().getInput()"></div><div ng-switch-when="EMAIL" widgets-email-box="" options="options.getInputControl().getInput()"></div><div ng-switch-default="" widgets-text-box="" options="options.getInputControl().getInput()"></div></div></div></div>');
  $templateCache.put('form/formgroup/formgroup.datalist.html', '<div class="form-group widgets-form-group-data-list" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="input-group" ng-click="onButtonClicked()"><span class="input-group-addon"><i class="fa fa-link"></i></span> <input type="text" class="form-control" id="{{options.name}}" readonly="" placeholder="{{options.placeholder}}" ng-value="options.$$getValueLabel()" ng-disabled="options.$$disabled()"></div><span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgroup/formgroup.dropdown.html', '<div class="form-group widgets-form-group-dropdown" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><select class="form-control" id="{{options.name}}" placeholder="{{options.placeholder}}" ng-options="options.getControl().getValue(option) as options.getControl().getLabel(option) for option in options.getControl().getDataSource()" ng-model="$parent.value" ng-disabled="options.$$disabled()"></select><span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgroup/formgroup.email.html', '<div class="form-group widgets-form-group-email" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="input-group"><span class="input-group-addon"><i class="fa fa-envelope"></i></span> <input type="email" class="form-control" id="{{options.name}}" placeholder="{{options.placeholder}}" ng-model="$parent.value" ng-disabled="options.$$disabled()"></div><span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgroup/formgroup.string.html', '<div class="form-group widgets-form-group-string" mandatory="{{options.mandatory}}" ng-class="options.appendClass" has-error="{{options.hasError}}"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div ng-if="!options.$$readonly()" ng-class="options.$$appendControlClass()"><input type="text" class="form-control" id="{{options.name}}" placeholder="{{options.placeholder}}" ng-model="$parent.value" ng-disabled="options.$$disabled()"> <span class="help-block" ng-bind="options.errorMessage"></span></div><div ng-if="options.$$readonly()" ng-class="options.$$appendControlClass()"><div class="form-control" ng-bind="$parent.value" readonly=""></div></div></div>');
  $templateCache.put('form/formgrouplabel/formgrouplabel.email.html', '<div class="form-group widgets-form-group-label-email" ng-class="options.appendClass"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div class="control-value-label" ng-class="options.$$appendControlClass()"><a ng-href="{{getEmailLink(value)}}" ng-if="value" ng-bind="value"></a></div></div>');
  $templateCache.put('form/formgrouplabel/formgrouplabel.string.html', '<div class="form-group widgets-form-group-label-string" ng-class="options.appendClass"><label for="{{options.name}}" class="control-label" ng-bind="options.label" ng-class="options.$$appendLabelClass()"></label><div class="control-value-label" ng-class="options.$$appendControlClass()"><div ng-bind="options.$$getValueLabel()"></div></div></div>');
  $templateCache.put('input/datalist/datalist.dialog.html', '<div class="widgets-data-list-dialog" ng-controller="DataListController" ng-class="vm.getSelectionModeClass()"><div widgets-search-box="" options="vm.search"></div><div widgets-list-view="" options="vm.listView"></div><div class="item-template load-more" ng-click="vm.loadMore()" ng-if="vm.getDataListControl().isLoadMoreVisibility()"><div>\u52A0\u8F7D\u66F4\u591A...</div></div></div>');
  $templateCache.put('input/datalist/datalist.html', '<div class="input-group" ng-click="onButtonClicked()"><span class="input-group-addon"><i class="fa fa-link"></i></span> <input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-value="options.getInputText()"></div>');
  $templateCache.put('input/dropdown/dropdown.html', '<select id="{{options.getId()}}" placeholder="{{options.getPlaceholder()}}" ng-options="options.getItemValue(option) as options.getItemLabel(option) for option in options.getDataSource()" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-style="options.getStyle()" control-name="{{options.getControlName()}}" ng-if="options.isVisibility()" ng-class="options.appendClass()" ng-model="$parent.options.$$value" widgets-events-input-changed=""></select>');
  $templateCache.put('input/email/email.html', '<div class="input-group" has-error="{{options.hasError()}}"><span class="input-group-addon"><i class="fa fa-envelope"></i></span> <input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-model="$parent.options.$$value" widgets-events-input-changed="" widgets-input-validator=""></div><div widgets-input-error="" options="options.getErrorControl()"></div>');
  $templateCache.put('input/error/input.error.html', '<div class="widgets-input-error" ng-if="options.hasError()"><div class="error-message" ng-bind="options.getErrorMessage()"></div></div>');
  $templateCache.put('input/search/search.html', '<div class="form-group widgets-search-box"><div class="input-group"><input id="{{options.getId()}}" type="text" class="form-control" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-model="$parent.options.$$value" widgets-events-input-changed=""> <span class="input-group-addon" ng-click="options.onSearchBoxButtonClicked()"><i class="fa" ng-class="options.appendSearchIconClass()"></i></span></div></div>');
  $templateCache.put('input/text/text.html', '<input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-model="$parent.options.$$value" widgets-events-input-changed="" widgets-input-validator=""><div widgets-input-error="" options="options.getErrorControl()"></div>');
  $templateCache.put('search/datalist/search.form.datalist.html', '<div class="input-group"><input type="text" class="form-control" ng-value="options.$$getValueExpr()" readonly="" placeholder="{{options.placeholder}}"> <span class="input-group-addon"><i class="fa fa-filter" ng-click="onButtonClicked()"></i></span></div>');
  $templateCache.put('search/number/search.form.number.dialog.html', '<div class="search-form-number-dialog" ng-controller="SearchFormNumberDialog"><div class="box-body"><div class="form-group"><label for="rule">\u89C4\u5219</label><select id="rule" class="form-control" ng-model="condition.op" ng-options="cond.name as cond.label for cond in conditions"></select></div><div class="form-group" ng-if="condition.op !== \'between\'"><label for="value">\u503C</label> <input id="value" class="form-control" type="number" ng-model="$parent.condition.value"></div><div class="form-group" ng-if="condition.op === \'between\'"><label for="from">\u4ECE</label> <input id="from" class="form-control" type="number" ng-model="$parent.condition.left"></div><div class="form-group" ng-if="condition.op === \'between\'"><label for="to">\u5230</label> <input id="to" class="form-control" type="number" ng-model="$parent.condition.right"></div></div></div>');
  $templateCache.put('search/number/search.form.number.html', '<div class="input-group"><input type="text" class="form-control" ng-value="options.$$getValueExpr()" readonly="" placeholder="{{options.placeholder}}"> <span class="input-group-addon"><i class="fa fa-filter" ng-click="onButtonClicked()"></i></span></div>');
  $templateCache.put('search/string/search.form.string.html', '<input type="text" ng-model="options.value" ng-change="options.$$onChanged(options.value)" placeholder="{{options.placeholder}}" class="form-control">');
}]);
'use strict';

angular.module('huoyun.widget').factory("DropdownControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function DropdownControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(DropdownControl, InputControl);

  DropdownControl.prototype.getDataSource = function () {
    if (!this.$$dataSource) {
      this.$$dataSource = this.getOptions().data;
    }

    if (!Array.isArray(this.$$dataSource)) {
      throw new Error("data isn't array");
    }

    return this.$$dataSource;
  };

  DropdownControl.prototype.getLabelField = function () {
    return this.getOptions().labelField;
  };

  DropdownControl.prototype.getItemLabel = function (option) {
    var labelField = this.getLabelField();
    if (labelField) {
      return option[labelField];
    }

    return option;
  };

  DropdownControl.prototype.getValueField = function () {
    return this.getOptions().valueField;
  };

  DropdownControl.prototype.getItemValue = function (item) {
    var valueField = this.getValueField();
    if (valueField) {
      return item[valueField];
    }
    return item;
  };

  return DropdownControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDropdown', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/dropdown/dropdown.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("EmailControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function EmailControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(EmailControl, InputControl);

  return EmailControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsEmailBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/email/email.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("InputErrorControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function InputErrorControl(ex) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    if (ex && ex.validator && ex.errorType) {
      this.setErrorMessage(ex.validator.getErrorMessage(ex.errorType));
    } else {
      this.setErrorMessage("未知错误");
    }
  }

  HuoYunWidgetCore.ClassExtend(InputErrorControl, HuoYunWidgetCore.Control);

  InputErrorControl.prototype.clear = function () {
    this.$$errorMessage = null;
    return this;
  };

  InputErrorControl.prototype.setErrorMessage = function (errorMessage) {
    this.$$errorMessage = errorMessage;
    return this;
  };

  InputErrorControl.prototype.getErrorMessage = function () {
    return this.$$errorMessage;
  };

  InputErrorControl.prototype.hasError = function () {
    return !!this.getErrorMessage();
  };

  return InputErrorControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsInputError', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/error/input.error.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SearchControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function SearchControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(SearchControl, InputControl);

  SearchControl.prototype.isSearching = function () {
    return !!this.getValue();
  };

  SearchControl.prototype.appendSearchIconClass = function () {
    return this.isSearching() ? "fa-times" : "fa-search";
  };

  SearchControl.prototype.onSearchBoxButtonClicked = function () {
    if (this.isSearching()) {
      this.setValue(null);
    }
  };

  return SearchControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/search/search.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TextControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function TextControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TextControl, InputControl);

  return TextControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTextBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/text/text.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormDataList', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/datalist/search.form.datalist.html',
    link: function link($scope, elem, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u8BBE\u7F6E\u641C\u7D22\u6761\u4EF6',
          templateUrl: "search/datalist/search.form.datalist.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, data) {
            if (key === "OK") {
              $scope.options.setValue(data);
              $scope.options.$$onChanged(data);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').controller('SearchFormNumberDialog', ["$scope", "SearchConditions", "SearchConditionValue", function ($scope, SearchConditions, SearchConditionValue) {
  $scope.conditions = SearchConditions;

  $scope.condition = angular.copy($scope.ngDialogData.params.options.value || new SearchConditionValue({
    op: "eq"
  }));

  $scope.ngDialogData.onConfirmButtonClicked = function () {
    $scope.closeThisDialog(['OK', $scope.condition]);
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormNumber', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/number/search.form.number.html',
    link: function link($scope, elem, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u8BBE\u7F6E\u641C\u7D22\u6761\u4EF6',
          templateUrl: "search/number/search.form.number.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, data) {
            if (key === "OK") {
              $scope.options.setValue(data);
              $scope.options.$$onChanged(data);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormString', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'search/string/search.form.string.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsEventsInputChanged', ["InputControl", function (InputControl) {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function link($scope, ele, attrs, ngModelController) {
      if ($scope.options instanceof InputControl) {
        var inputControl = $scope.options;
        var oldVal = inputControl.getValue();
        var newVal = oldVal;

        ngModelController.$viewChangeListeners.push(function () {
          newVal = inputControl.getValue();
          inputControl.raiseEvent("valueChanged", [newVal, oldVal]);
          oldVal = newVal;
        });
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsInputValidator', ["InputControl", function (InputControl) {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function link($scope, ele, attrs, ngModelController) {
      if ($scope.options instanceof InputControl) {
        var inputControl = $scope.options;
        ngModelController.$viewChangeListeners.push(function () {
          inputControl.validator();
        });
      }
    }
  };
}]);