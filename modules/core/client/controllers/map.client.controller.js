function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}

var list = {};
	list.access = [];
	list.wifi = [];

		
(function () {
	'use strict';

	angular
		.module('core.map')
		.controller('MapController', MapController);
		
	MapController.$inject = ['$scope', '$window', '$timeout', '$http', '$location', 'zipcode', 'PlacesService', 'zcPosition', 'getPlacesService'];

	function MapController($scope, $window, $timeout, $http, $location, zipcode, PlacesService, zcPosition, getPlacesService) {

		
	    var browser = $window.navigator.appCodeName;   
	    var zipcodes = zipcode.getZipcodes();
	    var libertyMemorial = [39.081009, -94.585944];
	    var eighteenthAndVine = [39.091804, -94.562090];
	    $scope.activeSpot = {
	    	marker: null, 
	    	meta: null
	    }

	    $scope.smsFormOpen = false;
	    $scope.toggle = {
	    	wifi: true,
	    	access: false,
	    	training: false,
	    	retail: false
	    }
	    $scope.markers     =  { 
                               wifi: { 
                               		  free: [], 
                               		  customer: [] 
                               		 },
                               computers: 
                               			 { 
                               			  retail: [], 
                               			  access: [] 
                               			 },
                               training: { day    : [], night    : [] }, 
                               isps: []
		                      };
		var data           =  {     
			    			   isps : [],
			                   wifi      : { free  : [], customer: [] },
			                   computers : { retail: [], access  : [] },
			                   training  : { day   : [], night   : [] }
			                  };
 
	    

      $scope.places = [];


	    $scope.mapMarkers = [];
	    $scope.viewportActiveLocations = [];
	    $scope.closest = [];
	    $scope.closestMap = [];

      $scope.showMapControls = false

      $scope.bool = false
      $scope.soActive = false;

      var sidePanelOpen = false;

      var headerToggleId = document.getElementById('headerToggleId');

      
	    var e1                    = angular.element(document.getElementById("e1"));
	    var e2                    = angular.element(document.getElementById("e2"));
	    var e3                    = angular.element(document.getElementById("e3"));
	    var e4                    = angular.element(document.getElementById("e4"));

	    var mapCanvasElement      = document.getElementById("customMap");
	    var sideWindowElement     = document.getElementById("sw");
        var mobileWindowElement   = document.getElementById("wrapMobileWindow");
        var closeWinTag           = document.getElementById('closeWindow');
	    var resultsHtml           = document.getElementById("kv");
	    var iconoriginx           = null;
	    var iconoriginy           = null;
	    var iconSize              = new google.maps.Size(30, 30);
	    var iconAnchor            = new google.maps.Point(15, 30);

	    $scope.browserSupportFlag = false;
	    $scope.lat                = "0";
	    $scope.lng                = "0";
	    $scope.accuracy           = "0";
	    $scope.error              = "";
	    $scope.siteVisitor;
	    $scope.id;
	    $scope.watchOptions;


	    resultsHtml.style.display = "none";



	     var svgW  = angular.element(document.getElementById("svgWrap"));
	     var ngCm  = angular.element(document.getElementById("customMap"));
    

	    setTimeout(function() {
	        svgW.removeClass("vis-off");
	        svgW.addClass("vis-on");
	        $scope.loading = true;
	        // header.addClass("pt-page-moveToRightEasing");
	    }, 100);
    
    	var vm = this;

      // $scope.places = PlacesService.query();


      $scope.places = getPlacesService.getPlaces(function(places) {

              // caption: info.caption
                    // map_icon_label: '<span class="map-icon map-icon-cafe mil-green"></span>'
                    // map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
              
            $scope.places = places;
            // console.log("Places:");
            // console.log(places);
    		sortResponses(places);
        
            // fixPlaceData(places);
        });

      function incrementByOne(int) {
      	return (int + 1);
      }

      var initialCount = 0;
      
      function countPlaces() {
      	
      	
      }

      function fixPlaceData(places) {
      	console.log("Log fixPlaceData(places)");
      	var l = places.length;
      	var i;

      	for (i=0;i<l;i++) {
      		if (places[i].primaryCategory === "training-day" || places[i].primaryCategory === "training-night") {
      			console.log(places[i]._id);
      			console.log(places[i].title);
      		
      			console.log(places[i].hoursOpen);
      		}
      		
      	}
      }

      // var qtyP = $scope.places.length;
      // var e;
      // for (e=0;e<qtyP;e++) {
      // 	sortResponses($scope.places[e]);
      // }
      // .success(function(data) {
      // 	sortResponses(data);
      // }).error(function(err) {
      // 	console.log(err);
      // 	return err;
      // });



    
	      // $scope.places = $http.get('/api/places').success(function(data){
	      //   sortResponses(data);
	      // }).error(function(err) {
	      //   console.log(err);
	      //   return err;
	      // });


      function sortResponses(places) {
        var length = places.length;
        var i;
        for (i = 0; i < length; i++) {
            var place = places[i];
            // console.log(place);
            var category = place.primaryCategory;
            if (category === "computers-access") {
               // list.access.push(place);
               data.computers.access.push(place);
            } else if (category === "training-day") {
               data.training.day.push(place);
            } else if (category === "training-night") {
               data.training.night.push(place);
            } else if (category === "wifi-free") {
               data.wifi.free.push(place);
            } else if (category === "wifi-customer") {
              data.wifi.customer.push(place);
            } else if (category === "computers-retail") {
              data.computers.retail.push(place);
            } else if (category === "isp") {
              data.isps.push(place);
            };
          }

        
      }

$scope.thisBounds;


	setTimeout(function() {

		var a = $scope.markers.wifi.free.length;
		var b = $scope.markers.wifi.customer.length;
		if (a===0) {
			setWifiMarkers();
		}
	}, 5000);



setTimeout(function(){

      svgW.removeClass("vis-off");
      svgW.addClass("vis-on");
      $scope.loading = false;
         var cMap = angular.element(document.getElementById("customMap"));

  cMap.removeClass("vis-off");
  cMap.addClass('vis-on')
}, 2000);


	    function resetToNormal() {
	      var arr = [e1,e2,e3,e4];
	      var i; 
	      var n = arr.length;
	      var elem;
	      for (i=0;i<4;i++) {
	        arr[i].removeClass('special') && arr[i].addClass('normal');
	      }
	    }

	    function clearAll() {
	      clearWifiMarkers(); 
	      clearAccessMarkers();
	      clearTrainingMarkers();
	      clearRetailMarkers();
	    }


      function setButtonState(buttonType) {

      }


      function isStateActive(buttonType) {

      }


      function showZipResultsOnly() {

      }

      function resetToggleState(category) {
      	if (category === "wifi-free" || category === "wifi-customer") {
      		resetCss(e1, true);
      	} else if (category === "computers-retail") {
      		resetCss(e4,true);
      	} else if (category === "computers-access") {
      		resetCss(e3,true);
      	} else if (category === "training-day" || category === "training-night") {
      		resetCss(e2, true);
      	}
      }
	    

	    function callback(data) {


	    console.log("callback(data)");
	    console.log(data);
	      var i;
	      var length = data.length;
	      resetToNormal();
	      for (i = 0; i < length; i++) {
	        var place = data[i];
	        console.log(place);
	        resetToggleState(place.primaryCategory);
          // console.log(place);
	        createMarker(place);
	      }
	    }

	    
      function getAll() {
        var all = [];
        var arr1 = $scope.markers.wifi.free;
        var arr2 = $scope.markers.wifi.customer;
        var arr3 = $scope.markers.training.day;
        var arr4 = $scope.markers.training.night;
        var arr5 = $scope.markers.computers.access;
        var arr6 = $scope.markers.computers.retail;
        all.push(arr1, arr2, arr3, arr4, arr5, arr6);
        return all.reduce(function(prev, curr) {
          return prev.concat(curr);
        });
      }

      function removeAllMapData() {
        var all = getAll();

        var l = all.length;
        var i;
        for (i=0;i<l;i++) {
          var l2 = all[i].length;
          var j;
          for (j=0;j<l2;j++) {
            // $scope.map.setMap()
            // console.log(all[i][j]);
            all[i][j].setMap(null);
          }
        }
      }

      $scope.zoomOut = function() {
        $scope.map.setZoom(13);
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(12);
        }, 200);
      }

      $scope.zoomIn = function() {
        $scope.map.setZoom(14);
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(15);
        }, 100);
      }


      function clearMap() {
      	var a = $scope.markers.wifi.free.length;
      	var b = $scope.markers.wifi.customer.length;
      	console.log(a);
      	console.log(b);
      	var i;
      	var u;

      	for (i=0;i<a;i++) {
      		$scope.markers.wifi.free[i].setMap(null);
      	}
      	for (u=0;u<b;u++) {
      		$scope.markers.wifi.customer[u].setMap(null);
      	}

      }



	    function recenterMap(latlng) {

        // removeAllMapData();
  			// $scope.map.setZoom(13);
        $scope.zoomIn();
  			$scope.map.setCenter(latlng);


	    }

      var mainPageEl = angular.element(document.getElementById("main-page"))[0];

      $scope.setPageHeightNormal = function() {
        mainPageEl.style.height = "638px";
      }


      function setPageHeightLong() {
        mainPageEl.style.height = "683px";
        document.getElementById('wrapper').style.height = "1024px";
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(14);
        }, 500);
      }


      function validZipcode(zc) {
        // var pattern = {};
        console.log("validating zipcode");
        // var zi = parseInt(zc);
        console.log(zc);
        var pattern = new RegExp(/^\d{5}$/);
        if (zc.match(pattern)) {
          return true;
        } else {
          return false;
        }
      }



      var zse = document.getElementById('zipSearchError');
      $scope.zipSearchError = false;



      $scope.closeErrorWindow = function() {
        zse.style.display = "none";
        $scope.zipSearchError = false;
      }



	    $scope.searchByZip = function(zipcode) {
	      resetForm();
	      clearMap();
        	$scope.zipSearchError = false;
	      // console.log(masterZips);
        	var valid = validZipcode(zipcode);
        // console.log("valid?");
        // console.log(valid);

	        if (valid) {
	          var zc = zcPosition.getZcPosition(zipcode);
	          var goTo = new google.maps.LatLng(zc[0], zc[1]);
	          recenterMap(goTo);
	          setPageHeightLong();
	          var body = {zip: zipcode};
	          $http.post('/api/places/query', body).success(function(data) {
	          
	            callback(data);
	          });
	        } else {
	          $scope.zipSearchError = true;
	          zse.style.display = "block";
	          $scope.zipSearchErrorMessage = "Error: Not a valid zipcode";
	          return recenterMap($scope.currentLocation);
	        }

		      // var ll = checkForZip(zipcode);
	        

		  }

		    $scope.place = {
		      zip: ""
		    }

		    function resetForm() {
		      $scope.place.zip = '';
		    };


		    var callMethod = function() {
		       // console.log("search results");
		       // console.log($scope.searchResults);
		    };


		    var counter = 0;
		    function incrementToLimit(num) {
		      // console.log(num + " reaching limit =>" + limit);
		    }

	    

	  


	    function setWifiMarkers() {
	      // console.log("setWifiMarkers");
	      var frLocations = data.wifi.free;
	      var coLocations = data.wifi.customer;
	      var i;
	      var n;
	      var frLength = frLocations.length;
	      var coLength = coLocations.length;
	      for (i=0; i<frLength; i++) {
	        var place = frLocations[i];
	        // console.log(place);
	        createMarker(place);
	        
	      }
	      for (n=0;n<coLength;n++){
	        var place = coLocations[n];
	        createMarker(place);
	      }
	    }

	    $scope.setInitial = function() {
	      setWifiMarkers();
	    }

	    function setTrainingMarkers() {
	      console.log("setTrainingMarkers");
	      var dayLocations = data.training.day;
	      var nightLocations = data.training.night;
	      // console.log(dayLocations);
	      // console.log(nightLocations);
	      var i;
	      var n;
	      var dayLength=dayLocations.length;
	      var nightLength = nightLocations.length;
	      for (i=0;i<dayLength;i++){
	        var place = dayLocations[i];
	        createMarker(place);
	      }
	      for (n=0;n<nightLength;n++){
	        var place = nightLocations[n];
	        createMarker(place);
	      }
	    }

	    function setAccessMarkers(){
	      var locations = data.computers.access;
	      var i;
	      var length = locations.length;
	      for (i=0;i<length;i++){
	        var place = locations[i];
	        createMarker(place);
	      }
	    }

	    function setRetailMarkers(){
	      var locations = data.computers.retail;
	      var i;
	      var length = locations.length;
	      for (i=0;i<length;i++){
	        var place = locations[i];
	        createMarker(place);
	      }
	    }



	    function getIcon(category) {
	      if (category === "computers-access") {
	       // return "modules/core/client/img/computerAccess.png";
         return "modules/core/client/img/computerAccess.png";
	      } else if (category === "training-day") {
	       return "modules/core/client/img/userOrange.png";
	      } else if (category === "training-night") {
	       return "modules/core/client/img/userBlue.png";
	      } else if (category === "wifi-free") {
          return "modules/core/client/img/wifi-free-2.svg";
	       // return "modules/core/client/img/wifiFree-2.png";
	      } else if (category === "wifi-customer") {
          return "modules/core/client/img/wifi-purchase.svg";
	       // return "modules/core/client/img/wifiCustomerOnly.png";
	      } else if (category === "computers-retail") {
	       return "modules/core/client/img/computerRetail.png";
	      } else if (category === "isp") {
	       return "modules/core/client/img/internetService.png";
	      };
	    }

	    function formatString(str) {
	    	var obj = str.replace(/ /g, "+");
	    	console.log(obj);
	    	return obj;
	    }

	 

	    $scope.steps = [];
	    var directions = [];

	    var stores = [];


