import './index';
import { ComponentTest } from '../util/test.component';
import ScFeedbackController from './feedback.controller';

import IAugmentedJQuery = angular.IAugmentedJQuery;
import IInjectorService = angular.auto.IInjectorService;

describe('ScFeedbackComponent', () => {
  let service: any;
  let sut: ComponentTest<ScFeedbackController>;
  let mock: any;
  let vm: ScFeedbackController;
  let el: IAugmentedJQuery;
  let $q: angular.IQService;

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
   * Feedback available
   */
  describe('feedback available', () => {
    let openClass = 'solution-center-feedback--opened';
    let closeClass = 'solution-center-feedback--closed';

    it('should show component if feedback is available', () => {
      spyOnServiceMethod('isFeedbackAvailable', mock.feedbackAvailable);

      el = getEl();
      expect(el.hasClass(openClass)).toBe(false);
      isAvailable();
      expect(el.hasClass(openClass)).toBe(true);
    });

    // component is hidden by default. that's why both assertions check for `true`.
    // if this test was failing, the second assertion would be failing.
    it('should continue to hide component if feedback is not available', () => {
      spyOnServiceMethod('isFeedbackAvailable');  // mimic error

      el = getEl();
      expect(el.hasClass(closeClass)).toBe(true);
      isAvailable();
      expect(el.hasClass(closeClass)).toBe(true);
    });

    /////////////////////////

    function isAvailable(): void {
      callMethod('isFeedbackAvailable');
      el = getEl();
    }

    function getEl(): IAugmentedJQuery {
      return getElement('.solution-center-feedback');
    }
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

      spyOnServiceMethod('submitFeedback', true);
      callMethod('submit');

      els.forEach((selector: string) => {
        expect(getElement(selector).length).toBe(0);
      });
    });

    it('should show thank you message', () => {
      expect(getEl().length).toBe(0);

      spyOnServiceMethod('submitFeedback', true);
      callMethod('submit');

      expect(getEl().length).toBe(1);
    });

    it('should not submit if error is encountered', () => {
      expect(vm.submitted).toBe(false);

      spyOnServiceMethod('submitFeedback');   // mimic error
      callMethod('submit');

      expect(vm.submitted).toBe(false);
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
    injectors();
    components();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback.app');
  }

  function injectors(): void {
    angular.mock.inject(($injector: IInjectorService) => {
      $q = $injector.get('$q');
      service = $injector.get('ScFeedbackService');
    });
  }

  function spyOnServiceMethod(method: string, value?: any): void {
    let response = (value && $q.when(value)) || $q.reject({ msg: 'Error'});
    spyOn(service, method).and.returnValue(response);
  }

  function components(): void {
    sut = newComponent();
    vm = createComponent();
  }

  function mocks(): void {
    mock = {
      attributes: {
        module: {
          id: 1,
          name: 'TEST'
        }
      },
      feedbackAvailable: {
        data: {
          feedbackAvailable: true
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
