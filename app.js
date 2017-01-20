(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
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

  ToBuyController.$inject = ['ShoppingListService'];
  function ToBuyController(ShoppingListService) {
    var toBuyList = this;
    toBuyList.toBuyItems = ShoppingListService.getToBuyItems();
    toBuyList.removeAndaddToBoughtItems = function (itemIndex) {
      ShoppingListService.removeAndaddToBoughtItems(itemIndex);
      toBuyList.toBuyItems = ShoppingListService.getToBuyItems();
      if (toBuyList.toBuyItems.length <= 0){
        toBuyList.errorMessage1 = "Everything is bought!";
      }
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListService'];
  function AlreadyBoughtController(ShoppingListService) {
    var boughtList = this;
    boughtList.boughtItems = ShoppingListService.getBoughtItems();
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
