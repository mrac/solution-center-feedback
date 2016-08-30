import ScFeedbackService from './feedback.service';

const COOKIE_NAME = 'SC_FEEDBACK';

class ScFeedbackController {
  static $inject: Array<string> = ['$cookies', 'ScFeedbackService'];

  moduleId: number;
  moduleName: string;
  isAvailable: boolean = false;
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
    this.isFeedbackAvailable();
  }

  submit(): void {
    this.submitFeedback({ score: this.rating.actual, comment: this.comment });
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

  isFeedbackAvailable(): void {
    this.ScFeedbackService.isFeedbackAvailable(this.moduleId)
      .then((r: any) => this.isAvailable = r.data.feedbackAvailable)
      .catch((e: any) => this.error = e);
  }

  submitFeedback(feedback: any): void {
    this.ScFeedbackService.submitFeedback(this.moduleId, feedback)
      .then((r: any) => this.submitted = true)
      .catch((e: any) => this.error = e);
  }
}

export default ScFeedbackController;
