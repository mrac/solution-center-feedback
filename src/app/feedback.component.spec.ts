import './index';
import 'angular';
import 'angular-mocks';

import { ComponentTest } from '../utils/test.component';
// import 'phantomjs-polyfill';
import { ScFeedbackController } from './feedback.controller';

describe('ScFeedbackComponent', () => {
  let sut: ComponentTest<ScFeedbackController>;

  beforeEach(angular.mock.module('solutioncenter.feedback.app'));
  beforeEach(() => {
    sut = new ComponentTest<ScFeedbackController>('<sc-feedback module="module"></sc-feedback>', 'scFeedback');
  });

  it('should', () => {
    console.log('======= sut', sut);
    let attributes: any = { module: { name: 'SC' }};
    let vm: ScFeedbackController = sut.createComponent(attributes);
    console.log(vm);
    //console.log(attributes);
  });

  // it('should set selector name', () => {
  //   expect(selector).toEqual('scFeedback');
  // });
  //
  // it('should define controller', () => {
  //   expect(config.controller).toEqual(ScFeedbackController);
  // });

  /////////////////////////

  // function setup(): void {
  //   modules();
  //   //mocks();
  // }
  //
  // function modules(): void {
  //   angular.mock.module('solutioncenter.feedback');
  // }

  // function mocks(): void {
  //   sut = new ComponentTest<ScFeedbackController>('<sc-feedback module="module"></sc-feedback>', 'scFeedback');
  // }

});
