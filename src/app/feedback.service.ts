angular.module('solutioncenter.feedback')
    .factory('scFeedbackService',
        [function () {
            'use strict';

            var submitFeedback = () => {};

            return {
              submitFeedback: submitFeedback
            };
          }
        ]);
