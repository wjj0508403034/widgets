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

angular.module('huoyun.widget').factory("FormGroupOption", ["widgetsHelper", "Form", "FormOrientation",
  "FormValidators",
  function(widgetsHelper, FormProvider, FormOrientation, FormValidators) {

    const props = ["name", "label", "mandatory", "type", "readonly", "visibility", "disabled", "templateUrl",
      "appendLabelClass", "appendControlClass", "placeholder", "appendClass"
    ];

    function FormGroupOption(options) {
      this.validators = [];
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });
    }

    FormGroupOption.prototype.setFormOption = function(formOption) {
      this.formOption = formOption;
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
      if (this.formOption.$$readonly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
        return this.appendLabelClass || FormProvider.getLabelClass();
      }
    };

    FormGroupOption.prototype.$$appendControlClass = function() {
      if (this.formOption.$$readonly() || this.formOption.getFormOrientation() === FormOrientation.Horizontal) {
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

angular.module('huoyun.widget').constant("FormOrientation", {
  Horizontal: "horizontal",
  Vertical: "vertical"
});

angular.module('huoyun.widget').provider("Form", ["FormOrientation", function() {
  this.orientation = "horizontal";
  this.labelClass = "col-sm-2";
  this.controlClass = "col-sm-10";

  this.config = function(options) {
    if (options.orientation) {
      if (typeof options.orientation === "string") {
        if ([FormOrientation.Horizontal, FormOrientation.Vertical].indexOf(options.orientation.toLocaleLowerCase()) !==
          -1) {
          this.orientation = options.orientation;
        } else {
          throw new Error(`Form orientation value must be "horizontal" or "vertical"`);
        }
      } else {
        throw new Error(`Form orientation value must be "horizontal" or "vertical"`);
      }
    }

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
          throw new Error(`Form orientation value must be "horizontal" or "vertical"`);
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

    FormOption.prototype.$$readonly = function() {
      if (typeof this.readonly === "boolean") {
        return this.readonly;
      }

      return false;
    };

    FormOption.prototype.setData = function(data) {
      this.data = data;
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