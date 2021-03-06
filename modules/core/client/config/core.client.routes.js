(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('about', {
        url: '/about',
        templateUrl:'modules/core/client/views/tabs/about.client.view.html', 
        controller: 'AboutController'
      })
      .state('contact', {
        url: '/contact',
        templateUrl:'modules/core/client/views/tabs/contact.client.view.html', 
        controller: 'ContactController'
      })
      .state('training-online', {
        url: '/training-online',
        templateUrl:'modules/core/client/views/tabs/training-online.client.view.html', 
        controller: 'TrainingOnlineController'
      })
      .state('internet', {
        url: '/internet',
        templateUrl:'modules/core/client/views/tabs/internet.client.view.html', 
        controller: 'InternetController'
      })
      .state('test', {
        url: '/test',
        templateUrl: 'modules/core/client/views/test.client.view.html', 
        controller: 'TestController'
      })
      .state('tmp', {
        url: '/tmp',
        templateUrl: 'modules/core/client/views/tmp.client.view.html'
      })
      .state('confirm-new-resource', {
        url: '/confirm-new-resource/:placeId',
        templateUrl: 'modules/core/client/views/confirm-new-resource.client.view.html'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/views/404.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Not-Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: 'modules/core/client/views/400.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Bad-Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      });
  }
}());
