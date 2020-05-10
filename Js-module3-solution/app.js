(function(){
'use strict';

angular.module("NarrowItDownApp",[])
.controller("NarrowItDownController",NarrowItDownController)
.service("MenuSearchService",MenuSearchService)
.directive("foundItems",FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItems() {
  var ddo = {
      templateUrl: 'Items.html',
      scope: {
        items: '<',
        onRemove: '&',
        error:'<'
      },
    };

    return ddo;
}
    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
    var find = this;
      find.narrowItDown = function(){
        find.found = MenuSearchService.getMatchedMenuItems(find.searchItem);
        find.checkError = function(){
          return MenuSearchService.checkError();
        }
      };
      find.removeItem = function (itemIndex) {
        MenuSearchService.removeItem(itemIndex);
      }
    }

    MenuSearchService.$inject=['$http', 'ApiBasePath'];
    function MenuSearchService($http,ApiBasePath){
      var service = this;
      var found = [];


      service.getMatchedMenuItems  = function (searchTerm) {
      found = [];
        var foundItems = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
    }).then(function(result){
      var lists = result.data["menu_items"];
      for(var i = 0;i < lists.length;i++){
        if(searchTerm!=undefined && searchTerm.trim() !="" && (lists[i].description).toString().includes(searchTerm.toString())){
          found.push(lists[i]);
        }
      }
    }).catch(function (error) {
        console.log("Something went wrong.");
    });

    service.checkError = function(){
      return service.error = (searchTerm === undefined || searchTerm.trim() === "" || found.length === 0) ? true :false;
    }

    return found;
  };
  service.removeItem = function(itemIndex){
    found.splice(itemIndex, 1);
  };
}
})();
