import './index';
import 'angular';
import 'angular-mocks';

import { ComponentTest } from '../utils/test.component';
import { ScFeedbackController } from './feedback.controller';

import 'phantomjs-polyfill';

describe('ScFeedbackComponent', () => {
  let sut: ComponentTest<ScFeedbackController>;

  beforeEach(angular.mock.module('solutioncenter.feedback.app'));
  beforeEach(() => {
    sut = newComponent();
  });

  it('should set module via attributes', () => {
    let attributes: any = { module: { name: 'TEST' }};
    let vm: ScFeedbackController = sut.createComponent(attributes);
    expect(vm.module.name).toEqual('TEST');
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

  function newComponent(): ComponentTest<ScFeedbackController> {
    return new ComponentTest<ScFeedbackController>(
      '<sc-feedback module="module"></sc-feedback>',
      'scFeedback'
    );
  }

});
