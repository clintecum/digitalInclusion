(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$window'];

  function HeaderController($scope, $state, Authentication, menuService, $window) {
    var vm = this;

    // vm.accountMenu = menuService.getMenu('account').items[0];
    vm.homeMenu = menuService.getMenu('home').items[0];
    vm.showHomeMenu = true;
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    // vm.menu = menuService.getMenu('topbar');
    // vm.menu = menuService.getMenu('home');
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);


    $scope.onOff = false;





















    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }


    var headH = angular.element(document.getElementById("headerH1"));
    var headP = angular.element(document.getElementById("headerP"));
    var main  = angular.element(document.getElementById("main"));
    
    // var tabs  = angular.element(document.getElementById("tabset"));
   

    var header = angular.element(document.getElementById("header"));
    
    setTimeout(function() {
        header.removeClass("")
        header.addClass("");
        // header.addClass("pt-page-moveToRightEasing");
    }, 100);


    






  }
}());
