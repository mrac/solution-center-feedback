import { ScFeedbackService } from './feedback.service';

const COOKIE_NAME = 'SC_FEEDBACK';

export class ScFeedbackController {
  static $inject: Array<string> = ['$cookies'];

  module: any;
  isMinified: boolean = false;
  hidden: boolean = false;
  submitted: boolean = false;
  comment: string = '';
  rating: any = {
    actual: 0,
    hover: 0
  };

  constructor(private $cookies: ng.cookies.ICookiesService) {
    this.isMinified = this.$cookies.get(COOKIE_NAME) === 'true' || false;
  }

  submit(): void {
    this.submitted = ScFeedbackService.submit();
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