var panel = angular.element(document.getElementById("directions-panel"));

var mapVeil = angular.element(document.getElementById("map-veil"));



var mSo = angular.element(document.getElementById('mobServiceOverlay'));
mSo = mSo[0];
mSo.style.display="none";



		// function addBounce 
		function toggleBounce() {
		  if (marker.getAnimation() !== null) {
		    marker.setAnimation(null);
		  } else {
		    // marker.setAnimation(google.maps.Animation.BOUNCE);
		  }
		}

		var markerIndex = {};

		function setActive(marker, latLng, category) {
	      $scope.map.setZoom(14);
	      setTimeout(function() {

	            $scope.map.setZoom(16);
	       }, 150);
	      setTimeout(function() {
	           
	            $scope.map.setZoom(17);
	       }, 150);
	      setTimeout(function() {

	            $scope.map.setZoom(18);
	       }, 150);



			var color = getColor(category);
			// $scope.activeSpot;
			// $scope.activeSpot = new google.maps.Marker({
			// 					    position: latLng,
			// 					    icon: {
			// 					      path: google.maps.SymbolPath.CIRCLE,
			// 					      scale: 13, 
			// 					      anchor: new google.maps.Point(.4, 1.6),
			// 					      strokeColor: color,
			// 					      strokeWeight: 1.5
			// 	  			       },
			// 	          		    map: $scope.map
			// 				 	   })
			if (category === "computers-access") {
				var scaleN = 15;
			} else if (category === "computers-retail") {
				var scaleN = 14;
			}
			 else {
				var scaleN = 13;
			}
			$scope.activeSpot = {
				marker: new google.maps.Marker({
								    position: latLng,
								    icon: {
								      path: google.maps.SymbolPath.CIRCLE,
								      scale: scaleN, 
								      anchor: new google.maps.Point(.4, 1.6),
								      strokeColor: color,
								      strokeWeight: 1.5
				  			       },
				          		    map: $scope.map
							 	   }),
				meta: {
					primaryCategory: category
				}
			} 
			// $scope.activeSpotMeta = {};
			// $scope.activeSpot = spot;
	


		}

		function removeMarker(marker) {
			marker.setMap(null);
		}

		function setInactiveListener(marker) {

		}

		function findActive() {
			if ($scope.activeSpot.marker == null) {
				
			} else {
				$scope.activeSpot.marker.setMap(null);
			}
			
		}

		function markAsBouncing(marker) {
			$scope.bouncingMarker = marker;
		}

		function removeBouncing() {
			if ($scope.bouncingMarker == null) {

			} else {
				$scope.bouncingMarker.setAnimation(null);
			}
			
		}


		function sortByProximity(position) {
			var currentPos = position;
			// console.log("sortByProximity");
			// console.log(currentPos);
		}



		function recenterToMarker() {

			var center = $scope.bouncingMarker.getPosition();
			 $scope.map.setZoom(16);
			    $scope.map.setCenter(center);

			// marker.addListener('click', function() {
			   
			// })
		}






		function getColor(str) {
			if (str === "wifi-free") {
	    		return "green";
	    	} else if (str === "wifi-customer") {
	    		return "#000000";
	    	} else if (str === "computers-access") {
 				return "#000000";
	    	} else if (str === "computers-retail") {
	    		return "#000000"
	    	} else if (str === "training-day") {
	    		return "#b37503";
	    	} else if (str === "training-night") {
	    		return "blue";
	    	} else if (str === "isp") {
	    		return "firebrick";
	    	}
		}

		function togglePulse(marker) {
			console.log("toggle pulse");

			 var contentString = '<div id="content">'+ 'hi</div>';

	        var infowindow = new google.maps.InfoWindow({
	          content: contentString,
	          maxWidth: 200
	        });

	
	        infowindow.open($scope.map, marker);

	        google.maps.event.addListener(marker, 'mouseout', function() {
			    infowindow.close();
			});
 

	    }


		function addHoverListener(json, marker) {
			// marker.addListener('mousover', togglePulse);

			google.maps.event.addListener(marker, 'mouseover', function() {
					togglePulse(marker);
			})


		}

	$scope.swImagePath = "/modules/core/client/img/wifi-free.svg";

    $scope.mobileWindowOpen = false;
    var innerWidth = $window.innerWidth;
    var winWrapper = angular.element(document.getElementById("pseudoWrapWindow"));
    // console.log("CHECK FOR MOBILE WIDTH");
    // console.log(innerWidth);


    $scope.closeMobileWindow = function() {
      html.style.overflowY = 'visible';
      headerToggleId.style.display = "initial";
      mobileWindowElement.style.display = "none";
    }


    function getCurrentWidth() {
      // console.log("getCurrentWidth");
      // console.log($window.innerWidth);
      return $window.innerWidth;
    }


    $scope.sms = { to: ''};
    $scope.smsFormError = false;

    function validateSmsInput(input) {
    	return true;
    }

    $scope.smsResponse = false;

    function handleSmsResponse(res) {
    	console.log(res);
    	if (res === 'Sent') {
    		$scope.smsResponse = true;
    		$scope.sms.to = '';
    		$scope.sms.responseStatus = res;
    		document.getElementById('share-window').style.display="none";
    	}
    }

    function postSms(body) {
    	$http.post('/sms', body).success(function(res) {
          
            handleSmsResponse(res.message);
         });
    }



    $scope.onSwipeLeft = function(ev) {
      alert('You swiped left!!');
    };
    $scope.onSwipeRight = function(ev) {
      alert('You swiped right!!');
    };

    $scope.onSwipeDown = function(ev) {
      alert('You swiped down!!');
    };


















    $scope.setSmsSettings = function(phoneNumber) {
    	

    	var title = document.getElementById('title-mob');
 
    	var text = title.innerText;

    	var valid = validateSmsInput(phoneNumber);
    	if (valid) {
    		var body = {to: phoneNumber, content: text};

    		postSms(body);
    	}
    	// this.sms.to = phoneNumber;
    }
    // $scope.sms.to;

    $scope.openSmsForm = function() {
  
    	$scope.smsFormOpen = true;
    }

    var cm = document.getElementById('customMap');
    var clone = cm.cloneNode(true);
    var cyClone = cm.cloneNode(true);

    $scope.closeSmsForm = function() {

    	$scope.smsFormOpen = false;
    }

    $scope.resetIwIcon = function() {
    	$scope.showImgFw = false;
	    $scope.showImgCw = false;
	    $scope.showImgDt = false;
	    $scope.showImgNt = false;
	    $scope.showImgCr = false;
	    $scope.showImgCa = false;
    }

    function fixDescriptionHeight(str) {
		var html = document.getElementById('placeDescription');
        var len = str.length;

        if (len >= 280) {
        	// console.log("description too long");
        	html.style.maxHeight = "180px";
        	html.style.overflowY = "scroll";
        } else if (len < 280) {
        	// console.log("short description");
        	html.style.overflowY = "hidden";
        }
    }

    function setIconLeftValue(category) {
    	
    	var width = getCurrentWidth();
    	var icon = document.getElementById('imgPath');
    	var text = document.getElementById('placeCategory');
    	var i = icon.style.left;
    	var t = text.style.left;

    	console.log("set " + category + " icon at " + width);
    	
    	if (width <= 768) {

        } else if (width > 768 && width < 1000) {
        	text.style.top = "-2.5em";
        	if (category === "wifi-customer") {
        		text.style.left = "5.9em";
        		icon.style.width = "6%";
        		icon.style.left = "-2.5em";
        		icon.style.top = ".01em";
        	} else if (category === "wifi-free") {
        		text.style.left = "6.5em";
        		icon.style.width = "6%";
        		icon.style.left = "-2.1em";
        		icon.style.top = ".01em";
        		
        	} else if (category === "training-day") {
        		text.style.left = "4.5em";
        		icon.style.width = "6%";
        		icon.style.left = "-3.35em";
        		icon.style.top = ".1em";
        	} else if (category === "training-night") {
        		text.style.left = "4.5em";
        		icon.style.width = "6%";
        		icon.style.left = "-3.35em";
        		icon.style.top = ".1em";

        	} else if (category === "computers-retail") {
        		text.style.left = ".85em";
        		icon.style.width = "5%";
        		icon.style.left = "-5.5em";
        		icon.style.top = ".1em";

        	} else if (category === "computers-access") {
        		text.style.left = "5em";
        		icon.style.width = "5%";
        		icon.style.left = "-3.35em";
        		icon.style.top = ".1em";
        		
        	}
        // } else if (width > 768 && width < 1000) {
        	
        } else if (width >= 1000 && width < 1200) {
        	console.log(">>>>>>")
        	text.style.top = "-5.5em";
        	if (category === "wifi-customer") {
        		// console.log("width >= 1680 : wifi-customer");
        		console.log("width >= 1000 : wifi-customer");
        		text.style.left = "6.5em";
        		icon.style.width = "4%";
        		icon.style.left = "1.2em";
        		icon.style.top = "-.335em";
        	} else if (category === "wifi-free") {
        		console.log("width >= 1000 : wifi-free");
        		text.style.left = "7.5em";
        		// text.style.top = "2.1em";
        		icon.style.width = "4%";
        		icon.style.left = "1.85em";
        		icon.style.top = "-.335em";
        	} else if (category === "training-day") {

        	} else if (category === "training-night") {

        	} else if (category === "computers-retail") {
        		icon.style.width = "4%";
        		icon.style.left = "-.15em";
        		text.style.left = "4.25em";
        		icon.style.top = "-0.275em";

        	} else if (category === "computers-access") {
        		icon.style.width = "4%";
        		text.style.left = "6.25em";
        		icon.style.left = ".5em";
        		icon.style.top = "-.25em";
        	}
        // } else if (width >= 1000 && width < 1200) {
        	
        } else if (width >= 1200 && width < 1280) {
        	text.style.top = "-5.5em";
        	if (category === "wifi-customer") {
        		console.log("width >= 1200 : wifi-customer");
        		text.style.left = "6.5em";
        		icon.style.width = "4%";
        		icon.style.left = "1.2em";
        		icon.style.top = "-.335em";
        	} else if (category === "wifi-free") {
        		console.log("width >= 1200 : wifi-free");
        		text.style.left = "7.5em";
        		
        		icon.style.width = "4%";
        		icon.style.left = "1.85em";
        		icon.style.top = "-.3em";
        	} else if (category === "training-day") {

        	} else if (category === "training-night") {

        	} else if (category === "computers-retail") {
        		icon.style.width = "4%";
        		icon.style.left = "-.15em";
        		text.style.left = "4.25em";
        		icon.style.top = "-0.275em";

        	} else if (category === "computers-access") {
        		
        	}
        // } else if (width >= 1200 && width < 1280) {
        	
        } else if (width >= 1280 && width < 1660) {
        	text.style.top = "2.6em";
        	if (category === "wifi-customer") {
        		console.log("width >= 1280 : wifi-customer");
        		text.style.left = "5.95em";
        		
        		icon.style.left = "1.65em";
        		icon.style.width = "5%";
        		icon.style.top = "-.38em";
        	} else if (category === "wifi-free") {
        		console.log("width >= 1280 : wifi-free");
        		text.style.left = "6.5em";
        		// text.style.top = "2.1em";
        		icon.style.width = "5%";
        		icon.style.left = "1.85em";
        		icon.style.top = "-.38em";
        	} else if (category === "training-day") {
        		console.log("width >= 1280 : training-day");
        		text.style.left = "5.7em";
        		// text.style.top = "1.9em";
        		icon.style.left = "1.35em";
        		icon.style.top = "-.3em";
        		icon.style.width = "5%";
        	} else if (category === "training-night") {
        		console.log("width >= 1280 : training-night");
        		text.style.left = "5.5em";
        		// text.style.top = "1.9em";
        		icon.style.width = "5%";
        		icon.style.left = "1.35em";
        		icon.style.top = "-.3em";
        	} else if (category === "computers-retail") {
        		console.log("width >= 1280 : computers-retail");
        		text.style.left = "3em";
        		// text.style.top = "1.95em";
        		icon.style.width = "4.25%";
        		icon.style.left = ".1em";
        		icon.style.top = "-.31em";
        	} else if (category === "computers-access") {
        		console.log("width >= 1280 : computers-access");
        		text.style.left = "5.2em";
        		// text.style.top = "2.15em";
        		icon.style.left = "1.05em";
        		icon.style.top = "-.3em";
        		icon.style.width = "4.25%";
        	}
        // } else if (width >= 1280 && width < 1660) {
        	
        } else if (width >= 1660 && width < 1680) {
        	text.style.top = "2.65em";
        	if (category === "wifi-customer") {
        		console.log("width >= 1660 : wifi-customer");
        		text.style.left = "5.75em";
        		// text.style.top = "2.65em";
        		icon.style.left = "1.35em";
        		icon.style.width = "5%";
        		icon.style.top = "-.325em";
        	} else if (category === "wifi-free") {
      			console.log("width >= 1660 : wifi-free");
      			text.style.left = "7.5em";
        		// text.style.top = "2.65em";
        		icon.style.width = "5%";
        		icon.style.left = "2.3em";
        		icon.style.top = "-.35em";  		
        	} else if (category === "training-day") {
        		console.log("width >= 1660 : training-day");
        		text.style.left = "6em";
        		// text.style.top = "1.9em";
        		icon.style.left = "1.35em";
        		icon.style.top = "-0.25em";
        		icon.style.width = "5%";	
        	} else if (category === "training-night") {
        		console.log("width >= 1660 : training-night");
        		text.style.left = "6em";
        		// text.style.top = "1.9em";
        		icon.style.width = "5%";
        		icon.style.left = "1.35em";
        		icon.style.top = "-0.25em";
        	} else if (category === "computers-retail") {
        		console.log("width >= 1660 : computers-retail");
        		text.style.left = "3.5em";
        		// text.style.top = "1.95em";
        		icon.style.width = "4.25%";
        		icon.style.left = ".1em";
        		icon.style.top = "-.28em";
        	} else if (category === "computers-access") {
       			console.log("width >= 1660 : computers-access");
       			text.style.left = "5.5em";
        		
        		icon.style.left = "1.05em";
        		icon.style.top = "-.3em";
        		icon.style.width = "4.25%";
        	}
        // } else if (width >= 1660 && width < 1680) {
        	
        } else if (width >= 1680) {
        	text.style.top = "2em";
        	if (category === "wifi-customer") {
        		console.log("width >= 1680 : wifi-customer");
        		text.style.left = "6.5em";
        		// text.style.top = "2em";
        		icon.style.left = "1.35em";
        		icon.style.width = "5%";
        		icon.style.top = "-.425em";
        	} else if (category === "wifi-free") {
        		console.log("width >= 1680 : wifi-free");
        		text.style.left = "7.5em";
        		
        		icon.style.width = "5%";
        		icon.style.left = "1.85em";
        		icon.style.top = "-.425em";
        	} else if (category === "training-day") {
        		console.log("width >= 1680 : training-day");
        		text.style.left = "6.5em";
        		// text.style.top = "1.9em";
        		icon.style.left = "1.35em";
        		icon.style.top = "-.425em";
        		icon.style.width = "5%";
        	} else if (category === "training-night") {
        		console.log("width >= 1680 : training-night");
        		text.style.left = "6.5em";
        		// text.style.top = "1.9em";
        		icon.style.width = "5%";
        		icon.style.left = "1.35em";
        		icon.style.top = "-.425em";
        	} else if (category === "computers-retail") {
        		console.log("width >= 1680 : computers-retail");
        		text.style.left = "3.5em";
        		// text.style.top = "1.95em";
        		icon.style.width = "4.25%";
        		icon.style.left = ".1em";
        		icon.style.top = "-.375em";

        	} else if (category === "computers-access") {
        		console.log("width >= 1680 : computers-access");
        		text.style.left = "6em";
        		// text.style.top = "2.15em";
        		icon.style.left = "1.05em";
        		icon.style.top = "-.3em";
        		icon.style.width = "4.25%";
        	}
        }

    }

    function setPlaceData(json) {

		// console.log("setPlaceData");
		// console.log(json);
        var imgPath = document.getElementById('imgPath');
        var hrs = json.hoursOpen[0];
			setHours(hrs);
        $scope.undefined = {};
        var urlTag = document.getElementById('placeUrl');
            
        document.getElementById('placeAddress').innerText = json.readableAddress;
             // document.getElementById('placeCity').innerText = json.city;
             // document.getElementById('placeState').innerText = json.state;
             
      if (typeof json.primaryCategory != 'undefined') {
      		var pc = json.primaryCategory;
      		var iconPath = "/modules/client/core/img/win/" + json.primaryCategory + ".png";
      		var path = getIcon(json.primaryCategory);
      		imgPath.src = path;
      		setIconLeftValue(json.primaryCategory);
            document.getElementById('placeCategory').innerText = categoryIconText(json.primaryCategory);
      }
      if (typeof json.title != 'undefined') {
        document.getElementById('placeTitle').innerText = json.title;
      }
      if (typeof json.zip != "undefined") {
        // document.getElementById('placeZip').innerText = json.zip;           
      }
      if (typeof json.url != "undefined") {
      	// console.log("tf");
      	// urlTag.href = "http://" + json.url;
      	// urlTag.innerText = json.url;
      	// console.log(urlTag);
        // document.getElementById('placeZip').innerText = json.zip;           
      }
      // if (typeof json.hoursOpen != "undefined") {
      //   document.getElementById('placeHours').innerText = json.hoursOpen;
      // }
      
      if (typeof json.phone != "undefined") {
        document.getElementById('placePhone').innerText = json.phone;              
      } 

     document.getElementById('placeDescription').innerText = setDescription(json.description);
     var addrStr = json.readableAddress;

     var base = "https://www.google.com/maps/dir//";
     var current;
     var destination = addressToUrlString(addrStr);
     var coords = "/@" + json.location[0].lat + "+" + json.location[0].lng + "/";
     var url = base + destination + coords;
     // console.log(url);
     var anchorTag = document.getElementById('map-directions');
     var mobAnchorTag = document.getElementById('mob-map-directions');
     anchorTag.href=url;
     mobAnchorTag.href = url;
     // console.log(anchorTag);
      // /4928+Main+Street,+Kansas+City,+MO+64112/@39.0374,-94.5875,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x87c0efbc1225668b:0x1bbd092f4ee9f253!2m2!1d-94.5874594!2d39.0373724

            // el.primaryCategory.innerText = categoryIconText(json.primaryCategory);
            // el.title.innerText = json.title;
    }

    function setDescription(str) {
    	var test = "Courses on computer basics";
    	console.log("setDescription:" + test.length);
    
    	var strLng = str.length;

      if (strLng < 1) {
      		document.getElementById('dscHead').style.display = "none";
      		document.getElementById('placeDescription').style.display = "none";
      		// document.getElementById('placeDescription').style.textAlign = "center";
      		// document.getElementById('placeDescription').style.overflowY = "hidden";
    		// return "Not available";
        // document.getElementById('placeDescription').innerText = str + "??";
      } else if (strLng >= 1) {
      	fixDescriptionHeight(str);

      	document.getElementById('placeDescription').style.textAlign = "left";
      	return str;
      }
    }





    function addressToUrlString(str) {
      // console.log("addressToUrlString");
      // console.log(str);
      return str.replace(/\s/g, '+');
      // console.log(string);
    }

    




      function showPm(position) {
			// console.log("showPm");
			// console.log(position);
			// var latLng = [position[0], position[1]];

	      	var pmOptions = {
	        	center: {lat: parseFloat(position[0]), lng: parseFloat(position[1])},
	        	zoom: 18,
	        	disableDefaultUI: true,
	        	mapTypeId: google.maps.MapTypeId.ROADMAP
	      	};

	      	$scope.printableMap = new google.maps.Map(document.getElementById('printableMap'), pmOptions);

	      	var marker = new google.maps.Marker({
		        position: new google.maps.LatLng(position[0], position[1]),
		        map: $scope.printableMap
		    });



		}






    $scope.pmArray = [];

    function buildKeyValue(json) {
    	var latLng = [json.location[0].lat, json.location[0].lng];
    	return {id: json._id, position: latLng};
    }

    function setPrintWindow(json) {
    	// console.log(json);
    	// var kv = buildKeyValue(json);
    	// $scope.pmArray.push(kv);
    	var latLng = [json.location[0].lat, json.location[0].lng];
    	showPm(latLng);
    	// console.log(latLng);
    	// console.log(latLng.lat);
    	// $scope.pmLatLng = [latLng.lat, latLng.lng];
    	// $scope.pmPosition = json.
	    document.getElementById('address-print').innerText = json.address1;
	    document.getElementById('city-print').innerText = json.city;
	    document.getElementById('state-print').innerText = json.state;
	         
	    if (typeof json.primaryCategory != 'undefined') {
	      document.getElementById('primaryCategory-print').innerText = categoryIconText(json.primaryCategory);
	    }
	    if (typeof json.title != 'undefined') {
	      document.getElementById('title-print').innerText = json.title;
	    }
	    if (typeof json.zip != "undefined") {
	      document.getElementById('zip-print').innerText = json.zip;           
	    }
	    if (typeof json.hours != "undefined") {
	      document.getElementById('hours-print').innerText = json.hours;
	    }
	    if (typeof json.description != "undefined") {
	      document.getElementById('description-print').innerText = json.description;
	    }
	    if (typeof json.phone != "undefined") {
	      document.getElementById('phone-print').innerText = json.phone;              
	    }
	  }

	  // <a href="tel:+16085551212">Phone me!</a>

	  function regexCleanNumber(num) {
	  	return num.replace(/[^0-9]+/g, '');
	  }

	  function formatClickable(phoneNumber) {
	
	  	var a = "tel:+1";



	  	var b = regexCleanNumber(phoneNumber);
	  	// var c = 

	  
	  	return (a + b);
	  }









	  function setOverlayData(json) {
	  	// console.log("setOverlayData");
	  	// console.log(formatClickable(json.phone));
	  	var href = formatClickable(json.phone);
	  	document.getElementById('soPhone').href = href;
	  	document.getElementById('soHours').innerText = json.hoursOpen;
	  	document.getElementById('soCategoryPrime').innerText = categoryIconText(json.primaryCategory);
	  	 // = json.primaryCategory;
	  	document.getElementById('soAddress').innerText = json.readableAddress; 
	  	document.getElementById('soTitle').innerText = json.title;
	  	document.getElementById('soPhone').innerText = json.phone;
	  	// document.getElementById('').innerText = json.state; 
	  	// document.getElementById('').innerText = json. 
	  }

      function setMobileInfoWindowData(json) {
        document.getElementById('address-mob').innerText = json.address1;
        document.getElementById('city-mob').innerText = json.city;
        document.getElementById('state-mob').innerText = json.state;
        var hrsMob = document.getElementById('hours-mobily');
        var html = document.getElementById('html');
      
        // hrsMob.innerText=json.hours;
             
        if (typeof json.primaryCategory != 'undefined') {
          document.getElementById('primaryCategory-mob').innerText = categoryIconText(json.primaryCategory);
        }
        if (typeof json.title != 'undefined') {
          document.getElementById('title-mob').innerText = json.title;
        }
        if (typeof json.zip != "undefined") {
          document.getElementById('zip-mob').innerText = json.zip;           
        }
        if (typeof json.hoursOpen != "undefined") {
          
          hrsMob.innerText = json.hoursOpen;
         
        }
        if (typeof json.description != "undefined") {
          document.getElementById('description-mob').innerText = json.description;
        }
        if (typeof json.phone != "undefined") {
        	var hrefNum = formatClickable(json.phone);

        	document.getElementById('phone-mob').href = hrefNum;
            document.getElementById('phone-mob').innerText = json.phone;              
        }
      }

      function moveUp(el, em) {

      	var n = "-" + em + "em";
      	el.style.top = n;
      }

      $scope.cmTopSetting;

      function stretchMap() {



      	cm.style.top = "-28em";

      function resetMapHeight(w) {
      	// if ()
      }

      	// ngCm.addClass("neg24");
      	// cm.addClass("neg24");
      	// cm.style.top = "-24em";
      	// cm.style.height = "1200px";
      }
      $scope.resetCustomMap = function() {
      	// cm.style.top = "-4.6em";
      }

      var mobilePhoneTag = document.getElementById('phone-mob');
      var setToClickable = function() {

      }


   


		function setRequestParams(json) {
	  		console.log("setRequestParams");
	  		console.log(json);
	  		return {
	  			location: [json.location[0].lat, json.location[0].lng],
	  			radius: 10000
	  		}
	  	}

	  	function psCallback(res) {
	  		console.log("psCalback");
	  		console.log(res);
	  	}

