import {ScFeedbackService} from './feedback.service';

const COOKIE_NAME = 'SC_FEEDBACK';

export class ScFeedbackController {
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

  constructor(private $cookies: ng.cookies.ICookiesService,
              private ScFeedbackService: ScFeedbackService) {
    this.isMinified = this.$cookies.get(COOKIE_NAME) === 'true' || false;

    this.ScFeedbackService
      .isFeedbackAvailable(this.module.id)
      .then(
        (response) => {
          this.isAvailable = response.data.feedbackAvailable;
        },
        () => {
          // TODO Handle error
        }
      );
  }

  submit(): void {
    let feedback = {
      rating: this.rating,
      comment: this.comment
    };

    this.ScFeedbackService
      .submitFeedback(this.module.id, feedback)
      .then(
        () => {
          this.submitted = true;
        },
        () => {
          // TODO Handle error
        });
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
}
