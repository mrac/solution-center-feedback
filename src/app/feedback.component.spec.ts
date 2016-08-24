import './index';
import 'angular-mocks';

import { ComponentTest } from '../utils/test.component';
import { ScFeedbackController } from './feedback.controller';

import IAugmentedJQuery = angular.IAugmentedJQuery;

describe('ScFeedbackComponent', () => {
  let sut: ComponentTest<ScFeedbackController>;
  let mock: any;
  let vm: ScFeedbackController;
  let el: IAugmentedJQuery;

  beforeEach(setup);

  /**
   * Module name
   */
  describe('module name', () => {

    it('should set module name via attributes', () => {
      expect(vm.module.name).toEqual(mock.attributes.module.name);
    });

    it('should show module name in view', () => {
      el = getElement('.feedback__title--lower');
      expect(el.text()).toEqual(jasmine.stringMatching(mock.attributes.module.name));
    });
  });

  /**
   * Minify and maximize
   */
  describe('minify and maximize', () => {
    let minClass = 'solution-center-feedback--minified';

    it('should minify element', () => {
      el = getEl();
      expect(el.hasClass(minClass)).toBe(false);
      toggle();
      expect(el.hasClass(minClass)).toBe(true);
    });

    it('should maximize element', () => {
      el = getEl().addClass(minClass);
      expect(el.hasClass(minClass)).toBe(true);
      toggle();
      expect(el.hasClass(minClass)).toBe(false);
    });

    /////////////////////////

    function toggle(): void {
      callMethod('toggle');
      el = getEl();
    }

    function getEl(): IAugmentedJQuery {
      return getElement('.solution-center-feedback');
    }
  });

  /**
   * If submitted
   */
  describe('if submitted', () => {
    let els: Array<string>;

    beforeAll(() => {
      els = ['.feedback__title', '.feedback__rating', '.feedback__comment', '.feedback__later'];
    });

    it('should not display certain elements', () => {
      els.forEach((selector: string) => {
        expect(getElement(selector).length).toBe(1);
      });

      callMethod('submit');

      els.forEach((selector: string) => {
        expect(getElement(selector).length).toBe(0);
      });
    });

    it('should show thank you message', () => {
      expect(getEl().length).toBe(0);
      callMethod('submit');
      expect(getEl().length).toBe(1);
    });

    /////////////////////////

    function getEl(): IAugmentedJQuery {
      return getElement('.feedback__submitted');
    }
  });

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    components();
  }

  function modules(): void {
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

  function getElement(selector: string): IAugmentedJQuery {
    return sut.element.find(selector);
  }

  function callMethod(method: string): void {
    vm[method]();
    sut.$scope.$digest();
  }

});
