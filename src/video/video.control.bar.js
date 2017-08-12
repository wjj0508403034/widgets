'use strict';

angular.module('huoyun.widget').directive('widgetsVideoControlBar', ["$log", "widgetsHelper",
  function($log, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        video: "=",
      },
      templateUrl: 'video/video.control.bar.html',
      link: function($scope, ele, attrs) {

        $scope.playButtonDisabled = function() {
          if (!$scope.video) {
            return true;
          }
          return false;
        };

        $scope.playButtonVisibility = function() {
          if ($scope.video && $scope.video.status === "play") {
            return false;
          }

          return true;
        };

        $scope.onPlayButtonClicked = function() {
          if ($scope.video) {
            $scope.video.play();
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.pauseButtonDisabled = function() {
          if (!$scope.video) {
            return true;
          }
          return false;
        };

        $scope.onPauseButtonClicked = function() {
          if ($scope.video) {
            $scope.video.pause();
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.onFastForwardButtonClicked = function() {
          if ($scope.video) {
            $scope.video.fastForward();
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.onFastBackwardButtonClicked = function() {
          if ($scope.video) {
            $scope.video.fastBackward();
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.onPerviousFrameButtonClicked = function() {
          if ($scope.video) {
            $scope.video.previousFrame();
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.onNextFrameButtonClicked = function() {
          if ($scope.video) {
            $scope.video.nextFrame();
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.onRateButtonClicked = function(rate) {
          if ($scope.video) {
            $scope.video.changeRate(rate);
          } else {
            $log.warn("current video is undefined.");
          }
        };

        $scope.onRateButtonDisabled = function(rate) {
          if ($scope.video) {
            return $scope.video.defaultPlaybackRate * rate === $scope.video.getPlaybackRate();
          }
        };

        $scope.getFrameInfo = function() {
          if ($scope.video) {
            return `第${$scope.video.currentFrame}帧/共${$scope.video.totalFrames}帧`;
          }
        };

        $scope.getTimeInfo = function() {
          if ($scope.video) {
            var time = widgetsHelper.durationFormat($scope.video.currentTime);
            var total = widgetsHelper.durationFormat($scope.video.duration);
            return `${time}/${total}`;
          }
        };

        $scope.progressStyle = function() {
          var width = 0;
          if ($scope.video) {
            width = (100.0 * $scope.video.currentTime / $scope.video.duration).toFixed(2) + "%";
          }
          return {
            width: width
          };
        };
      }
    }
  }
]);