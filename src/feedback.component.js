'use strict';

angular.module('solutioncenter.feedback')
    .component('scFeedback', {
      bindings: {
        module: '<'
      },
      controller: 'scFeedbackController',
      template: ['$templateCache', function($templateCache) {
        return $templateCache.get('feedback.html');
      }]
    });
