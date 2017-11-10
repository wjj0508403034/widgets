'use strict';

angular.module('huoyun.widget').factory("CodeLanguage", [function() {

  const Languages = {
    JavaScript: "JavaScript",
    Json: "Json",
    Python: "Python",
    CSharp: "CSharp"
  };

  function CodeLanguage(language) {
    if (typeof language !== "string") {
      throw new Error("Language must be a string");
    }

    if (["js", "javascript"].indexOf(language.toLowerCase()) !== -1) {
      this.$$name = Languages.JavaScript;
    } else if (["json"].indexOf(language.toLowerCase()) !== -1) {
      this.$$name = Languages.Json;
    } else if (["python"].indexOf(language.toLowerCase()) !== -1) {
      this.$$name = Languages.Python;
    } else if (["C#", "c#", "csharp"].indexOf(language.toLowerCase()) !== -1) {
      this.$$name = Languages.CSharp;
    }
  }

  CodeLanguage.prototype.getName = function() {
    return this.$$name;
  };

  CodeLanguage.Names = Languages;

  return CodeLanguage;

}]);

angular.module('huoyun.widget').factory("AceCodeEditor", ["CodeLanguage", function(Language) {

  const AceLanguageModes = {
    JavaScript: "ace/mode/javascript",
    Json: "ace/mode/json",
    Python: "ace/mode/python"
  };

  function CodeEditor(options) {

    this.getOptions = function() {
      return options;
    };

    if (options.language) {
      this.$$language = new Language(options.language);
    }
  }

  CodeEditor.prototype.setEditorContainerElem = function(elem) {
    this.$$editor = ace.edit(elem);
    this.$$editor.setTheme("ace/theme/monokai");
    if (this.getAceMode()) {
      this.$$editor.getSession().setMode(this.getAceMode());
    }

    var that = this;
    this.getEditorReadyListners().forEach(function(listener) {
      listener.apply(that);
    });

    return this;
  };

  CodeEditor.prototype.setEditorReadyListener = function(listener) {
    this.getEditorReadyListners().push(listener);
  };

  CodeEditor.prototype.getEditorReadyListners = function() {
    if (!this.$$editorReadyListeners) {
      this.$$editorReadyListeners = [];
    }

    return this.$$editorReadyListeners;
  };

  CodeEditor.prototype.__getEditor = function() {
    return this.$$editor;
  };

  CodeEditor.prototype.getLanguage = function() {
    return this.$$language && this.$$language.getName();
  };

  CodeEditor.prototype.getAceMode = function() {
    return AceLanguageModes[this.getLanguage()];
  };

  CodeEditor.prototype.getContent = function() {
    return this.__getEditor().getValue();
  };

  CodeEditor.prototype.setContent = function(content) {
    return this.__getEditor().setValue(content);
  };

  return CodeEditor;
}]);