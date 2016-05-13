angular.module('solutionCenter.feedback')
    .controller('SolutionCenterFeedbackController',
        ['solutionCenterFeedbackService',
          function (solutionCenterFeedbackService) {
            'use strict';

            var vm = this;

            vm.isMinified = false;

            vm.submitFeedback = function () {
              solutionCenterFeedbackService.submitFeedback();
            };

            vm.minify = function () {
              vm.isMinified = true;
            };
          }
        ]);
