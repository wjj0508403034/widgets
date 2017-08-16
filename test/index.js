angular.module('Demo', ['huoyun.widget']);

angular.module('Demo').config(["displayProvider", function(displayProvider) {
  displayProvider.config({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm"
  });
}]);

angular.module('Demo').controller("DemoController", ["$scope", "Dialog", "Tip", "Draw",
  function($scope, Dialog, Tip, Draw) {

    $scope.svgOptions = {
      line: new Draw.Line(new Draw.Point(200, 200), new Draw.Point(800, 200)),
      objects: [],
      callbacks: [],
      registerObjectCreate: function(callback) {
        this.callbacks.push(callback);
      },
      afterSvgInit: function(svg) {
        this.line.setSvg(svg).draw().text("水平消失线");
      }
    };

    $scope.showDialog = function() {
      Dialog.showError({})
        .then(function() {
          console.log("OK");
        }).catch(function() {
          console.log("Cancel");
        });
    };

    $scope.showTip = function() {
      Tip.show("xxx");
    };

    $scope.tableOptions = {
      title: "Table",
      selectionMode: "multiple",
      buttons: [{
        name: "add",
        label: "添加",
        appendClass: "btn-primary",
        onClick: function() {
          console.log(this)
        }
      }],
      columns: [{
        name: "id",
        label: "编号",
        type: "string"
      }, {
        name: "firstName",
        label: "名",
        type: "string"
      }, {
        name: "lastName",
        label: "姓",
        type: "string"
      }, {
        name: "age",
        label: "年龄",
        type: "number",
        visibility: function() {
          return true;
        },
        style: { "text-align": "right" }
      }, {
        name: "birthday",
        label: "生日",
        type: "date",
        style: function() {
          return {
            color: "red",
            "text-align": "center"
          };
        }
      }]
    };

    $scope.dataSource = {
      content: [{
        id: "1111",
        firstName: "Jingjing",
        lastName: "Wang",
        age: 30,
        birthday: new Date()
      }],
      first: true,
      last: false,
      number: 0,
      numberOfElements: 20,
      size: 20,
      sort: null,
      totalElements: 26,
      totalPages: 2
    };

    $scope.videoOptions = {
      title: "test.mp4",
      fps: 15,
      buttons: [{
        name: "add",
        label: "添加",
        appendClass: "btn-primary",
        onClick: function() {
          var object = new Draw.Cube();
          object.setHorizontalLine($scope.svgOptions.line);
          var testData = [];
          var points = [new Draw.Point(0, 0), new Draw.Point(0, 0), new Draw.Point(0, 0), new Draw.Point(0, 0)];
          testData.push(points);
          testData.push(points);
          testData.push(points);
          testData.push(points);
          testData.push(points);
          testData.push(points);
          object.timeline.timeline[100] = testData;
          object.timeline.setEndTime(50);
          //var that = this;

          $scope.svgOptions.callbacks.forEach(function(callback) {
            callback(object);
          });
          $scope.svgOptions.objects.push(object);
          //console.log(this)
        }
      }, {
        name: "cancel",
        label: "取消",
        onClick: function() {
          console.log(this)
        }
      }],
    };
    $scope.src = "http://116.236.198.27:8083/201706120744414665428/Datalog/compress/201706120749214391572/right.avi_4.mp4";
  }


]);