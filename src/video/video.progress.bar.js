'use strict';

angular.module('huoyun.widget').directive('widgetsVideoProgressBar', ["$log", "$timeout",
  function($log, $timeout) {
    return {
      restrict: 'A',
      scope: {
        video: "=",
      },
      templateUrl: 'video/video.progress.bar.html',
      link: function($scope, elem, attrs) {

        $scope.dragProcent = 0;
        $scope.inDraging = false;

        function getProcent() {
          if ($scope.inDraging) {
            return (100 * $scope.dragProcent).toFixed(2) + "%";
          }

          return getVideoProcent();
        }

        function getVideoProcent() {
          if ($scope.video) {
            return (100.0 * $scope.video.currentTime / $scope.video.duration).toFixed(2) + "%";
          }

          return 0;
        }

        $scope.progressStyle = function() {
          return {
            width: getProcent()
          };
        };

        $scope.radioButtonStyle = function() {
          return {
            left: getProcent()
          };
        };

        $scope.onProgressBarClicked = function(event) {
          event.stopPropagation();
          if ($scope.video) {
            var precent = event.offsetX / elem.width();
            $scope.video.setPrecent(precent);
          }
        };

        var delta = 0;
        $scope.onDragRadioButtonDown = function(event) {
          event.stopPropagation();
          if ($scope.video) {
            delta = event.clientX - event.offsetX;
            console.log("Mouse Down Delta", event, elem.clientX())
            $scope.dragProcent = $scope.video.currentTime / $scope.video.duration;
            $scope.inDraging = true;
            $(document).on("mousemove", onMouseMoveHandler);
            $(document).on("mouseup", onMouseUpHandler);
          }
        };

        function onMouseUpHandler(event) {
          event.stopPropagation();
          $(document).off("mousemove", onMouseMoveHandler);
          $(document).off("mouseup", onMouseUpHandler);
          $timeout(function() {
            $scope.inDraging = false;
          });
        };

        function onMouseMoveHandler(event) {
          event.stopPropagation();
          $timeout(function() {
            console.log("Delta", delta, event.clientX)
            $scope.dragProcent = 1.0 * (event.clientX - delta) / elem.width();
            $scope.video.setPrecent($scope.dragProcent);
          });
        }
      }
    }
  }
]);