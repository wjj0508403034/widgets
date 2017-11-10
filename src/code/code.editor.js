'use strict';

angular.module('huoyun.widget').directive('widgetsCodeEditor', ["AceCodeEditor",
  function(AceCodeEditor) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'code/code.editor.html',
      link: function($scope, elem, attrs) {
        $scope.options && $scope.options.setEditorContainerElem(elem.find(".widgets-code-container")[0]);
      }
    }
  }
]);