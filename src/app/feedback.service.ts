namespace solutioncenter.feedback {

  export interface IScFeedbackService {
    submitFeedback(feedback: any): ng.IPromise <{}>;
  }

  export class ScFeedbackService implements IScFeedbackService {
    constructor(private $q: ng.IQService /*private $http: ng.IHttpService*/) {

    }

    submitFeedback(feedback: any): ng.IPromise <{}> {
      let defer = this.$q.defer();
      // TODO Change when backend endpoint is designed
      return defer.promise;
    }
  }

  angular
    .module('solutioncenter.feedback')
    .service('ScFeedbackService', ScFeedbackService);
}
