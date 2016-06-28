namespace solutioncenter.feedback {

  class ScFeedback implements ng.IComponentOptions {

    public bindings: any;
    public controller: any;
    public template: Function | string;

    constructor() {
      this.bindings = {
        module: '<'
      };

      this.controller = ScFeedbackController;
      // this.template = 'feedback.html';
      this.template = '<div>Test</div>';
    }
  }

  angular
    .module('solutioncenter.feedback')
    .component('ScFeedback', new ScFeedback());
}


