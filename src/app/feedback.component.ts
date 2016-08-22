import { ScFeedbackController } from './feedback.controller';

const selector = 'scFeedback';
const config: ng.IComponentOptions = {
  template: require('../views/feedback.html'),
  controller: ScFeedbackController
};

export { selector, config };
