(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var item = this;
    item.buyItems = ShoppingListCheckOffService.showItems();
    item.buy = function(index){
      ShoppingListCheckOffService.buy(index);
    }
    item.empty = function(){
        item.emptyBuyMessage = ShoppingListCheckOffService.emptyBuyMessage()
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var item = this;
    item.empty = function(){
      item.emptyBoughtMsg = ShoppingListCheckOffService.emptyBoughtMsg()
    }
    item.boughtItems = ShoppingListCheckOffService.bought();
    }

    function ShoppingListCheckOffService(){
      var service = this;
      var buyItems = [{ name: "cookies", quantity: 10},{ name: "milk", quantity: 3},{ name: "chocolates", quantity: 5},{ name: "pasteries", quantity: 8},{ name: "candies",quantity: 10}];
      var boughtItems=[];
      service.showItems = function(){
        return buyItems;
      }
      service.buy = function(index){
        boughtItems.push(buyItems[index]);
        buyItems.splice(index,1);
        return buyItems;
      }
      service.bought = function(){
        return boughtItems;
      }
      service.emptyBoughtMsg = function(){
        if(boughtItems.length === 0){
          return "Nothing bought yet."
        }
      }
      service.emptyBuyMessage = function(){
        if(buyItems.length === 0 ){
          return "Everything is bought!"
        }
      }
    }
})();
