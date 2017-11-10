'use strict';

angular.module('huoyun.widget').factory("JsonProperty", [function() {

  function JsonProperty(name, val) {
    this.$$name = name;

    this.getValue = function() {
      return val;
    };
  }

  JsonProperty.prototype.setJsonModel = function(jsonModel) {
    this.$$jsonModel = jsonModel;
  };

  JsonProperty.prototype.getJsonModel = function() {
    return this.$$jsonModel;
  };


  JsonProperty.prototype.isPrimaryKey = function() {
    return this.getJsonModel().getPrimaryKey() === this.getName();
  };

  JsonProperty.prototype.isForeignKey = function() {
    return this.getJsonModel().getForeignKey() === this.getName();
  };

  JsonProperty.prototype.getName = function() {
    return this.$$name;
  };

  JsonProperty.prototype.isNormalTypes = function() {
    if (this.isEnum()) {
      return false;
    }
    var type = this.getType();
    return ["string", "integer", "number"].indexOf(type) !== -1;
  };

  JsonProperty.prototype.isObject = function() {
    return this.getType() === "object";
  };

  JsonProperty.prototype.getObjectChild = function() {
    if (!this.$$objectChild) {
      this.$$objectChild = new JsonProperty.JsonModel(this.getValue());
      this.$$objectChild.setParent(this);
    }

    return this.$$objectChild;
  };

  JsonProperty.prototype.isArray = function() {
    return this.getType() === "array";
  };

  JsonProperty.prototype.getArrayChild = function() {
    if (!this.$$arrayChild) {
      this.$$arrayChild = new JsonProperty.JsonModel(this.getValue().items);
      this.$$arrayChild.setParent(this);
    }
    return this.$$arrayChild;
  };

  JsonProperty.prototype.isEnum = function() {
    if (!this.$$isEnum) {
      this.$$isEnum = false;
      if (this.getType() === "string") {
        if (Array.isArray(this.getValue().enum)) {
          this.$$isEnum = true;
        }
      }
    }
    return this.$$isEnum;
  };

  JsonProperty.prototype.getEnumValues = function() {
    if (this.isEnum()) {
      return this.getValue().enum;
    }
  }

  JsonProperty.prototype.getType = function() {
    if (!this.$$type) {
      var type = this.getValue().type;
      if (typeof type !== "string") {
        throw new Error("Type must be string");
      }

      this.$$type = type.toLowerCase();
    }

    return this.$$type;
  };

  return JsonProperty;
}]);


angular.module('huoyun.widget').factory("JsonModel", ["JsonProperty", function(JsonProperty) {

  function JsonModel(obj) {
    this.$$expanded = true;
    this.$$properties = [];
    var that = this;
    this.$$hasError = false;

    if (typeof obj === "string") {
      try {
        obj = JSON.parse(obj)
      } catch (ex) {
        this.$$hasError = true;
      }
    }

    if (obj && !this.$$hasError) {
      Object.keys(obj.properties).forEach(function(propName) {
        var prop = new JsonProperty(propName, obj.properties[propName]);
        prop.setJsonModel(that);
        that.$$properties.push(prop);
      });
    }

    this.getValue = function() {
      return obj;
    };
  }

  JsonProperty.JsonModel = JsonModel;

  JsonModel.prototype.hasError = function() {
    return this.$$hasError;
  };

  JsonModel.prototype.isJsonViewVisibility = function() {
    if (this.hasError()) {
      return false;
    }

    if (!this.getValue()) {
      return false;
    }

    return true;
  };

  JsonModel.prototype.getProperties = function() {
    return this.$$properties;
  };

  JsonModel.prototype.getForeignKey = function() {
    return this.getValue().foreignkey;
  };

  JsonModel.prototype.getPrimaryKey = function() {
    return this.getValue().primaryKey;
  };

  JsonModel.prototype.getName = function() {
    return this.getValue().title;
  };

  JsonModel.prototype.isExpanded = function() {
    return this.$$expanded;
  };

  JsonModel.prototype.toggleButtonClass = function() {
    return this.isExpanded() ? "fa-minus-square-o" : "fa-plus-square-o";
  };

  JsonModel.prototype.onExpandClicked = function() {
    this.$$expanded = !this.$$expanded;
  };

  JsonModel.prototype.setParent = function(parent) {
    this.$$parent = parent;
    return this;
  };

  JsonModel.prototype.getParent = function() {
    return this.$$parent;
  }

  return JsonModel;
}]);

angular.module('huoyun.widget').factory("FormGroupJsonOption", ["JsonEditor", function(JsonEditor) {

  function FormGroupJsonOption(options) {
    this.getOptions = function() {
      return this.options;
    };
  }

  FormGroupJsonOption.prototype.setFormGroup = function(formGroup) {
    this.$$formGroup = formGroup;
    return this;
  };

  FormGroupJsonOption.prototype.getFormGroup = function() {
    return this.$$formGroup;
  }

  FormGroupJsonOption.prototype.getPropertyValue = function() {
    return this.getFormGroup().getValue();
  };

  FormGroupJsonOption.prototype.getJsonEditor = function() {
    if (!this.$$jsonEditor) {
      this.$$jsonEditor = new JsonEditor();
      this.$$jsonEditor.setFormGroup(this);
      //this.$$jsonEditor.setValue(this.getPropertyValue());
    }
    return this.$$jsonEditor;
  };

  return FormGroupJsonOption;
}]);