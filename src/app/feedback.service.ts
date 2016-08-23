export class ScFeedbackService {

  static $inject: Array<string> = ['$http', 'ScEnvironments'];

  environment: any;

  feedbackAvailable: string = '/modules/{}/feedback-status'; // GET
  sendFeedback: string = '/modules/{}/feedback'; // POST

  constructor(private $http: ng.IHttpService, private ScEnvironments: any) {
    this.environment = ScEnvironments.getCurrentEnvironment();
  }

  isFeedbackAvailable(moduleId: number): ng.IPromise<any> {
    return this.$http.get(this.buildEndpointUrl(this.feedbackAvailable, moduleId));
  }

  submitFeedback(moduleId: number, feedback: any): ng.IPromise<any> {
    return this.$http.post(this.buildEndpointUrl(this.sendFeedback, moduleId), feedback);
  }

  buildEndpointUrl(endpoint: string, args: any): string {
    if (endpoint && args.length > 1) {
      args.forEach((arg: any) => {
        endpoint = endpoint.replace('{}', arg);
      });
    }

    return this.environment + endpoint;
  }
}
