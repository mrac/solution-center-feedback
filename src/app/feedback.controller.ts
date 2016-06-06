namespace solutioncenter.feedback {

  interface IScFeedbackBindings {
    module: any;
  }

  class ScFeedbackController implements IScFeedbackBindings {
    static $inject = ['scFeedbackService', '$cookies', '$timeout'];

    private FEEDBACK_COOKIE_NAME: string = 'SC_FEEDBACK';

    public module: any;

    public isMinified: boolean;
    public hoverRating: number;
    public rating: number;
    public submitted: boolean;
    public hidden: boolean;
    public comment: string;

    constructor(private $cookies: ng.cookies.ICookiesService, private $timeout: ng.ITimeoutService, private ScFeedbackService: ScFeedbackService) {
      this.isMinified = this.$cookies.get(this.FEEDBACK_COOKIE_NAME) === 'true' || false;
      this.hoverRating = 0;
      this.rating = 0;
      this.submitted = false;
      this.hidden = false;
    }

    submitFeedback(): void {
      let feedback = {
        rating: this.rating,
        comment: this.comment
      };

      this.ScFeedbackService.submitFeedback(feedback)
        .then(
          (result: ng.IHttpPromiseCallbackArg<{}>) => {
            this.submitted = true;
            this.$timeout(() => this.hidden = true, 5000);
          },
          (result: ng.IHttpPromiseCallbackArg<{}>) => {
          }
        );
    };

    toggleMenu(): void {
      this.isMinified = !this.isMinified;
      this.$cookies.put(this.FEEDBACK_COOKIE_NAME, this.isMinified.toString());
    };

    setRating(newRating: number): void {
      this.rating = newRating;
      this.hoverRating = newRating;
    };

    updateRating(newRating: number): void {
      this.hoverRating = (newRating === 0) ? this.rating : newRating;
    };
  }

  angular
    .module('solutioncenter.feedback')
    .controller('ScFeedbackController',
      ['$cookies', '$timeout', 'ScFeedbackService',
        ($cookies, $timeout, ScFeedbackService) => new ScFeedbackController ($cookies, $timeout, ScFeedbackService)]);
}
