'use strict';

angular.module('solutionCenter.feedback', ['ngCookies'])
    .component('solutionCenterFeedback', {
      bindings: {
        module: '<'
      },
      controller: 'SolutionCenterFeedbackController',
      template: ['$templateCache', function($templateCache) {
        return $templateCache.get('solution-center-feedback.html');
      }]
    });
