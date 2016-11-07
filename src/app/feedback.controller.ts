import ScFeedbackService from './feedback.service';

const COOKIE_NAME = 'SC_FEEDBACK';

class ScFeedbackController {
  static $inject: Array<string> = ['$cookies', 'ScFeedbackService'];

  moduleName: string;
  isAvailable: boolean = false;
  onSubmit: (params: { feedback: any, moduleId: number }) => ng.IPromise<any>;
  moduleId: number;
  debugConfig: any;
  isMinified: boolean = false;
  submitted: boolean = false;
  error: any;
  comment: string = '';
  rating: any = {
    actual: 0,
    hover: 0
  };

  constructor(
    private $cookies: ng.cookies.ICookiesService,
    private ScFeedbackService: ScFeedbackService
  ) {
    this.isMinified = this.$cookies.get(COOKIE_NAME) === 'true' || false;
  }

  submit(): void {
    let comment = this.ScFeedbackService.sanitize(this.comment);
    this.submitFeedback({ score: this.rating.actual, comment: comment });
  }

  toggle(): void {
    this.isMinified = !this.isMinified;
    this.$cookies.put(COOKIE_NAME, this.isMinified.toString());
  }

  rate(rating: number): void {
    this.rating.actual = rating;
    this.rating.hover = rating;
  }

  update(rating: number): void {
    this.rating.hover = (rating === 0 && this.rating.actual) || rating;
  }

  submitFeedback(feedback: any): void {
    this.onSubmit({ feedback: feedback, moduleId: this.moduleId })
      .then(() => {
        this.submitted = true;
      }, (error: any) => {
        this.error = error;
        this.submitted = true;
      });
  }
}

export default ScFeedbackController;
