import { ScFeedbackService } from './feedback.service';

const COOKIE_NAME = 'SC_FEEDBACK';

export class ScFeedbackController {
  static $inject: Array<string> = ['$cookies'];

  isMinified: any;
  hidden: boolean = false;
  submitted: boolean = false;

  constructor(private $cookies: ng.cookies.ICookiesService) {
    this.isMinified = this.$cookies.get(COOKIE_NAME) || false;
  }

  submit(): void {
    this.submitted = ScFeedbackService.submit();
  }

  toggle(): void {
    this.isMinified = !this.isMinified;
    this.$cookies.put(COOKIE_NAME, this.isMinified);
  }
}
