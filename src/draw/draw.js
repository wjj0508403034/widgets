'use strict';

angular.module('huoyun.widget').factory("Draw", ["Point", "Line", "Cube",
  function(Point, Line, Cube) {

    return {
      Point: Point,
      Line: Line,
      Cube: Cube
    };
  }
]);