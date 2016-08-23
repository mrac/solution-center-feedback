/*
//import {ScFeedbackService} from './feedback.service';

describe('ScFeedbackService', () => {

  let scFeedbackService: any;
  let $httpBackend: ng.IHttpBackendService;

  let mockedModule: any;
  let mockedFeedback: any;

  beforeEach(setup);

  it('should submit feedback', () => {
    console.log(scFeedbackService);
    //scFeedbackService.submitFeedback(mockedModule.id, mockedFeedback);

    //$httpBackend.expectGET(scFeedbackService.buildEndpointUrl(scFeedbackService.feedbackAvailable, mockedModule.id));
  });

  afterEach(verifications);

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    injectors();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback');
  }

  function injectors(): void {
    inject(
      ($injector: ng.auto.IInjectorService) => {
        scFeedbackService = $injector.get('ScFeedbackService');
        $httpBackend = $injector.get('$httpBackend');
      });
  }

  function mocks(): void {
    mockedModule = {
      id: 1,
      name: 'test'
    };

    mockedFeedback = {
      rating: 5,
      comment: 'great'
    };
  }

  function verifications() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }
});
*/
