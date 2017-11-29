'use strict';

angular.module('huoyun.widget').directive('widgetsTimeInputBox', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/time/time.html',
    link: function($scope, elem, attrs) {

      $scope.options && $scope.options.on("open", function() {
        $(document).on("click", clickEventListener);
      }).on("close", function() {
        $(document).off("click", clickEventListener);
      });

      function clickEventListener(event) {
        if (!$(event.target).closest('.popup').length) {
          $timeout(function() {
            $scope.options.close();
          });
        }
      }
    }
  }
}]);