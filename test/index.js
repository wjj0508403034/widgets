angular.module('Demo', ['huoyun.widget']);

angular.module('Demo').config(["displayProvider", function(displayProvider) {
  displayProvider.config({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm"
  });
}]);

angular.module('Demo').controller("DemoController", ["$scope", "Dialog", "Tip", "HuoYunWidgets",
  function($scope, Dialog, Tip, HuoYunWidgets) {

    $scope.table = new HuoYunWidgets.Controls.Table({
      selection: "multiple",
      header: {
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
        }]
      }
    }).setDataSource([{
      id: "x0001",
      firstName: "Jingjing",
      lastName: "Wang"
    }, {
      id: "x0002",
      firstName: "Jingjing2",
      lastName: "Wang2"
    }]);

    $scope.listViewOption = new HuoYunWidgets.ListView({
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

    $scope.formOption = new HuoYunWidgets.Controls.Form({
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
          onClick: function() {
            console.log($scope.formOption)
            console.log($scope.formOption.getData());
            console.log($scope.xxData)
              //$scope.xxData.firstName = "===="
              // $scope.formOption.setData({
              //   email: "xx@sap.com",
              //   firstName: "Jingjingxxx",
              //   lastName: "Wang"
              // });
              //$scope.formOption.readonly = false;
              // $scope.formOption.validator()
              //   .then(function() {

            //   }).catch(function(formGroup) {
            //     formGroup.setError();
            //   });
          }
        }]
      }
    }).on("propertyValueChanged", function() {
      console.log("prop changed")
      console.log(arguments)
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




  }


]);