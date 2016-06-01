'use strict';

angular.module('solutioncenter.feedback')
    .component('scFeedback', {
      bindings: {
        module: '<'
      },
      controller: 'scFeedbackController',
      template: ['$templateCache', $templateCache => $templateCache.get('feedback.html')]
    });
