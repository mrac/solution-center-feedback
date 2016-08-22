import 'angular';
import 'angular-mocks';

import { selector, config } from './feedback.component';
import { ScFeedbackController } from './feedback.controller';

describe('ScFeedbackComponent', () => {

  beforeEach(setup);

  it('should set selector name', () => {
    expect(selector).toEqual('scFeedback');
  });

  it('should define controller', () => {
    expect(config.controller).toEqual(ScFeedbackController);
  });

  /////////////////////////

  function setup(): void {
    modules();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback');
  }

});
