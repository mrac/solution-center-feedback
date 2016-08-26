import scc = ScCommunicator;

class ScFeedbackService {
  static $inject: Array<string> = ['$http', 'ScEnvironments'];

  environment: scc.Environment;
  get: string = 'feedback-status';
  post: string = 'feedback';

  constructor(
    private $http: ng.IHttpService,
    private ScEnvironments: scc.ScEnvironmentsProvider
  ) {
    this.environment = ScEnvironments.getCurrentEnvironment();
  }

  isFeedbackAvailable(moduleId: number): ng.IPromise<any> {
    this.get = this.buildEndpointUrl('get', moduleId);
    return this.$http.get(this.get);
  }

  submitFeedback(moduleId: number, feedback: any): ng.IPromise<any> {
    this.post = this.buildEndpointUrl('post', moduleId);
    return this.$http.post(this.post, feedback);
  }

  buildEndpointUrl(type: string, moduleId: number): string {
    return `${this.environment.MODULE_SERVICE}/modules/${moduleId}/${this[type]}`;
  }
}

export default ScFeedbackService;
