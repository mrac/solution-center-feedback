angular.module('solutioncenter.feedback')
    .controller('scFeedbackController',
        ['scFeedbackService', '$cookies', '$timeout',
          function (scFeedbackService, $cookies, $timeout) {
            'use strict';

            let FEEDBACK_COOKIE_NAME = 'SC_FEEDBACK';

            let vm = this;

            vm.isMinified = $cookies.get(FEEDBACK_COOKIE_NAME) === 'true' || false;
            vm.hoverRating = 0;
            vm.rating = 0;
            vm.submitted = false;
            vm.hidden = false;

            vm.submitFeedback = () => {
              let feedback = {
                rating: vm.rating,
                comment: vm.comment
              };

              scFeedbackService.submitFeedback(feedback)
                  .then(
                      () => {
                        vm.submitted = true;
                        $timeout(() => vm.hidden = true, 5000);
                      },
                      () => {}
                  );
            };

            vm.toggleMenu = () => {
              vm.isMinified = !vm.isMinified;
              $cookies.put(FEEDBACK_COOKIE_NAME, vm.isMinified);
            };

            vm.setRating = (newRating) => {
              vm.rating = newRating;
              vm.hoverRating = newRating;
            };

            vm.updateRating = newRating => vm.hoverRating = (newRating === 0) ? vm.rating : newRating;
          }
        ]);
