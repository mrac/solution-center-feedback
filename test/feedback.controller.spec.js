describe('feedbackController', function () {
  'use strict';

  var $rootScope, $scope, scFeedbackService, $cookies, $timeout, feedbackController;

  beforeEach(function () {
    module('solutioncenter.feedback');

    inject(
      function (_$rootScope_, $controller, _scFeedbackService_, _$cookies_, _$timeout_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        scFeedbackService= _scFeedbackService_;
        $cookies = _$cookies_;
        $timeout = _$timeout_;

        feedbackController = $controller('scFeedbackController', {
          $scope: $scope
        });
        $rootScope.$digest();
      });
  });

  describe('initial state', function () {
    it('has known structure', function () {
      expect(feedbackController.submitFeedback).toBeDefined();
      expect(feedbackController.toggleMenu).toBeDefined();
      expect(feedbackController.setRating).toBeDefined();
      expect(feedbackController.updateRating).toBeDefined();
    });
  });
});

