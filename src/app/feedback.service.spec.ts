import ScFeedbackService from './feedback.service';

import IInjectorService = angular.auto.IInjectorService;
import IProvideService = angular.auto.IProvideService;

describe('ScFeedbackService', () => {
  let $httpBackend: ng.IHttpBackendService;
  let scFeedbackService: ScFeedbackService;
  let scEnvironments: any;
  let mock: any;

  beforeEach(setup);
  afterEach(teardown);

  it('should check if feedback is available', () => {
    spyOnServiceMethod('buildEndpointUrl', mock.api);

    scFeedbackService.isFeedbackAvailable(mock.module.id);

    expect(scFeedbackService.buildEndpointUrl).toHaveBeenCalledWith('get', mock.module.id);
    expect(mock.httpService.get).toHaveBeenCalledWith(mock.api);
  });

  it('should submit feedback', () => {
    spyOnServiceMethod('buildEndpointUrl', mock.api);

    scFeedbackService.submitFeedback(mock.module.id, mock.feedback);

    expect(scFeedbackService.buildEndpointUrl).toHaveBeenCalledWith('post', mock.module.id);
    expect(mock.httpService.post).toHaveBeenCalledWith(mock.api, mock.feedback);
  });

  it('should build GET endpoint', () => {
    let url = scFeedbackService.buildEndpointUrl('get', mock.module.id);
    expect(url).toEqual(mock.getEndpoint('get'));
  });

  it('should build POST endpoint', () => {
    let url = scFeedbackService.buildEndpointUrl('post', mock.module.id);
    expect(url).toEqual(mock.getEndpoint('post'));
  });

  it('should sanitize comment', () => {
    let input = scFeedbackService.sanitize(mock.input.evil);
    expect(input).toEqual(mock.input.nice);
  });

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    injectors();
    spies();
    instantiate();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback.app', ($provide: IProvideService) => {
      $provide.value('$http', mock.httpService);
    });
  }

  function injectors(): void {
    angular.mock.inject(($injector: IInjectorService) => {
      $httpBackend = $injector.get('$httpBackend');
      scEnvironments = $injector.get('ScEnvironments');
    });
  }

  function instantiate(): void {
    scFeedbackService = new ScFeedbackService(mock.httpService, mock.environmentsService);
  }

  function spies(): void {
    mock.environmentsService.getCurrentEnvironment.and.returnValue(mock.environment);
    mock.httpService.get.and.returnValue(true);
    mock.httpService.post.and.returnValue(true);
  }

  function spyOnServiceMethod(method: string, value?: any): void {
    spyOn(scFeedbackService, method).and.returnValue(value);
  }

  function mocks(): void {
    mock = {
      api: 'mock api',
      get: 'feedback-status',
      post: 'feedback',
      module: { id: 1,  name: 'test' },
      feedback: { score: 5, comment: 'great' },
      environment: { MODULE_SERVICE: 'ms' },
      environmentsService: jasmine.createSpyObj('ScEnvironments', ['getCurrentEnvironment']),
      httpService: jasmine.createSpyObj('$http', ['get', 'post']),
      getEndpoint: buildEndpointUrl,
      input: {
        evil: 'test <script>console.log("hi")</script> test',
        nice: 'test  test'
      }
    };
  }

  function buildEndpointUrl(type: string): string {
    return `${mock.environment.MODULE_SERVICE}/modules/${mock.module.id}/${mock[type]}`;
  }

  function teardown(): void {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }
});
