import 'angular';
import 'angular-cookies';
import 'solution-center-communicator';

import { ScFeedbackService } from './feedback.service';
import ScFeedbackComponent from './feedback.component';

angular
  .module('solutioncenter.feedback.app', [
    'ngCookies',
    'solutioncenter.communicator'
  ])
  .service('ScFeedbackService', ScFeedbackService)
  .component('scFeedback', new ScFeedbackComponent());
