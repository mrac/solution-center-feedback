angular.module('solutioncenter.feedback')
    .controller('scFeedbackController',
        ['scFeedbackService', '$cookies', '$timeout',
          function (scFeedbackService, $cookies, $timeout) {
            'use strict';

            var FEEDBACK_COOKIE_NAME = 'SC_FEEDBACK';

            var vm = this;

            vm.isMinified = $cookies.get(FEEDBACK_COOKIE_NAME) === 'true' || false;
            vm.hoverRating = 0;
            vm.rating = 0;
            vm.submitted = false;
            vm.hidden = false;

            vm.submitFeedback = function () {
              var feedback = {
                rating: vm.rating,
                comment: vm.comment
              };

              scFeedbackService.submitFeedback(feedback)
                  .then(
                      function () {
                        vm.submitted = true;

                        $timeout(function () {
                          vm.hidden = true;
                        }, 5000);
                      },
                      function () {

                      }
                  );
            };

            vm.toggleMenu = function () {
              vm.isMinified = !vm.isMinified;
              $cookies.put(FEEDBACK_COOKIE_NAME, vm.isMinified);
            };

            vm.setRating = function (newRating) {
              vm.rating = newRating;
              vm.hoverRating = newRating;
            };

            vm.updateRating = function (newRating) {
              vm.hoverRating = (newRating === 0) ? vm.rating : newRating;
            };
          }
        ]);
