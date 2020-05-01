(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.display = function(){
    var lunchItems = $scope.lunchMenu === undefined? "" :($scope.lunchMenu).split(",");
    var emptyCount =0;
    for(var index=0; index<lunchItems.length ;index++){
      if(lunchItems[index].trim()===""){
        emptyCount++;
      }
    }
  var lunchItemsLength =  (lunchItems.length)-emptyCount;
  if(lunchItemsLength === 0){
    $scope.message = "Please enter data first";
    $scope.msgcolor = "red";
  }else if(lunchItemsLength<=3){
    $scope.message = "Enjoy!";
    $scope.msgcolor = "green";
  }else{
    $scope.message = "Too much!";
    $scope.msgcolor = "green";
  }
  }
  }
})();
