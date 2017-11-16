angular.module('Demo', ['huoyun.widget']);

angular.module('Demo').config(["displayProvider", function(displayProvider) {
  displayProvider.config({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm"
  });
}]);

angular.module('Demo').controller("DemoController", ["$scope", "Dialog", "HuoYunWidgets",
  function($scope, Dialog, HuoYunWidgets) {

    $scope.storyBoard = null;

    $scope.datepicker = new HuoYunWidgets.Controls.DatePicker({
      date: new Date()
    });

    $scope.tab = new HuoYunWidgets.Controls.Tab({
      items: [{
        header: {
          content: "Tab AA"
        },
        content: "AA"
      }, {
        header: {
          content: "Tab BB"
        },
        content: "BB"
      }]
    }).on("selectedChanged", function() {
      $scope.storyBoard.createLine().setPoint1(100, 200).setPoint2(200, 300).draw();
      $scope.storyBoard.createRect().setStartPoint(100, 200).setEndPoint(200, 300).draw();
      console.log($scope.storyBoard)
    });

    $scope.pagination = new HuoYunWidgets.Controls.Pagination({
      first: true,
      currentPage: 0,
      totalPages: 10,
      last: false
    }).on("pageChanged", function(pageIndex, control) {
      control.move(pageIndex);
      // control.setData({
      //   first: false,
      //   currentPage: pageIndex,
      //   totalPages: 10,
      //   last: false
      // });
    });

    $scope.table = new HuoYunWidgets.Controls.Table({
      selection: "multiple",
      columns: [{
        name: "id",
        text: "ID",
        style: {
          color: "red"
        }
      }, {
        name: "firstName",
        text: "First Name"
      }, {
        name: "lastName",
        text: "Last Name"
      }],
      header: {}
    }).setDataSource([{
      id: "x0001",
      firstName: "Jingjing",
      lastName: "Wang"
    }, {
      id: "x0002",
      firstName: "Jingjing2",
      lastName: "Wang2"
    }]).on("columnExchanged", function(sourceColumn, targetColumn, table) {
      console.log("columnExchanged", arguments)
      console.log("columnExchanged", table.getColumnNames())
    }).on("sortChanged", function() {
      console.log("sortChanged", arguments)
    }).on("dataSourceChanged", function() {
      console.log("dataSourceChanged", arguments)
    }).on("selectedChanged", function() {
      console.log("selectedChanged", arguments)
    });

    $scope.listViewOption = new HuoYunWidgets.Controls.ListView({
      selection: "multiple",
      displayPath: "label",
      valuePath: "id",
      dataSource: [{
          id: 3,
          name: "3",
          label: "Level 1",
          text: {
            aa: "AA"
          }
        },
        {
          id: 5,
          name: "5",
          label: "Level 2",
          text: {
            aa: "bb"
          }
        }
      ]
    }).on("selectedChanged", function() {
      console.log(arguments)
      console.log($scope.listViewOption.getSelectedValue())
    });

    $scope.button = new HuoYunWidgets.Controls.Button({
      text: "Hello"
    });

    $scope.textBoxOption = new HuoYunWidgets.Controls.Inputs.TextBox({
      placeholder: "input...."
    });

    $scope.dropdownOption = new HuoYunWidgets.Controls.Inputs.Dropdown({
      labelField: "label",
      valueField: "name",
      trackBy: "id",
      data: [{
          id: 3,
          name: "3",
          label: "Level 1"
        },
        {
          id: 5,
          name: "5",
          label: "Level 2"
        }
      ]
    });

    $scope.dropdownSelected = "3";


    $scope.form = new HuoYunWidgets.Controls.Form({
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
        type: "string",
        mandatory: true,
        appendClass: "col-sm-4",
        label: {
          text: "First Name"
        },
        input: {
          onValueChanged: function() {
            console.log(arguments)
          }
        }

      }, {
        name: "lastName",
        type: "string",
        mandatory: true,
        disabled: true,
        label: {
          text: "Last Name"
        },
        appendClass: "col-sm-4"
      }, {
        name: "email",
        type: "email",
        label: {
          text: "Email"
        },
        input: {
          placeholder: "Input email ..."
        },
        mandatory: true,
        appendClass: "col-sm-4"
      }, {
        name: "level",
        type: "DropDown",
        appendClass: "col-sm-4",
        mandatory: true,
        label: {
          text: "Level"
        },
        input: {
          placeholder: "Input xxx ...",
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
        name: "datalistTest",
        type: "datalist",
        appendClass: "col-sm-4",
        mandatory: true,
        label: {
          text: "DataList"
        },
        input: {
          placeholder: "Input xxx ...",
          labelField: "label",
          valueField: "name",
          selection: "multiple",
          loadMoreVisibility: true,
          searchVisibility: true,
          loadMore: function(pageCount, searchText) {
            if (pageCount === 0) {
              return [{
                  name: "1",
                  label: "Level 1"
                },
                {
                  name: "2",
                  label: "Level 2"
                }
              ];
            }

            if (pageCount === 2) {
              return [{
                  name: "3",
                  label: "Level 3"
                },
                {
                  name: "4",
                  label: "Level 4"
                }
              ];
            }

            return [{
                name: "5",
                label: "Level 5"
              },
              {
                name: "6",
                label: "Level 6"
              }
            ];
          }
        }
      }],
      footer: {
        buttons: [{
          name: "save",
          text: "保存",
          appendClass: "btn-primary",
          onClick: function() {}
        }]
      }
    }).on("propertyValueChanged", function(propName, newVal, oldValue) {
      console.log("prop changed")
      console.log(arguments)
      HuoYunWidgets.Controls.Tip.show({
        message: `${propName}: ${newVal}`
      });
    });

    $scope.breadCrumb = new HuoYunWidgets.Controls.BreadCrumb({
      items: [{
        name: "xxx",
        text: "first",
        style: {
          color: "red"
        }
      }, {
        name: "xxx",
        text: "second"
      }, {
        name: "xxx",
        text: "third"
      }]
    }).on("itemClick", function() {
      console.log(arguments)
    });

    $scope.nav = new HuoYunWidgets.Controls.Nav({
      items: [{
        text: "任务大厅"
      }, {
        text: "个人中心",
        visibility: function() {
          return false;
        }
      }, {
        text: "系统设置"
      }, {
        text: "帮助"
      }]
    }).on("itemClick", function() {
      console.log(arguments)
    });

    $scope.sidebar = new HuoYunWidgets.Controls.SideBar({
      items: [{
        text: "任务",
        items: [{
          text: "我的任务"
        }, {
          text: "任务管理",
          selected: true
        }, {
          text: "任务审核"
        }]
      }, {
        text: "视频",
        items: [{
          text: "上传视频"
        }, {
          text: "视频管理"
        }]
      }, {
        text: "用户",
        items: [{
          text: "个人信息"
        }, {
          text: "重设密码"
        }, {
          text: "用户管理"
        }]
      }]
    }).on("itemClick", function() {
      console.log(arguments)
    });
  }


]);