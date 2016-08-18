namespace solutioncenter.feedback {

  class ScFeedback implements ng.IComponentOptions {

    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public templateUrl: string;

    constructor()  {
      this.bindings = {
        module: '<'
      };

      this.controller = ScFeedbackController;
      this.controllerAs = 'ScFeedbackCtrl';
      this.templateUrl = '/src/views/feedback.html';
    }
  }

  angular
    .module('solutioncenter.feedback')
    .component('scFeedback', new ScFeedback());
}


