'use strict';
function testIt(){
  angular.element(document).injector().get('cartService').addItem('box');
}


var app = angular.module('shop',[]);

app.service('cartService',  function ($rootScope) {
  var _cart =[ {id:124,name:'pinapple',amount:1,price:12.3},];

  return {
    addItem: function(id) {

      for (var i = _cart.length - 1; i >= 0; i--) {
        if(_cart[i].id === id){
          _cart[i].amount += 1;
          return;
        }
      }

      _cart.push({id:123,name:'apple',amount:1,price:12.3});

      $rootScope.$broadcast('cartChanged', _cart);
    },
    minusItem: function(id){
      console.log('- the id ',id);
         for (var i = _cart.length - 1; i >= 0; i--) {
          if(_cart[i].id === id){
            if(_cart[i].amount>1){
              _cart[i].amount -= 1;
            }else{
              _cart.splice(i,1);
            }
          }
        }
        // return $rootScope.$broadcast('cartChanged', _cart);
    },
    deletItem: function(id){
      for (var i = _cart.length - 1; i >= 0; i--) {
        if(_cart[i].id === id){
            _cart.splice(i,1);
        }
      }
    },
    getItems: function(){
      return _cart;
    },
      getTotalCount :function(){
        var sum = 0 ;
        for (var i = _cart.length - 1; i >= 0; i--) {
          sum += _cart[i].amount;
        }
        return sum;
      },
      getTotalPrice: function(){

        return _cart.map(function(i){
          return i.price*i.amount;
        }).reduce(function(i,sum){
          return sum+i;
        },0);
      }
 };
});

app.controller('shoppingCtrl', function ($scope,$window,cartService){

  console.log('test',cartService.getItems());

  $scope.$on('cartChanged', function(e,cart){
    console.log(new Date(),'cart',cart);
    $scope.$apply(function(){
      console.log("apply end!");
    });
  });

  $scope.cart = cartService;
  console.log( $scope.cart);
});