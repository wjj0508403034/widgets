'use strict';

/**
 * options
 *  - fps
 */
angular.module('huoyun.widget').directive('widgetsVideoPlayer', ["$log", "Video", "$timeout", "widgetsHelper",
  function($log, Video, $timeout, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        svgOptions: "=",
        options: "=",
        src: "=",
      },
      templateUrl: 'video/video.player.html',
      link: function($scope, elem, attrs) {

        var videoElement = elem.find("video")[0];

        videoElement.onloadedmetadata = function(e) {
          e.preventDefault();
          $log.info("Video metadata is loaded", e);
          $timeout(function() {
            $scope.video = new Video(videoElement, $scope.options.fps);
          });
        };

        $scope.buttonVisibility = function(button) {
          return widgetsHelper.visibility(button);
        };

        $scope.buttonDisabled = function(button) {
          return widgetsHelper.disabled(button);
        };

        $scope.buttonStyle = function(button) {
          return widgetsHelper.style(button);
        };

        $scope.buttonClass = function(button) {
          return button.appendClass || "btn-default";
        };

        $scope.onButtonClicked = function(button) {
          if (typeof button.onClick === "function") {
            button.onClick.apply(button);
          } else {
            $log.warn("Button no click handler.", button);
          }
        };
      }
    }
  }
]);