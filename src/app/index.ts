import 'angular';
import 'angular-cookies';

import { ScFeedbackService } from './feedback.service';
import ScFeedbackComponent from './feedback.component';

angular.module('solutioncenter.feedback.app', ['ngCookies'])
  .service('ScFeedbackService', ScFeedbackService)
  .component('scFeedback', new ScFeedbackComponent());