// $http.post('/api/places/query', body).success(function(data) {
          
//             callback(data);
//           });
// https://maps.googleapis.com/maps/api/place/textsearch/output?parameters
	  	function manualSearch(params) {
	  		// var a = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=";
	  		
	  		var a = "https://maps.googleapis.com/maps/api/place/nearbysearch/";
	  		var b = "&location=" + params.location[0] + "," + params.location[1];
	  		var c = "&radius=" + params.radius + "&";
	  		var d;
	  		var e = "key=AIzaSyCC-reO4jDrH1PqVkRX7qp5t4PQMWoBmls";
	  		var url = a + b + c + e;
	  		console.log("url");
	  		console.log(url);
	  		$http.get(url).success(function(response) {
	  			// console.log("looky here");
	  			// console.log(response.statusCode);
	  			psCallback(response);

	  		})
	  		// $http.g
	  	}
	  	// https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=5000&type=museum&key=YOUR_API_KEY
	  	// https://maps.googleapis.com/maps/api/place/radarsearch/json?location=39.0349374,-94.5835498&radius=1000&key=AIzaSyBqZ_zfcyUUJDi6OuXq4QYpkdHPeaqFkms



	  	function stripDay(day, str) {
	    	// return day.replace(/day/)
	    	
	    	if (day === "sunday") {
	    		return str.replace(/Sunday/, "");
	    		// return str.replace(/Sunday\s/, "");
	    	} else if (day === "monday") {
	    		return str.replace(/Monday/, "");
	    	} else if (day === "tuesday") {
	    		return str.replace(/Tuesday/, "");
	    	} else if (day === "wednesday") {
	    		return str.replace(/Wednesday/, "");
	    	} else if (day === "thursday") {
	    		return str.replace(/Thursday/, "");
	    	} else if (day === "friday") {
	    		return str.replace(/Friday/, "");
	    	} else if (day === "saturday") {
	    		return str.replace(/Saturday/, "");
	    	}
	    }

	    function rws(str) {
	    	return str.replace(/\s/, "");
	    }
	    function removeColon(str) {
	    	// console.log("removeColon");
	    	// console.log(str);
	    	return str.replace(/^(:)/, "");
	    }


	    function getHoursOpen() {

	    }

	    function setHours(hrs) {
	    	// console.log("setHours");
	    	// console.log(hrs);

	    	

	    	if (typeof hrs === "undefined") {
	    		// console.log("undefined");
	    		var num = 0;
	    	} else {
	    		var num = hrs.length;
	    	}


	    	// console.log("numb");
	    	// console.log(num);

	    	if (num === 0) {
	    		document.getElementById('opHours').style.display = "none";
	    		document.getElementById('hrsHead').style.display = "none";
	         	document.getElementById('opHoursNA').style.display = "none";
	    	} else if (num >=1) {
	    		// console.log("num >= 1");
	    		// console.log(hrs);


		    	var hypSun = document.getElementById('opSun');
		        var hypMon = document.getElementById('opMon');
		        var hypTue = document.getElementById('opTue');
		        var hypWed = document.getElementById('opWed');
		        var hypThu = document.getElementById('opThu');
		        var hypFri = document.getElementById('opFri');
		        var hypSat = document.getElementById('opSat');

var sunday = new RegExp(/Sunday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);
var monday = new RegExp(/Monday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);
var tuesday = new RegExp(/Tuesday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);
var wednesday = new RegExp(/Wednesday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);
var thursday = new RegExp(/Thursday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);
var friday = new RegExp(/Friday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);
var saturday = new RegExp(/Saturday(:\sClosed|\sClosed|\s(\d|\d\d)AM.(\d|\d\d)PM|:\s(\d|\d\d):(\d\d).(\d|\d\d):(\d\d)|\s(\d|\d\d):(\d\d)AM.(\d|\d\d):(\d\d)PM|:\s(\d)AM.(\d)PM|\s(\d|\d\d):(\d\d)PM.(\d|\d\d):(\d\d)PM)/);

		         // if (typeof hrs != "undefined") {
		        document.getElementById('opHours').style.display = "block";
		        document.getElementById('opHoursNA').style.display = "none";
		        var sun = hrs.match(sunday);
			    var mon = hrs.match(monday);
			    var tue = hrs.match(tuesday);
			    var wed = hrs.match(wednesday);
			    var thu = hrs.match(thursday);
			    var fri = hrs.match(friday);
			    var sat = hrs.match(saturday);
			           // console.log('sun');
			           // console.log(sun);

			           if (sun != null) {
			           	var weekHours = {
				           	sun: rws(stripDay('sunday', sun[0])), 
				           	mon: rws(stripDay('monday', mon[0])),
				           	tue: rws(stripDay('tuesday', tue[0])),
				           	wed: rws(stripDay('wednesday', wed[0])),
				           	thu: rws(stripDay('thursday', thu[0])),
				           	fri: rws(stripDay('friday', fri[0])),
				           	sat: rws(stripDay('saturday', sat[0]))
				           }
			           } else {
			     //       	console.log("sun === null");
			     //       	console.log()
			     //       	console.log("places");
					   // console.log(places);
					   // console.log("$scope.places");
					   // console.log($scope.places);
			           }
			           
			           // console.log("before");
			           // console.log(weekHours);

			           var wt = removeColon(weekHours.sun);
			     //       console.log("removeColon(weekHours.sun");
					   // console.log(wt);

			           hypSun.style.display = "inline";
			           hypMon.style.display = "inline";
			           hypTue.style.display = "inline";
			           hypWed.style.display = "inline";
			           hypThu.style.display = "inline";
			           hypFri.style.display = "inline";
			           hypSat.style.display = "inline";
			           hypSun.innerText = removeColon(weekHours.sun);
			           hypMon.innerText = removeColon(weekHours.mon);
			           hypTue.innerText = removeColon(weekHours.tue);
			           hypWed.innerText = removeColon(weekHours.wed);
			           hypThu.innerText =removeColon(weekHours.thu);
			           hypFri.innerText = removeColon(weekHours.fri);
			           hypSat.innerText = removeColon(weekHours.sat);

		         // } 

		         // else if (typeof hrs === "undefined") {
		
		         // 	document.getElementById('opHours').style.display = "none";
		         // 	document.getElementById('opHoursNA').style.display = "block";
		         // } 

	         }

	    }

	    function setPanelView() {
	   	
	  
		  
		   	var mapHeight = document.querySelector("#customMap").clientHeight;
		   	// var val = (maxHeight - 60) + "px";
		  

		   	var wrapper = document.querySelector("#windowWrapper");

		   	var subvalue = (mapHeight - 40) + "px";
		   	// wrapper.style.height = subvalue;

		   	// document.querySelector('#lavie').style.maxHeight = val;

		   	// document.querySelector('#lavie').style.height = maxHeight;

		   	// var lvHeight = document.querySelector("#lavie").clientHeight;
		   	var panel = document.getElementById("lavie");
		   	var panelHeight = document.querySelector('#lavie').getBoundingClientRect().height;
		   
		   	panel.style.maxHeight  = (mapHeight + "px");
		   	panel.style.minHeight = (mapHeight + "px");
		   	panel.style.height = (mapHeight + "px");
		   	var resizedHeight = document.querySelector('#lavie').getBoundingClientRect().height;
		   	


		   	// var a = getCurrentWidth();
		   	// var b = document.querySelector("#customMap").getBoundingClientRect().height;
		   	// var c = document.querySelector('#lavie').getBoundingClientRect().height;
		   
		   	// var val2 = (c - 8) + "px";
		  
		   	// var ww = document.querySelector("#windowWrapper");
	
		   	// var wwh = ww.clientHeight;
	
		   	// var d = (b - c);
		   	// var e = (d / 2);
		 
		   	
		   	// document.querySelector('#lavie').style.top = e + "px";
		   	// document.querySelector('#rmv-glyph').style.top = e + "px";







	   }


	   function setWindowCss() {
	   	
	  
	   	console.log("setWindowCss");
	   	var maxHeight = document.querySelector("#customMap").clientHeight;
	   	var val = (maxHeight - 60) + "px";
	   	console.log("maxHeight val");
	   	console.log(val);

	   	document.querySelector('#lavie').style.maxHeight = val;

	   	// document.querySelector('#lavie').style.height = maxHeight;

	   	var lvHeight = document.querySelector("#lavie").clientHeight;
	   	console.log("lavie height");
	   	console.log(lvHeight);
	   	var a = getCurrentWidth();
	   	var b = document.querySelector("#customMap").getBoundingClientRect().height;
	   	var c = document.querySelector('#lavie').getBoundingClientRect().height;
	   	// console.log("b");
	   	// console.log(b);
	   	// console.log(b);
	   	console.log('c');
	   	console.log(c);
	   	var val2 = (c - 8) + "px";
	   	console.log("val2");
	   	console.log(val2);
	   	var ww = document.querySelector("#windowWrapper");
	   	// ww.style.maxHeight = val2;
	   	var wwh = ww.clientHeight;
	   	console.log("wwh");
	   	console.log(wwh);
	   	var d = (b - c);
	   	var e = (d / 2);
	   	// console.log("d");
	   	// console.log(d);
	   	// console.log("e");
	   	// console.log(e);
	   	
	   	document.querySelector('#lavie').style.top = e + "px";
	   	document.querySelector('#rmv-glyph').style.top = e + "px";
















	   	// angular.element(document.getElementById('lavie')).addClass('pt-page-flipInTop');
	   	// console.log("b.scrollHeight");
	   	// console.log(b.scrollHeight);
	   	// console.log("b.clientHeight");
	   	// console.log(b.clientHeight);



	   }

	   function resetWindowTopCss() {

	   }


	   function isDesktopView() {
	   	var c = getCurrentWidth();
	   	if (c <= 768) {
	   		return false;
	   	} else if (c > 768) {
	   		return true;
	   	}
	   }



	   function addListener(json, marker) {
	   	// console.log("addListener");
	   	// console.table(json);
	  
          var userDevice = browser;
          var overlay = angular.element(document.getElementById('mobServiceOverlay'));

	      google.maps.event.addListener(marker, 'click', function() {
	      	// console.log("^^^^check assumptions");
	      	// console.log(json.hoursOpen);
	      	var mapHtml = document.querySelector("#customMap");
	      	// console.log("mapHtml");
	      	// console.log(mapHtml.clientHeight);

	      	console.log("is side panel open?");
	     	var c = getCurrentWidth();

	      	if (sidePanelOpen) {
	      		console.log("true");
	      		

	      	} else {
	      		console.log("false");
	      		if (c >= 1660 && c < 1680) {
	      			// mapHtml.style.top = "-.75em";		
	      		}

	      	}

	      	if (isDesktopView()) {
	      		
	      		sidePanelOpen = true;

	      	} else {
	      	
	      	}
	 
	      	


       		setPlaceData(json);
       		setPrintWindow(json);
       		setOverlayData(json);
          	setMobileInfoWindowData(json);

            var c = getCurrentWidth();

            if (c <= 768) {
          	  console.log('less than 768');
        

          	  $scope.soActive = true;
          	  cm.style.height = "360px";
          	  mSo.style.display="initial";
          	 
          	  // document.getElementById('mobServiceOverlay').addClass('pinker');
              // stretchMap();

            } 

            if (c <= 768 && c <= 360) {
   
    			cm.style.height = "240px";
    			// console.log("set cm.style.height");
    			// console.log(cm.style.height);
            }
            
	        resizeMap();
	        // setWindowCss();	
	        setPanelView();
	        findActive();
	
	        var lat = json.location[0].lat;
	        var lng = json.location[0].lng;
	        var ll = new google.maps.LatLng(lat,lng);
	        var cat = json.primaryCategory;
	        setActive(marker, ll, cat);



	        if (marker.getAnimation() !== null) {
    			marker.setAnimation(null);
    		} else {
				removeBouncing();
				// marker.setAnimation(google.maps.Animation.BOUNCE);
				markAsBouncing(marker);
				recenterToMarker();
    		}

    		


	        var anchor = new google.maps.MVCObject();
	        anchor.set("position",event.latLng);
	        var target = json.url;
	        var html = "<a ng-href='" + target +"'>" + "Visit website" + "</a>";
	        var container = document.getElementById('info-wrapper');
	        var desc = json.description;
	        var description = document.getElementById('placeDescription');
	        var l = desc.length;

	        // if (l > 280) {
	        // 	console.log("description too long");
	        // 	description.style.maxHeight = "180px";
	        // 	description.style.overflowY = "scroll";
	        // }
	        // if (l < 42 || l === null) {
	        //   placeDescription.style.textAlign = "center";
	        // } else {
	        //   placeDescription.style.textAlign = "justify";
	        // }

	        var catDom = document.getElementById('placeCategory');
	        var ico = getIcon(json.primaryCategory);

	        $scope.currentCategory = ico;
	        

	        //  var hypSun = document.getElementById('opSun');
	        //  var hypMon = document.getElementById('opMon');
	        //  var hypTue = document.getElementById('opTue');
	        //  var hypWed = document.getElementById('opWed');
	        //  var hypThu = document.getElementById('opThu');
	        //  var hypFri = document.getElementById('opFri');
	        //  var hypSat = document.getElementById('opSat');

	        // var sunday = new RegExp(/Sunday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);
	        // var monday = new RegExp(/Monday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);
	        // var tuesday = new RegExp(/Tuesday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);
	        // var wednesday = new RegExp(/Wednesday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);
	        // var thursday = new RegExp(/Thursday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);
	        // var friday = new RegExp(/Friday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);
	        // var saturday = new RegExp(/Saturday\s(Closed|(\d|\d\d)AM.(\d|\d\d)PM)/);

	        //  if (typeof hrs != "undefined" && hrs != null) {
	        //  	document.getElementById('opHours').style.display = "block";
	        //  	document.getElementById('opHoursNA').style.display = "none";
	        //  	   var sun = hrs.match(sunday);
		       //     var mon = hrs.match(monday);
		       //     var tue = hrs.match(tuesday);
		       //     var wed = hrs.match(wednesday);
		       //     var thu = hrs.match(thursday);
		       //     var fri = hrs.match(friday);
		       //     var sat = hrs.match(saturday);
		       //     var weekHours = {
		       //     	sun: rws(stripDay('sunday', sun[0])), 
		       //     	mon: rws(stripDay('monday', mon[0])),
		       //     	tue: rws(stripDay('tuesday', tue[0])),
		       //     	wed: rws(stripDay('wednesday', wed[0])),
		       //     	thu: rws(stripDay('thursday', thu[0])),
		       //     	fri: rws(stripDay('friday', fri[0])),
		       //     	sat: rws(stripDay('saturday', sat[0]))
		       //     }
		       //     hypSun.style.display = "inline";
	        //  	hypMon.style.display = "inline";
	        //  	hypTue.style.display = "inline";
	        //  	hypWed.style.display = "inline";
	        //  	hypThu.style.display = "inline";
	        //  	hypFri.style.display = "inline";
	        //  	hypSat.style.display = "inline";
		       //     hypSun.innerText = weekHours.sun;
		       //     hypMon.innerText = weekHours.mon;
		       //     hypTue.innerText = weekHours.tue;
		       //     hypWed.innerText = weekHours.wed;
		       //     hypThu.innerText = weekHours.thu;
		       //     hypFri.innerText = weekHours.fri;
		       //     hypSat.innerText = weekHours.sat;

	        //  } else if (typeof hrs === "undefined") {
	
	        //  	document.getElementById('opHours').style.display = "none";
	        //  	document.getElementById('opHoursNA').style.display = "block";
	        //  } else if (hrs === null) {
	        //  	console.log("hrs === null")
	        //  	document.getElementById('opHours').style.display = "none";
	        //  	document.getElementById('opHoursNA').style.display = "block";
	        //  }


	      
	       
     
           // console.log(test[0]);
          
	        $scope.selected = {};
	        $scope.selected.hoursOpen = json.hoursOpen;
	        $scope.selected.zip = json.zip;
	        $scope.selected.title = json.title;
          // $scope.selected.



	        document.getElementById('placeCategory').textContent = categoryIconText(json.primaryCategory);
	        document.getElementById('placeTitle').textContent = json.title;
	        // placeDescription.textContent = desc;
	        // if (typeof desc != "undefined") {
	        // 	console.log()
	        // 	placeDescription.innerText = desc + "???";
	        // } else if (typeof desc === "undefined") {
	        // 	placeDescription.innerText = "Not available";
	        // }
	        document.getElementById('placePhone').textContent = json.phone;
	        $scope.addr = document.getElementById('placeAddress').textContent = json.readableAddress;
	        // $scope.city = document.getElementById('placeCity').textContent = json.city;
	        // $scope.state = document.getElementById('placeState').textContent = json.state;
	        // $scope.zip = document.getElementById('placeZip').textContent = json.zip;
	        // document.getElementById('placeHours').textContent = json.hoursOpen;
          
	      });
	    }
