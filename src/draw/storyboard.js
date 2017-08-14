'use strict';

angular.module('huoyun.widget').directive("widgetsStoryBoard", ["$log", "svgHelper", "Draw",
  function($log, svgHelper, Draw) {
    return {
      restrict: "A",
      scope: {
        svgOptions: "="
      },
      link: function($scope, elem, attrs) {
        var svg = svgHelper.generateSVG(elem);
        $scope.svgOptions.line.setSvg(svg).draw().text("水平消失线");

        var cube = new Draw.Cube();
        cube.setHorizontalLine($scope.svgOptions.line).setSvg(svg).enableDrawing();


      }
    }
  }
]);