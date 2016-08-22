import { ScFeedbackController } from './feedback.controller';

const selector = 'scFeedback';
const config: ng.IComponentOptions = {
  bindings: {
    module: '<'
  },
  template: require('../views/feedback.html'),
  controller: ScFeedbackController
};

export { selector, config };
