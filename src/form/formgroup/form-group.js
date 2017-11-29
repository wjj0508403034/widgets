'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroup', ["FormControlProvider", "$compile",
  function(FormControlProvider, $compile) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        options: "="
      },
      templateUrl: 'form/formgroup/form-group.html',
      link: function($scope, elem, attrs) {
        $scope.renderInputControl = function() {
          var controlType = $scope.options.getType();
          var widgetName = FormControlProvider.getWidgetNameByTypeOrDefault(controlType, "STRING");
          var template = `<div ${widgetName} options="options.getInputControl().getInput()"></div>`;
          var linkFn = $compile(template);
          linkFn($scope, function(clone) {
            elem.find(".input-control-template").append(clone);
          });
        };
      }
    }
  }
]);