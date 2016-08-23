import * as angular from 'angular';
import 'angular-cookies';
import 'solution-center-communicator';

import './styles/feedback.scss';

import { ScFeedbackService } from './app/feedback.service';
import { selector, config } from './app/feedback.component';

angular.module('solutioncenter.feedback', ['ngCookies', 'solutioncenter.communicator'])
  .service('ScFeedbackService', ScFeedbackService)
  .component(selector, config);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['solutioncenter.feedback'], {
    strictDi: true
  });
});
