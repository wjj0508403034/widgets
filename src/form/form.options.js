'use strict';

angular.module('huoyun.widget').factory("FormHeaderOption", ["ButtonOption", "widgetsHelper",
  function(ButtonOption, widgetsHelper) {

    function FormHeaderOption(options) {
      this.title = options.title;
      this.buttons = [];

      var that = this;
      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(buttonOption) {
          that.buttons.push(new ButtonOption(buttonOption));
        });
      }
    }

    FormHeaderOption.prototype.$$visibility = function() {
      return widgetsHelper.visibility(this);
    };

    return FormHeaderOption;
  }
]);

angular.module('huoyun.widget').factory("FormFooterOption", ["ButtonOption", "widgetsHelper",
  function(ButtonOption, widgetsHelper) {

    function FormFooterOption(options) {
      this.visibility = options.visibility;

      this.buttons = [];

      var that = this;
      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(buttonOption) {
          that.buttons.push(new ButtonOption(buttonOption));
        });
      }
    }

    FormFooterOption.prototype.$$visibility = function() {
      return widgetsHelper.visibility(this);
    };

    return FormFooterOption;
  }
]);

angular.module('huoyun.widget').factory("FormGroupDataListSelection", [function() {
  const Modes = {
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

  FormGroupDataListSelection.prototype.isSingle = function() {
    return this.mode === Modes.Single;
  };

  return FormGroupDataListSelection;
}]);

angular.module('huoyun.widget').factory("FormGroupDataListOption", ["HuoyunPromise", "FormGroupDataListSelection",
  function(HuoyunPromise, FormGroupDataListSelection) {

    const props = ["valueField", "labelField", "itemTemplateUrl"];

    function FormGroupDataListOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      this.selection = new FormGroupDataListSelection(options.selection);

      this.getOptions = function() {
        return options;
      };
    }

    FormGroupDataListOption.prototype.$$getDataSource = function() {
      return HuoyunPromise.resolve(this.getOptions().getDataSource());
    };

    FormGroupDataListOption.prototype.$$search = function(val) {
      return HuoyunPromise.resolve(this.getOptions().search(val));
    };

    FormGroupDataListOption.prototype.$$loadMore = function(loadCount, searchText) {
      return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
    };

    FormGroupDataListOption.prototype.$$loadVisibility = function() {
      return this.getOptions().loadVisibility === true;
    };

    FormGroupDataListOption.prototype.$$searchVisibility = function() {
      return this.getOptions().searchVisibility === true;
    };

    FormGroupDataListOption.prototype.$$getItemValueLabel = function(item) {
      return item && item[this.labelField];
    };

    FormGroupDataListOption.prototype.$$getItemsValueLabel = function(items) {
      if (Array.isArray(items)) {
        var that = this;

        return items.linq().join(function(item) {
          return item[that.labelField]
        }, ", ");
      }

      return items;
    };

    FormGroupDataListOption.prototype.$$getValueLabel = function(val) {
      if (this.selection.isSingle()) {
        return this.$$getItemValueLabel(val);
      }

      return this.$$getItemsValueLabel(val);
    };

    return FormGroupDataListOption;
  }
]);

angular.module('huoyun.widget').factory("FormGroupDropDownOption", [function() {

  function FormGroupDropDownOption(options) {

    this.getOptions = function() {
      return options;
    }
  }

  FormGroupDropDownOption.prototype.getDataSource = function() {
    if (!this.dataSource) {
      this.dataSource = this.getOptions().data;
    }

    if (!Array.isArray(this.dataSource)) {
      throw new Error("data isn't array");
    }

    return this.dataSource;
  }

  FormGroupDropDownOption.prototype.getLabelField = function() {
    return this.getOptions().labelField;
  };

  FormGroupDropDownOption.prototype.getLabel = function(option) {
    var labelField = this.getLabelField();
    if (labelField) {
      return option[labelField];
    }

    return option;
  };

  FormGroupDropDownOption.prototype.getValueField = function() {
    return this.getOptions().valueField;
  };

  FormGroupDropDownOption.prototype.getValue = function(option) {
    var valueField = this.getValueField();
    if (valueField) {
      return option[valueField];
    }
    return option;
  };



  return FormGroupDropDownOption;
}]);

