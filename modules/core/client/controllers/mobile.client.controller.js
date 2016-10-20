(function () {
  'use strict';

  angular
    .module('core')
    .controller('MobileController', MobileController);

  MobileController.$inject = ['$scope', '$window', '$location'];

  function MobileController($scope, $window, $location) {
    var vm = this;

    var appWindow = angular.element($window);
    var w = $window.innerWidth;
    // var desktop = true;
  
    var mHeader = document.getElementById('mobileHeader');
    var dHeader = document.getElementById('desktopHeader');


   

    // if (w < 760) {
    //   header.style.margin = "0 0 10px 0";
    //   header.style.padding = ".5em 0 0 0";
      
    // }

    // if (w < 760 && w >= 640) {
    //   header.style.top = "-6.5em";
    // }

    // if (w < 640) {
    //   header.style.top = "-7.5em";
    // }



    function checkViewMode(width) {
        console.log("onload " + width)
        if (width > 768) {
          dHeader.style.display = "initial";
          mHeader.style.display = "none";
        }
        if (width <= 768) {
          $scope.desktop = false;
          mHeader.style.display = "initial";
          dHeader.style.display = "none";
        }
    }

    
    checkViewMode($window.innerWidth)
    



    function setHeaderCss(width, el) {
        if (width < 760) {
          console.log("s")

        }

     }

    appWindow.bind('resize', function(){
      console.log("resizing => ");
      console.log($window.innerWidth);
      checkViewMode($window.innerWidth);


      


      // var hw = w * .5;
      // console.log(hw);

      // if (w > 768 && w < 990) {
      //   console.log("<<");
      //   header.style.width = "45em";
      // }

      // header.style.width = hw + "px";



    })

    
    
    // var headerWidth = header.getBoundingClientRect().width;


  
    


     














  }



}());
