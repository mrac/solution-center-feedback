import 'angular';
import 'angular-cookies';
import 'angular-mocks/ngMockE2E';

import 'solution-center-communicator';
import '../node_modules/dress-code/dist/css/dress-code.min.css';

angular.module('demo', ['solutioncenter.feedback', 'ngMockE2E'])
  .run(DemoRunBlock)
  .controller('DemoController', DemoController);


DemoRunBlock.$inject = ['$httpBackend'];

function DemoRunBlock($httpBackend: ng.IHttpBackendService) {
  $httpBackend.whenGET('https://ms-integration.norris.zalan.do/modules/3/feedback-status')
    .respond(function() {
    return [200, {
      "feedbackAvailable": true
    }];
  });

  $httpBackend.whenPOST('https://ms-integration.norris.zalan.do/modules/3/feedback')
    .respond(function() {
      return [200, {}];
    });
}

function DemoController() {
  this.module = {
    id: 3,
    name: 'Solution Center'
  };
}

angular.element(document).ready(() => {
  angular.bootstrap(document, ['demo'], {
    strictDi: true
  });
});
