namespace solutioncenter.feedback {

  class ScFeedback implements ng.IComponentOptions {
    static $inject = ['$templateCache'];

    public bindings: any;
    public controller: string;
    public template: Function;

    constructor(private $templateCache: ng.ITemplateCacheService) {
      this.bindings = {
        module: '<'
      };

      this.controller = 'ScFeedbackController';
      this.template = () => this.$templateCache.get('feedback.html');
    }
  }

  angular
    .module('solutioncenter.feedback')
    .component('ScFeedback', ScFeedback);
}
