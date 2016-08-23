// import { ScFeedbackController } from './feedback.controller';
//
// const selector = 'scFeedback';
// const config: ng.IComponentOptions = {
//   bindings: {
//     module: '<'
//   },
//   template: require('../views/feedback.html'),
//   controller: ScFeedbackController
// };
//
// export { selector, config };

import { ScFeedbackController } from './feedback.controller';

class ScFeedbackComponent implements ng.IComponentOptions {
  bindings: any = { module: '<' };
  template: string = require('../views/feedback.html');
  controller: Function = ScFeedbackController;
}

export default ScFeedbackComponent;
