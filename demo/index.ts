import 'angular';
import 'angular-cookies';

import 'solution-center-communicator';
import '../node_modules/dress-code/dist/css/dress-code.min.css';

angular.module('demo', ['solutioncenter.feedback'])
  .controller('DemoController', DemoController);

function DemoController() {
  this.module = {
    id: 1,
    name: 'Solution Center'
  };
}

angular.element(document).ready(() => {
  angular.bootstrap(document, ['demo'], {
    strictDi: true
  });
});
