import ScFeedbackService from './feedback.service';

const COOKIE_NAME = 'SC_FEEDBACK';

class ScFeedbackController {
  static $inject: Array<string> = ['$cookies', 'ScFeedbackService'];

  module: any;
  isAvailable: boolean = false;
  isMinified: boolean = false;
  submitted: boolean = false;
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
    let feedback: any = {
      score: this.rating,
      comment: this.comment
    };

    this.ScFeedbackService.submitFeedback(this.module.id, feedback)
      .then((r: any) => this.submitted = true)
      .catch((e: any) => console.log(e));
    // let feedback = {
    //   rating: this.rating,
    //   comment: this.comment
    // };

    this.submitted = true;

    // this.ScFeedbackService
    //   .submitFeedback(this.module.id, feedback)
    //   .then(
    //     () => {
    //       this.submitted = true;
    //     },
    //     () => {
    //       // TODO Handle error
    //     });
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
    this.ScFeedbackService.isFeedbackAvailable(this.module.id)
      .then((r: any) => this.isAvailable = r.data.feedbackAvailable)
      .catch((e: any) => console.log(e));
  }
}

export default ScFeedbackController;
