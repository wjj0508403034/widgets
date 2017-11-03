angular.module('Demo', ['huoyun.widget']);

angular.module('Demo').config(["displayProvider", function(displayProvider) {
  displayProvider.config({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm"
  });
}]);

// angular.module('Demo').config(["SearchExprProvider", function(SearchExprProvider) {
//   SearchExprProvider.config({
//     "String": function(prop) {
//       return "hell"
//     }
//   });
// }]);


angular.module('Demo').controller("DemoController", ["$scope", "Dialog", "Tip", "Draw", "HuoYunWidgets",
  function($scope, Dialog, Tip, Draw, HuoYunWidgets) {
    $scope.checkbox = new HuoYunWidgets.CheckBoxOption({
      label: "xx2",
      value: true,
      onCheckChanged: function() {
        console.log(arguments)
      }
    });

    $scope.searchFormOption = new HuoYunWidgets.SearchFormOption({
      title: "搜索",
      props: [{
        name: "firstName",
        label: "First Name",
        type: "string"
      }, {
        name: "lastName",
        label: "Last Name",
        type: "string"
      }, {
        name: "level",
        label: "Level",
        type: "DropDown",
        dropdown: {
          labelField: "label",
          data: [{
              name: "1",
              label: "Level 1"
            },
            {
              name: "2",
              label: "Level 2"
            }
          ]
        }
      }, {
        name: "age",
        label: "Age",
        type: "Integer"
      }, {
        name: "Test1",
        label: "Test1",
        type: "DataList",
        datalist: {
          valueField: "value",
          labelField: "name",
          getDataSource: function() {
            return [{
              name: "11",
              value: "xxx"
            }, {
              name: "222",
              value: "xxx1"
            }];
          },
          search: function(val) {
            return [{
              name: "11",
              value: "xxx"
            }, {
              name: "222",
              value: "xxx1"
            }, {
              name: "333",
              value: "xxx2"
            }];
          }
        }

      }],
      onSearch: function(expr) {
        console.log(expr);
      }
    });

    $scope.formOption = new HuoYunWidgets.FormOption({
      orientation: "vertical",
      header: {
        title: "Form 1",
        buttons: [{
          name: "add",
          label: "添加",
          appendClass: "btn-default",
          onClick: function() {
            console.log(this)
          }
        }]
      },
      groups: [{
        name: "firstName",
        label: "First Name",
        type: "string",
        mandatory: true,
        appendClass: "col-sm-4"
      }, {
        name: "lastName",
        label: "Last Name",
        type: "string",
        mandatory: true,
        disabled: true,
        appendClass: "col-sm-4"
      }, {
        name: "email",
        label: "Email",
        type: "email",
        mandatory: true,
        placeholder: "Input email ...",
        appendClass: "col-sm-4",
        readonly: true
      }, {
        name: "level",
        label: "Level",
        type: "DropDown",
        dropdown: {
          labelField: "label",
          valueField: "name",
          data: [{
              name: "1",
              label: "Level 1"
            },
            {
              name: "2",
              label: "Level 2"
            }
          ]
        }
      }],
      footer: {
        buttons: [{
          name: "save",
          label: "保存",
          appendClass: "btn-primary",
          onClick: function() {
            $scope.formOption.readonly = false;
            // $scope.formOption.validator()
            //   .then(function() {

            //   }).catch(function(formGroup) {
            //     formGroup.setError();
            //   });
          }
        }]
      }
    });

    $scope.formOption.setData({
      email: "xx@sap.com",
      firstName: "Jingjing",
      lastName: "Wang"
    });

    $scope.breadCrumbOptions = new HuoYunWidgets.BreadCrumbOption({
      items: [{
        name: "xxx",
        label: "first"
      }, {
        name: "xxx",
        label: "second"
      }, {
        name: "xxx",
        label: "third"
      }]
    });

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

    $scope.tableOptions = new HuoYunWidgets.TableOption({
      selection: {
        mode: "Single",
        checkbox: true,
        hightlight: false
      },
      header: {
        style: {
          padding: "20px 10px"
        },
        title: "Table1",
        buttons: [{
          name: "add",
          label: "添加",
          appendClass: "btn-primary",
          onClick: function() {
            console.log(this)
          }
        }, {
          name: "add",
          label: "添加2",
          appendClass: "btn-primary",
          onClick: function() {
            console.log(this)
          },
          visibility: function() {
            if ($scope.tableOptions.getSelectedItem()) {
              return true;
            }

            return false;
          }
        }],
      },
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
    });

    $scope.tableOptions.setSource({
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
    });



    $scope.navOptions = {
      items: [{
        label: "任务大厅"
      }, {
        label: "个人中心",
        visibility: function() {
          return false;
        }
      }, {
        label: "系统设置"
      }, {
        label: "帮助"
      }]
    };

    $scope.headOptions = {
      title: "xxx"
    };

    $scope.sideBarOptions = {
      groups: [{
        label: "任务",
        items: [{
          label: "我的任务"
        }, {
          label: "任务管理",
          selected: true,
          onClick: function(group, groupItem) {
            console.log(this, arguments)
          }
        }, {
          label: "任务审核"
        }]
      }, {
        label: "视频",
        items: [{
          label: "上传视频"
        }, {
          label: "视频管理"
        }]
      }, {
        label: "用户",
        items: [{
          label: "个人信息"
        }, {
          label: "重设密码"
        }, {
          label: "用户管理"
        }]
      }]
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
          var points = [new Draw.Point(0, 0), new Draw.Point(0, 0), new Draw.Point(0, 0), new Draw.Point(0,
            0)];
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
    $scope.src =
      "http://116.236.198.27:8083/201706120744414665428/Datalog/compress/201706120749214391572/right.avi_4.mp4";


  }


]);