import './index';
import { ComponentTest } from '../util/test.component';
import ScFeedbackController from './feedback.controller';

import IAugmentedJQuery = angular.IAugmentedJQuery;

describe('ScFeedbackComponent', () => {
  let sut: ComponentTest<ScFeedbackController>;
  let mock: any;
  let vm: ScFeedbackController;
  let el: IAugmentedJQuery;

  beforeEach(setup);

  /**
   * Module ID
   */
  describe('module ID', () => {

    it('should set module ID via attributes', () => {
      expect(vm.moduleId).toEqual(mock.attributes.module.id);
    });
  });

  /**
   * Module name
   */
  describe('module name', () => {

    it('should set module name via attributes', () => {
      expect(vm.moduleName).toEqual(mock.attributes.module.name);
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

  /**
   * Rate
   */
  describe('rate', () => {
    let stars: IAugmentedJQuery;
    let rating: IAugmentedJQuery;

    beforeEach(() => {
      stars = getElement('.feedback__rating__star');
    });

    it('should set rating when a star is clicked', () => {
      rating = getEl();
      expect(rating.text()).toEqual(jasmine.stringMatching('0'));
      trigger(2, 'click');
      expect(rating.text()).toEqual(jasmine.stringMatching('3'));
    });

    it('should set hover value to passed value on mouse enter', () => {
      rating = getEl();
      expect(vm.rating.hover).toEqual(0);
      trigger(2, 'mouseenter');
      expect(vm.rating.hover).toEqual(3);
    });

    it('should set hover value to zero on mouse leave', () => {
      rating = getEl();
      expect(vm.rating.hover).toEqual(0);
      trigger(3, 'mouseenter');
      expect(vm.rating.hover).toEqual(2);
      trigger(3, 'mouseleave');
      expect(vm.rating.hover).toEqual(0);
    });

    /////////////////////////

    function trigger(index: number, type: string): void {
      angular.element(stars.get(index)).triggerHandler(type);
      sut.$scope.$digest();
      rating = getEl();
    }

    function getEl(): IAugmentedJQuery {
      return getElement('.feedback__rating__score');
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
          id: 0,
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
