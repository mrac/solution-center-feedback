angular.module('solutioncenter.feedback')
    .factory('scFeedbackService',
        [function () {
            'use strict';

            let submitFeedback = () => {};

            return {
              submitFeedback: submitFeedback
            };
          }
        ]);