// json.title != 'undefined'




















        













































































      $scope.thisPlace = {};


	    function categoryIconText(str) {
	    	if (str === "wifi-free") {
	    		return "Free public wifi ";
	    	} else if (str === "wifi-customer") {
	    		return "Free wifi with purchase ";
	    	} else if (str === "computers-access") {
 				return "Public access computers ";
	    	} else if (str === "computers-retail") {
	    		return "Low cost or refurbished computers "
	    	} else if (str === "training-day") {
	    		return "Daytime training courses";
	    	} else if (str === "training-night") {
	    		return "Evening training courses";
	    	} else if (str === "isp") {
	    		return "Internet Service Provider ";
	    	}
	    }


	    function createMarker(json) {
	    	// console.log("createMarker");
	     //  console.log(json);

	      var category = json.primaryCategory;
	      var iconUrl = getIcon(category);

	      var image = new google.maps.MarkerImage(
	                                               iconUrl,
	                                               new google.maps.Size(71, 71),
	                                               new google.maps.Point(0, 0),
	                                               new google.maps.Point(17, 34),
	                                               new google.maps.Size(25, 25)
	                                             );

	      var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(json.location[0].lat, json.location[0].lng),
	        map: $scope.map,
	        animation: google.maps.Animation.DROP,
	        icon: image,
	        title: json.title
	      });

	      addListener(json, marker);
	      // addHoverListener(json, marker);

	      $scope.mapMarkers.push(marker);

	      if (category === "computers-access") {
	         $scope.markers.computers.access.push(marker);
	      } else if (category === "training-day") {  
	          $scope.markers.training.day.push(marker);
	      } else if (category === "training-night") {  
	          $scope.markers.training.night.push(marker);
	      } else if (category === "wifi-free") {
	         $scope.markers.wifi.free.push(marker);
	      } else if (category === "wifi-customer") {
	         $scope.markers.wifi.customer.push(marker);
	      } else if (category === "computers-retail") {
	         $scope.markers.computers.retail.push(marker);
	      } else if (category === "isp") {
	         
	      };
	    };

	    function clearWifiMarkers() {
	      console.log("clearWifiMarkers");
	      var freeWifiSpots     = $scope.markers.wifi.free;
	      var customerWifiSpots = $scope.markers.wifi.customer;
	      if($scope.activeSpot.marker != null && ($scope.activeSpot.meta.primaryCategory === "wifi-customer" || $scope.activeSpot.meta.primaryCategory === "wifi-free")) {
	      	$scope.activeSpot.marker.setMap(null);
	      }
	      var i;
	      var n;
	      var l = freeWifiSpots.length; 
	      var m = customerWifiSpots.length;
	      for (i=0;i<l;i++) {
	        freeWifiSpots[i].setMap(null);
	      }
	      freeWifiSpots=[];
	      for (n=0;n<m;n++){
	        customerWifiSpots[n].setMap(null);
	      }
	      customerWifiSpots=[];
	    }
	    
	    function clearTrainingMarkers() {
	      console.log('clearTrainingMarkers');
	      var dayCourses = $scope.markers.training.day;
	      var nightCourses = $scope.markers.training.night;
	      if($scope.activeSpot.marker != null && ($scope.activeSpot.meta.primaryCategory === "training-day" || $scope.activeSpot.meta.primaryCategory === "training-night")) {
	      	$scope.activeSpot.marker.setMap(null);
	      }
	      for (var i = 0; i < dayCourses.length; i++) {
	        dayCourses[i].setMap(null);
	      }
	      for (var i = 0; i < nightCourses.length; i++) {
	        nightCourses[i].setMap(null);
	      }
	      dayCourses = [];
	      nightCourses = [];
	    }

	    function clearAccessMarkers() {
	      console.log("clearAccessMarkers");
	      
	      if($scope.activeSpot.marker != null && $scope.activeSpot.meta.primaryCategory === "computers-access") {
	      	$scope.activeSpot.marker.setMap(null);
	      }
	      var markers = $scope.markers.computers.access;
	      var i;
	      var length = markers.length;
	      for (i=0; i<length; i++) {
	        markers[i].setMap(null);
	      }
	      markers = [];
	    }

	    function clearRetailMarkers() {
	      var markers = $scope.markers.computers.retail;
	      console.log("clearRetailMarkers");
	      console.log(markers);
	      if($scope.activeSpot.marker != null && $scope.activeSpot.meta.primaryCategory === "computers-retail") {
	      	$scope.activeSpot.marker.setMap(null);
	      }
	      var i; 
	      var length = markers.length;
	      for (i=0;i<length;i++){
	        markers[i].setMap(null);
	      }
	      markers = [];
	    }

	    // function resetCss(elm, boolean) {
	    //   if (boolean) {
	    //     elm.removeClass('button normal fit small');
	    //     elm.addClass('button special fit small');
	    //   } else {
	    //     elm.removeClass('button special fit small');
	    //     elm.addClass('button normal fit small');
	    //   }
	    // }

	    function resetCss(elm, boolean) {
	      if (boolean) {
	        elm.removeClass('normal');
	        elm.addClass('special');
	      } else {
	        elm.removeClass('special');
	        elm.addClass('normal');
	      }
	    }

	    $scope.trainingVisibility =false;
	    $scope.toggleTrainingMarkers = function() {
	      if ($scope.trainingVisibility) {
	        resetCss(e2, false);
	        clearTrainingMarkers();
	        $scope.trainingVisibility = false;
	      } else {
	        resetCss(e2, true);
	        setTrainingMarkers();
	        $scope.trainingVisibility = true;
	      }
	    }

	    $scope.computersVisibility = false;
	    $scope.toggleComputersMarkers = function() {
	    	console.log("check boolean toggle");
	    	console.log($scope.toggle.access);
	      if ($scope.computersVisibility) {
	        resetCss(e3, false);
	        clearAccessMarkers();
	        $scope.computersVisibility = false;
	      } else {
	        resetCss(e3, true);
	        // clearAccessMarkers();
	        setAccessMarkers();
	        $scope.computersVisibility = true;
	      }
	    }

	    $scope.wifiVisibility = false;
	    $scope.toggleWifiMarkers = function() {
	      if ($scope.wifiVisibility) {
	        resetCss(e1, true);
	        $scope.buttonToggled = true;
	        setWifiMarkers();
	        $scope.wifiVisibility = false;
	      } else {
	        resetCss(e1, false);
	        clearWifiMarkers();
	        $scope.wifiVisibility = true;
	      }
	    }

	    $scope.refurbsVisibility = false;
	    $scope.toggleRefurbsMarkers = function() {
	      if ($scope.refurbsVisibility) {
	        resetCss(e4, false);
	        clearRetailMarkers();
	        $scope.refurbsVisibility = false;
	      } else {
	        resetCss(e4, true);
	        setRetailMarkers();
	        $scope.refurbsVisibility = true;
	      }
	    }

	    $scope.success = function (pos) {
	      var coords = pos.coords;
	      if ($scope.visitor.latitude === coords.latitude && $scope.visitor.longitude === coords.longitude) {
	        // console.log('$scope.visitor');
	        navigator.geolocation.clearWatch(id);
	      }
	    }

	    $scope.geolocationError = function (err) {
       
	      console.warn('ERROR(' + err.code + '): ' + err.message);
	    }

	    $scope.visitor = {
	      latitude : 0,
	      longitude: 0
	    };

	    $scope.watchOptions = {
	      enableHighAccuracy: true,
	      timeout: 5000,
	      maximumAge: 0
	    };

	    $scope.id = navigator.geolocation.watchPosition($scope.success, $scope.geolocationError, $scope.watchOptions);

	    $scope.showResult = function () {
	        return $scope.error == "";
	    }



	    function fixMapWidth(width) {
	    	console.log("fixMapWidth");
	    	console.log(width);

	    	var ww = document.getElementById('windowWrapper');

	    	var mw = cm.style.width;
	    	console.log(mw);
	   	  	if (width <= 768) {
	        	// console.log("1. 0 to 768");
	          // $scope.mobileMod = true;
	          // headerToggleId.style.display = "none";
	          // mobileWindowElement.style.display = "initial";
	          // $window.scrollTo(0,0);
	          // hideOverflow(html);
	          // var diff = (cWidth - 38);
	          // var x = diff + "px";
	          // document.getElementById('trix').style.width = x;

	          // console.log(cWidth + " is less than 768");
	        } else if (width > 768 && width < 1000 && !sidePanelOpen) {
	        	// console.log("2. 768 to 1000 -- sidePanelOpen=false");

	        	cm.style.width = "724px";
	        } else if (width > 768 && width < 1000 && sidePanelOpen) {
	        	// console.log("2. 768 to 1000 -- sidePanelOpen=true");
	        	ww.style.height = "612px";
	        	cm.style.width = "78.25%";
	        } else if (width >= 1000 && width < 1200 && !sidePanelOpen) {
	        	// console.log("3. 1000 to 1200");
	    		cm.style.width = "944px";
	        } else if (width >= 1000 && width < 1200 && sidePanelOpen) {
	        	// console.log("3. 1000 to 1200");
	        	ww.style.height = "634px";
	    		cm.style.width = "78.25%";
	        } else if (width >= 1200 && width < 1280 && !sidePanelOpen) {
	        	// console.log("4. 1200 to 1280");
	   			cm.style.width = "1022px";
	        } else if (width >= 1200 && width < 1280 && sidePanelOpen) {
	        	// console.log("4. 1200 to 1280");
	        	ww.style.height = "634px";
	   			cm.style.width = "81.5%";
	        } else if (width >= 1280 && width < 1660 && !sidePanelOpen) {
	        	// console.log("5. 1280 to 1660");
	        	cm.style.width = "1146px";
	        } else if (width >= 1280 && width < 1660 && sidePanelOpen) {
	        	// console.log("5. 1280 to 1660");
	        	ww.style.height = "586px";
	        	cm.style.width = "860px";
	        } else if (width >= 1660 && width < 1680 && !sidePanelOpen) {
	        	// console.log("6. 1280 to 1660");
	        	cm.style.width = "1136px";
	        } else if (width >= 1660 && width < 1680 && sidePanelOpen) {
	        	// console.log("6. 1280 to 1660");
	        	ww.style.height = "609px";
	        	cm.style.width = "75.4%";
	        } else if (width >= 1680 && !sidePanelOpen) {
	        	// console.log("7. 1660 to infinity");
	        	cm.style.width = "1136px";
	        } else if (width >= 1680 && sidePanelOpen) {
	        	// console.log("7. 1660 to infinity");
	        	ww.style.height = "611px";
	        	cm.style.width = "75.4%";
	        }
	
	    }
	   

	    function removeWindow() {
	    	  var c = getCurrentWidth();
		      sideWindowElement.style.display = "none";
		      mapCanvasElement.style.width = resetMapWidth(c);
		      $scope.activeSpot.marker.setMap(null);
	      // cm.style.width = "100%";
	          if (innerWidth <= 768) {
	            $scope.mobileWindowOpen = false;
	          } else if (innerWidth > 768) {
	          	 sidePanelOpen = false;
	          }

	         

	    }
      var html = document.getElementsByTagName('html')[0];
     
      var overlayX = document.getElementById('exit-service-overlay');


      $scope.closeServiceOverlay = function() {
      	// if (cWidth > 600) {
      		console.log("clickServiceOverlay()");
      		document.getElementById('mobServiceOverlay').style.display = "none";

      	// }
      	cm.style.height = "615px";
      }

      function hideOverflow(element) {
        element.style.overflowY = "hidden";
      }


      $scope.fdDown = function() {

      }





   	 var resizeMap = function() {
   	 	// console.log("resizeMap()");
   	 	// console.log(sidePanelOpen);
        var cWidth = getCurrentWidth();
        var ww = document.getElementById('windowWrapper');
        var c = getCurrentWidth();
        if (c <= 768) {
        	// console.log("1. 0 to 768");
          // $scope.mobileMod = true;
          // headerToggleId.style.display = "none";
          // mobileWindowElement.style.display = "initial";
          // $window.scrollTo(0,0);
          // hideOverflow(html);
          // var diff = (cWidth - 38);
          // var x = diff + "px";
          // document.getElementById('trix').style.width = x;

          // console.log(cWidth + " is less than 768");
        } else if (c > 768 && c < 1000) {
        	// console.log("2. 768 to 1000");
        	mapCanvasElement.style.width = "78.25%";
        	ww.style.height = "612px";
            mapCanvasElement.style.borderRight = "1px solid #d4dae0";
            sideWindowElement.style.display = "initial";
        } else if (c >= 1000 && c < 1200) {
        	// console.log("3. 1000 to 1200");
        	mapCanvasElement.style.width = "78.25%";
            mapCanvasElement.style.borderRight = "1px solid #d4dae0";
            sideWindowElement.style.display = "initial";
        } else if (c >= 1200 && c < 1280) {
        	// console.log("4. 1200 to 1280");
        	// mapCanvasElement.style.left = "-5.05em";
        	// mapCanvasElement.style.top = "-7.99em";
        	mapCanvasElement.style.width = "81.5%";
            mapCanvasElement.style.borderRight = "1px solid #d4dae0";
            sideWindowElement.style.display = "initial";
        } else if (c >= 1280 && c < 1660) {
        	// console.log("5. 1280 to 1660");
        	mapCanvasElement.style.width = "860px";
            mapCanvasElement.style.borderRight = "1px solid #d4dae0";
            sideWindowElement.style.display = "initial";
        } else if (c >= 1660 && c < 1680) {
        	// console.log("6. 1280 to 1660");
        	mapCanvasElement.style.width = "75.4%";
        	// mapCanvasElement.style.top = "-.75em";
            mapCanvasElement.style.borderRight = "1px solid #d4dae0";
            sideWindowElement.style.display = "initial";
        } else if (c >= 1680) {
        	// console.log("7. 1660 to infinity");
        	mapCanvasElement.style.width = "75.4%";
        	
        	// mapCanvasElement.style.top = '-4.4em';
            mapCanvasElement.style.borderRight = "1px solid #d4dae0";
            sideWindowElement.style.display = "initial";
        }




        // else {
        //   mapCanvasElement.style.width = "65%";
        //   mapCanvasElement.style.borderRight = "1px solid #ccc";
        //   sideWindowElement.style.display = "initial";
        // }
	      
        
   	 }


   	 function checkPanelCss(viewportWidth) {
   	 	console.log("checkPanelCss");
   	 	console.log("..viewportWidth: " + viewportWidth);
   	 	console.log();
   	 	var vw = viewportWidth;
   	 	var m = document.querySelector("#customMap");
   	 	var h = m.getBoundingClientRect().height;
   	 	var p = document.querySelector("#lavie");
   	 	var val = document.querySelector("#sw").style.display.length;
   	 	console.log("sideWindow.style.display");
   	 	if (val === 0) {
   	 		var panelOpen = false;
   	 	} else if (val >= 1) {
   	 		var panelOpen = true;
   	 	}


   	 	if (panelOpen) {
   	 		console.log("panelOpen");
   	 		if (vw <= 768) {
         
	        } else if (vw > 768 && vw < 1000) {
	  
	   
	        } else if (vw >= 1000 && vw < 1200) {


	        } else if (vw >= 1200 && vw < 1280) {
	  
	   		
	        } else if (vw >= 1280 && vw < 1660) {
	     
	
	        } else if (vw >= 1660 && vw < 1680) {
	        	
	       
	        } else if (vw >= 1680) {
	        
	  
	        }
   	 	} else {
   	 		console.log("!panelOpen");
   	 	}

   	 	
	  
   	 }

   	  function resetMapWidth(width) {
   	  	if (width <= 768) {
        	console.log("1. 0 to 768");
          // $scope.mobileMod = true;
          // headerToggleId.style.display = "none";
          // mobileWindowElement.style.display = "initial";
          // $window.scrollTo(0,0);
          // hideOverflow(html);
          // var diff = (cWidth - 38);
          // var x = diff + "px";
          // document.getElementById('trix').style.width = x;

          // console.log(cWidth + " is less than 768");
        } else if (width > 768 && width < 1000) {
        	console.log("2. 768 to 1000");
        	cm.style.width = "724px";
        } else if (width >= 1000 && width < 1200) {
        	console.log("3. 1000 to 1200");
    		cm.style.width = "944px";
        } else if (width >= 1200 && width < 1280) {
        	console.log("4. 1200 to 1280");
   			cm.style.width = "1022px";
        } else if (width >= 1280 && width < 1660) {
        	console.log("5. 1280 to 1660");
        	cm.style.width = "1146px";
        } else if (width >= 1660 && width < 1680) {
        	console.log("6. 1280 to 1660");
        	cm.style.width = "1136px";
        } else if (width >= 1680) {
        	console.log("7. 1680 to infinity");
        	cm.style.width = "1136px";
        }
	  }

   	 $scope.closeFullDescription = function() {
   	 	headerToggleId.style.display = "initial";
   	 	cm.style.top = "-4.6em";
	  	mobileWindowElement.style.display = "none";
	  }


   	 $scope.overlayUp = function(ev) {
      // alert('You swiped up!!');
      	stretchMap();
      	var c = getCurrentWidth();
      	$scope.mobileMod = true;
        headerToggleId.style.display = "none";
     	mobileWindowElement.style.display = "initial";
     	$window.scrollTo(0,0);
        hideOverflow(html);
        var diff = (c - 38);
        var x = diff + "px";
        document.getElementById('trix').style.width = x;
     };
















      function onGeolocationError() {
        // console.log("onGeolocationError");
        
        getGoogleGeolocation();
        // console.log("planB");
        // console.log($scope.planB);
        
      }

      function successCallback(res) {
  
      	var loc = res.data.location;

      	var position = { 
                          coords: { latitude: loc.lat, longitude: loc.lng }
                        };
 
        $scope.showMap(position);
      }

      function errorCallback(res) {
   
      	// var position = { 
       //                    coords: { latitude: libertyMemorial[0], longitude: libertyMemorial[1] }
       //                  };
       //  $scope.showMap(position);
      }
      
      function getGoogleGeolocation() {
      	var base = "https://www.googleapis.com/geolocation/v1/geolocate?key=";
      	var apiKey = "AIzaSyCC-reO4jDrH1PqVkRX7qp5t4PQMWoBmls";
      	var url = base + apiKey;
      	// YOUR_API_KEY
      	var body = {considerIp: true};
	    // $http.post(url, body).success(function(data) {
	  		// backupGeolocationCallback(data);
	    // });
	    $http.post(url, body).then(successCallback, errorCallback);

      }

      function backupGeolocationCallback(res) {
      
      	$scope.planB = res.location;
      	var position = { 
                          coords: { latitude: libertyMemorial[0], longitude: libertyMemorial[1] }
                        };
        $scope.showMap(position);
      }



	    $scope.showError = function (error) {
        onGeolocationError();
	      switch (error.code) {
	        case error.PERMISSION_DENIED:
	          $scope.error = "User denied the request for Geolocation."
	          break;
	        case error.POSITION_UNAVAILABLE:
	          $scope.error = "Location information is unavailable."
	          break;
	        case error.TIMEOUT:
	          $scope.error = "The request to get user location timed out."
	          break;
	        case error.UNKNOWN_ERROR:
	          $scope.error = "An unknown error occurred."
	          break;
	      }
	      $scope.$apply();
	    }

	   var getLocation = function () {
	      if (navigator.geolocation) {
          // console.log("geolocation supported");
	        navigator.geolocation.getCurrentPosition($scope.showMap, $scope.showError);
	      }
	      else {
          // console.log("browser does not support geolocation")
	        $scope.error = "Geolocation is not supported by this browser.";
	      }
	    }

	    $scope.isLoaded = false;


	      $scope.removeWindow = function() { 
	      	// console.log("?");
	        removeWindow();
	      }


	    var loadMarkersOnInit = function (boolean) {
	    	// console.log("loadMarkersOnInit");
	    	if (boolean) {
	    		// console.log("init true");
	    		new google.maps.Marker({
		          position: $scope.initialLocation,
		          animation: google.maps.Animation.DROP,
		          map: $scope.map,
		          icon: 'modules/core/client/img/red-dot.png'
		      	});
	    	} else {
	    		// console.log("init false");
	    	}
	    	
	    }

	    var initFreeWifiButton = function () {
	    	// console.log("initFreeWifiButton");
	    	// e1.removeClass('button normal fit small') && e1.addClass('button special fit small');
	    	e1.removeClass('normal') && e1.addClass('special');
	    }

	    // var inactiveCss = new RegExp('button normal fit small');
     //    var activeCss = new RegExp('button special fit small');
     var inactiveCss = new RegExp('normal');
        var activeCss = new RegExp('special');


      $scope.currentlyHighlightedButtons = [];


      var callbackStatus = function(button, boolean) {
      	if (boolean) {
      		$scope.currentlyHighlightedButtons.push(button);
      	} 
      }



	    var getBtnStatus = function(btn) {

	    	var css = btn.className;
	    	var id = btn.id;

	    	// console.log(btn.id);
	    	if (css.match(activeCss)) {
	    		// console.log("css matches, is highlighted")
	    		return true;
	    	} else {
	    		// console.log("css not a match, not highlighted");
	    		return false;
	    	}
	    	// if (btn === )
	    }



      function zoomEnter() {
      	setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(10);
        }, 600);
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(11);
        }, 600);
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(12);
        }, 600);
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(13);
        }, 600);
        setTimeout(function(){
            // console.log("timeout");
            $scope.map.setZoom(14);
        }, 800);
      }

      function fadeOutElement(element) {
        // console.log("fadeOut");
        // console.log(element)

        element.addClass("am-fade-and-slide-bottom-remove")
      }
      

	    $scope.showMap = function(position) {
        // console.log("showMap");
        // console.log(position);
	      $scope.lat = position.coords.latitude;
	      $scope.lng = position.coords.longitude;

	      $scope.accuracy = position.coords.accuracy;

	      $scope.mapOptions = {
	        center: {lat: $scope.lat, lng: $scope.lng},
	        zoom: 9,
	        disableDoubleClickZoom: true,
	        navigationControlOptions: {
	            style: google.maps.NavigationControlStyle.SMALL
	        },
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		  };



    

	      $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);


	      console.log($scope.map);
	      var bounds = $scope.map.getBounds();
	      console.log(bounds);

	      $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.input);



        $scope.initialLocation = new google.maps.LatLng($scope.lat, $scope.lng);

	      $scope.currentLocation = $scope.initialLocation;


	      google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function(){
			    // do something only the first time the map is loaded
          $scope.showMapControls = true
          zoomEnter()
			    // console.log("============================tilesloaded")
			    $timeout(6000, loadMarkersOnInit(true), true)
			    initFreeWifiButton()
			    setWifiMarkers()
				
		  });


    //       google.maps.event.addListenerOnce($scope.map, 'idle', function(){				
		  // });



          google.maps.event.addListener(net, 'mouseover', function() {
          	// console.log("mouse in net");
          	// console.log(viewIndex);
          })

          google.maps.event.addListenerOnce($scope.map, 'mouseover', function() {
          	// console.log("mousover map");
          	// console.log(currentIndex);
          	// console.log(viewIndex);

          	// reportViewIndex(currentIndex, viewIndex);
          	// measureDistances($scope.inViewNow);
          })


          $scope.mapReady = true;

	      $scope.clearAll = function() {
	      	clearAll();
	      } 


	     
	      var center;

	      function calculateCenter() {
	        center = $scope.map.getCenter();
	      }

	      function triggerResize() {
	      	console.log("triggering resize");
	      	google.maps.event.trigger($scope.map, 'resize')
	      }

	      google.maps.event.addDomListener($scope.map, 'idle', function() {
	        calculateCenter();
	      });
 
	      google.maps.event.addDomListener(window, 'resize', function() {
	      	var c = getCurrentWidth();
	      	fixMapWidth(c);
	      	var b;
	      	triggerResize();
	     	checkPanelCss(c);
	     	// console.log("resizing while active => " + $scope.activeSpot.primaryCategory);
	     	var actCat = $scope.activeSpot.meta.primaryCategory;
	     	setIconLeftValue(actCat);
	        $scope.map.setCenter(center);
	        var bounds = $scope.map.getBounds();
	      });
	        
	      // $scope.$apply();
	    };

   getLocation();
  }



	
}());