angular.module('huoyun.widget').factory("FormGroupOption", ["widgetsHelper", "Form", "FormOrientation",
  "FormValidators", "FormGroupDataListOption", "FormGroupDropDownOption",
  function(widgetsHelper, FormProvider, FormOrientation, FormValidators, FormGroupDataListOption, FormGroupDropDownOption) {

    const props = ["name", "label", "mandatory", "type", "readonly", "visibility", "disabled", "templateUrl",
      "appendLabelClass", "appendControlClass", "placeholder", "appendClass"
    ];

    function FormGroupOption(options) {
      this.validators = [];
      var that = this;
      props.forEach(function(prop) {
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

    FormGroupOption.prototype.setFormOption = function(formOption) {
      this.formOption = formOption;
    };

    FormGroupOption.prototype.setValue = function(val) {
      this.formOption.setPropertyValue(this.name, val);
    };

    FormGroupOption.prototype.getValue = function() {
      return this.formOption.getPropertyValue(this.name);
    };

    FormGroupOption.prototype.getControl = function() {
      return this.control;
    };

    FormGroupOption.prototype.$$getValueLabel = function() {
      var value = this.getValue();
      if (this.type === "DataList") {
        return this.datalist.$$getValueLabel(value);
      }

      return value;
    };

    FormGroupOption.prototype.$$visibility = function() {
      return widgetsHelper.visibility(this);
    };

    FormGroupOption.prototype.$$disabled = function() {
      return widgetsHelper.disabled(this);
    };

    FormGroupOption.prototype.$$readonly = function() {
      return widgetsHelper.readonly(this);
    };

    FormGroupOption.prototype.$$appendLabelClass = function() {
      if (this.formOption.getReadOnly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
        return this.appendLabelClass || FormProvider.getLabelClass();
      }
    };

    FormGroupOption.prototype.$$appendControlClass = function() {
      if (this.formOption.getReadOnly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
        return this.appendControlClass || FormProvider.getControlClass()
      }
    };

    FormGroupOption.prototype.addValidator = function(validator) {
      this.validators.push(new validator(this));
    };

    FormGroupOption.prototype.getValidators = function() {
      var validators = this.validators.concat([]);
      if (this.mandatory === true) {
        validators.push(new FormValidators.Mandatory(this));
      }

      if (this.type === "email") {
        validators.push(new FormValidators.Email(this));
      }

      return validators;
    };

    FormGroupOption.prototype.validator = function(val) {
      var promises = [];
      this.getValidators().forEach(function(validator) {
        promises.push(validator.onValid(val));
      });
      return Promise.all(promises);
    };

    FormGroupOption.prototype.setError = function(errorMessage) {
      this.hasError = true;
      if (errorMessage) {
        this.errorMessage = errorMessage;
      }
    };

    FormGroupOption.prototype.clearError = function() {
      this.hasError = false;
      this.errorMessage = null;
    };

    return FormGroupOption;
  }
]);



angular.module('huoyun.widget').provider("Form", [function() {
  this.orientation = "horizontal";
  this.labelClass = "col-sm-2";
  this.controlClass = "col-sm-10";

  this.config = function(options) {
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

  this.getOrientation = function() {
    return this.orientation;
  };

  this.getLabelClass = function() {
    return this.labelClass;
  };

  this.getControlClass = function() {
    return this.controlClass;
  };

  this.$get = function() {
    return this;
  };
}]);


angular.module('huoyun.widget').factory("FormOption", ["$q", "FormHeaderOption", "FormGroupOption", "FormFooterOption",
  "FormOrientation", "Form",
  function($q, FormHeaderOption, FormGroupOption, FormFooterOption, FormOrientation, FormProvider) {
    this.data = {};

    function FormOption(options) {

      if (options.orientation) {
        if ([FormOrientation.Horizontal, FormOrientation.Vertical].indexOf(options.orientation.toLocaleLowerCase()) !==
          -1) {
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
        options.groups.forEach(function(groupOption) {
          var formGroupOption = new FormGroupOption(groupOption);
          formGroupOption.setFormOption(that);
          that.groups.push(formGroupOption);
        });
      }
    }

    FormOption.prototype.getFormOrientation = function() {
      if (this.orientation) {
        return this.orientation;
      }
      return FormProvider.getOrientation();
    };

    FormOption.prototype.$$formOrientationClass = function() {
      if (this.getFormOrientation() === FormOrientation.Horizontal) {
        return "form-horizontal";
      }
    };

    FormOption.prototype.getReadOnly = function() {
      if (typeof this.readonly === "boolean") {
        return this.readonly;
      }

      return false;
    };

    FormOption.prototype.setReadOnly = function(readonly) {
      this.readonly = readonly;
      return this;
    };

    FormOption.prototype.setData = function(data) {
      this.data = data;
      return this;
    };

    FormOption.prototype.getData = function() {
      return this.data;
    };

    FormOption.prototype.setPropertyValue = function(name, val) {
      if (!this.data) {
        this.data = {};
      }

      this.data[name] = val;
    };

    FormOption.prototype.getPropertyValue = function(name) {
      return this.data && this.data[name];
    };

    FormOption.prototype.validator = function() {
      var that = this;

      var promises = [];
      this.groups.forEach(function(group) {
        promises.push(group.validator(that.data[group.name]));
      });


      var dtd = $q.defer();
      Promise.all(promises)
        .then(function() {
          dtd.resolve();
        })
        .catch(function(ex) {
          dtd.reject(ex);
        });

      return dtd.promise;
    };

    return FormOption;
  }
]);


angular.module('huoyun.widget').factory("FormValidators", ["MandatoryValidator", "EmailValidator",
  function(MandatoryValidator, EmailValidator) {
    return {
      Mandatory: MandatoryValidator,
      Email: EmailValidator
    };
  }
]);