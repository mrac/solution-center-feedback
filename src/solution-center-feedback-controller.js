angular.module('solutionCenter.feedback')
    .controller('SolutionCenterFeedbackController',
        ['solutionCenterFeedbackService', '$cookies',
          function (solutionCenterFeedbackService, $cookies) {
            'use strict';

            var FEEDBACK_COOKIE_NAME = 'SC_FEEDBACK';

            var vm = this;

            vm.isMinified = $cookies.get(FEEDBACK_COOKIE_NAME) === 'true' || false;
            vm.hoverRating = 0;
            vm.rating = 0;

            vm.submitFeedback = function () {
              solutionCenterFeedbackService.submitFeedback()
                  .then(
                      function() {

                      },
                      function() {

                      }
                  );
            };

            vm.toggleMenu = function () {
              vm.isMinified = !vm.isMinified;
              $cookies.put(FEEDBACK_COOKIE_NAME, vm.isMinified);
            };

            vm.setRating = function(newRating) {
              vm.rating = newRating;
              vm.hoverRating = newRating;
            };

            vm.updateRating = function (newRating) {
              vm.hoverRating = (newRating === 0) ? vm.rating : newRating;
            };
          }
        ]);
