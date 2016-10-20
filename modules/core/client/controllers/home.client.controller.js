(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['PlacesService', 'spinnerService', '$scope', '$window', '$location'];

  function HomeController(PlacesService, spinnerService, $scope, $window, $location) {
    var vm = this;
    vm.places = PlacesService.query();

    $scope.timeImagePath = '/modules/core/client/img/washedout.png';

    $scope.scrollUp = function($window) {
      // console.log("LLLL");
      $location.path('authentication/signin');
      $window.scrollTo(0,0);

    }
    
    // spinnerService.show('mapSpinner');



     














  }

  angular
    .module('core').config(function($mdThemingProvider) {
      // console.log("plus plus         $mdThemingProvider");
      // console.log($mdThemingProvider);
      var darkBlue =  $mdThemingProvider.theme('dark-blue');
      // console.log("darkBlue");
      // console.log(darkBlue);
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });

  angular
    .module('core').config(['$mdIconProvider', function($mdIconProvider) {
      // console.log("$mdIconProvider");
      // console.log($mdIconProvider);
    $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
  }])
  // console.log("home.client.controller - 1");
}());
