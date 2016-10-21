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
    return this.$http.get(this.buildEndpointUrl('get', moduleId));
  }

  submitFeedback(moduleId: number, feedback: any): ng.IPromise<any> {
    return this.$http.post(this.buildEndpointUrl('post', moduleId), feedback);
  }

  buildEndpointUrl(type: string, moduleId: number): string {
    return `${this.environment.MODULE_SERVICE}/modules/${moduleId}/${this[type]}`;
  }

  sanitize(str: string): string {
    let pattern = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;
    return str.replace(pattern, '');
  }
}

export default ScFeedbackService;
