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
        svgHelper.drawLine(svg, $scope.svgOptions.line);
        var path = 'M 100 200 C 200 100 300 0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100'
        svg.plain("水平消失线").font({ size: 42.5, family: 'Verdana' }).fill('#f06')

        var cube = new Draw.Cube();
        cube.setHorizontalLine($scope.svgOptions.line);
        cube.setSvg(svg);


      }
    }
  }
]);