import './index';
import 'angular-mocks';

import { ComponentTest } from '../utils/test.component';
import { ScFeedbackController } from './feedback.controller';

describe('ScFeedbackComponent', () => {
  let sut: ComponentTest<ScFeedbackController>;
  let mock: any;
  let vm: ScFeedbackController;

  beforeEach(setup);

  it('should set module name via attributes', () => {
    expect(vm.module.name).toEqual(mock.attributes.module.name);
  });

  it('should be minified if conditions are met', () => {
    let el = getElement('.solution-center-feedback');
    expect(el.hasClass('solution-center-feedback--minified')).toBe(false);
    //expect(el.hasClass('solution-center-feedback--closed')).toBe(false);

    vm.toggle();
    sut.$scope.$digest();

    el = getElement('.solution-center-feedback');
    expect(el.hasClass('solution-center-feedback--minified')).toBe(true);
  });

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    components();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.communicator');
    angular.mock.module('solutioncenter.feedback.app');
  }

  function components(): void {
    sut = newComponent();
    vm = createComponent();
  }

  function mocks(): void {
    mock = {
      attributes: {
        module: {
          name: 'TEST'
        }
      }
    };
  }

  function newComponent(): ComponentTest<ScFeedbackController> {
    return new ComponentTest<ScFeedbackController>(
      '<sc-feedback module="module"></sc-feedback>',
      'scFeedback'
    );
  }

  function createComponent(): ScFeedbackController {
    return sut.createComponent(mock.attributes);
  }

  function getElement(selector: string): angular.IAugmentedJQuery {
    return sut.element.find(selector);
  }

});
