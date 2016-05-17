angular.module('solutionCenter.feedback')
    .controller('SolutionCenterFeedbackController',
        ['solutionCenterFeedbackService',
          function (solutionCenterFeedbackService) {
            'use strict';

            var vm = this;

            vm.isMinified = false;
            vm.rating = 0;
            vm.fixedRating = 0;

            vm.submitFeedback = function () {
              solutionCenterFeedbackService.submitFeedback();
            };

            vm.minify = function () {
              vm.isMinified = true;
            };

            vm.fixRating = function(newRating) {
              vm.fixedRating = newRating;
              vm.rating = newRating;
            };

            vm.updateRating = function (newRating) {
              vm.rating = (newRating === 0) ? vm.fixedRating : newRating;
            };
          }
        ]);
