(function () {
  'use strict';

  angular.module('ShoppingListApp', [])
  .controller('ShoppingListController', ShoppingListController)
  .provider('ShoppingListService', ShoppingListServiceProvider)
  .config(Config);

  Config.$inject = ['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider) {
    // Save Yaakov from himself
    ShoppingListServiceProvider.defaults.maxItems = [{name: "lettuce", quantity: 2},
                                                     {name: "foot long bread", quantity: 4},
                                                     {name: "chicken pattie", quantity: 4},
                                                     {name: "cucumber", quantity: 2},
                                                     {name: "ranch bottle", quantity: 1}];
  }

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var list = this;

    list.toBuyItems = ShoppingListService.getToBuyItems();
    list.boughtItems = ShoppingListService.getBoughtItems();

    if (list.boughtItems.length <= 0){
      list.errorMessage2 = "Nothing bought yet.";
    }
    list.removeAndaddToBoughtItems = function (itemIndex) {
      ShoppingListService.removeAndaddToBoughtItems(itemIndex);
      list.toBuyItems = ShoppingListService.getToBuyItems();
      list.boughtItems = ShoppingListService.getBoughtItems();
      if (list.boughtItems.length <= 0){
        list.errorMessage2 = "Nothing bought yet.";
      } else {
          list.errorMessage2  = "";
      }
      if (list.toBuyItems.length <= 0){
        list.errorMessage1 = "Everything bought";
      }
    };
  }


  function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var toBuyItems = maxItems;
  var boughtItems = [];



  service.removeAndaddToBoughtItems = function (itemIndex) {
    var item = {name: toBuyItems[itemIndex].name,
                quantity:toBuyItems[itemIndex].quantity};
                boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
  service.getToBuyItems = function () {
    return toBuyItems;
  };
}

  function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: [{name: "lettuce", quantity: 2},
               {name: "foot long bread", quantity: 4},
               {name: "chicken pattie", quantity: 4},
               {name: "cucumber", quantity: 2},
               {name: "ranch bottle", quantity: 1}]
  };
  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);
    return shoppingList;
  };
}

})();
