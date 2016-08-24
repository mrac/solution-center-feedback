import 'angular';

import './styles/feedback.scss';
import './app/index';

angular.module('solutioncenter.feedback', [
  'solutioncenter.feedback.app'
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['solutioncenter.feedback'], {
    strictDi: true
  });
});
