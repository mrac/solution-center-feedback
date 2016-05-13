'use strict';

angular.module('solutionCenter.feedback', [])
    .component('solutionCenterFeedback', {
      bindings: {
        module: '='
      },
      controller: 'SolutionCenterFeedbackController',
      controllerAs: 'feedbackCtrl',
      template: ['$templateCache', function($templateCache) {
        return $templateCache.get('solution-center-feedback.html');
      }]
    });
