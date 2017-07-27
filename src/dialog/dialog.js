'use strict';

/*
 * https://github.com/likeastore/ngDialog
 */

angular.module('huoyun.widget').config(["ngDialogProvider", function(ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

angular.module('huoyun.widget').controller("ConfirmDialogController", ["$scope",
  function($scope) {
    $scope.onCancelButtonClicked = function() {
      if ($scope.ngDialogData && typeof $scope.ngDialogData.onCancelButtonClicked === "function") {
        $scope.ngDialogData.onCancelButtonClicked.apply(this);
      } else {
        $scope.closeThisDialog('Cancel');
      }
    };

    $scope.onConfirmButtonClicked = function() {
      if ($scope.ngDialogData && typeof $scope.ngDialogData.onConfirmButtonClicked === "function") {
        $scope.ngDialogData.onConfirmButtonClicked.apply(this);
      } else {
        $scope.closeThisDialog('OK');
      }
    };

  }
]);

angular.module('huoyun.widget').factory("Dialog", ['$q', 'ngDialog', function($q, ngDialog) {

  return {
    showError: function(message) {
      return this.showConfirm({
        title: "错误",
        content: message,
        cancel: {
          visibility: false
        },
        confirm: {
          text: "知道了"
        }
      });
    },

    showConfirm: function(options) {
      var dialogOptions = {
        template: "dialog/dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        closeByDocument: !!options.closeByDocument,
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: (options.confirm && options.confirm.text) || "确定",
          cancelButtonText: (options.cancel && options.cancel.text) || "取消",
          confirmButtonVisibility: !(options.confirm && options.confirm.visibility === false),
          cancelButtonVisibility: !(options.cancel && options.cancel.visibility === false),
          params: options.params
        }
      };

      var dtd = $q.defer();

      ngDialog.open(dialogOptions)
        .closePromise.then(function(data) {
          if (data.value === "OK") {
            dtd.resolve();
          } else {
            dtd.reject();
          }
        });

      return dtd.promise;
    }
  };
}]);