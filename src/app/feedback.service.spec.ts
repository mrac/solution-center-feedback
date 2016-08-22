import { ScFeedbackService } from './feedback.service';

describe('ScFeedbackService', () => {

  it('should submit feedback', () => {
    expect(ScFeedbackService.submit()).toBe(true);
  });

});
