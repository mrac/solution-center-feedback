import './index';
import ComponentTest from '../util/test.component';
import ScFeedbackController from './feedback.controller';

import IAugmentedJQuery = angular.IAugmentedJQuery;
import IInjectorService = angular.auto.IInjectorService;

describe('ScFeedbackComponent', () => {
  let sut: ComponentTest<ScFeedbackController>;    // sut = system under test
  let vm: ScFeedbackController;
  let el: IAugmentedJQuery;
  let $q: angular.IQService;
  let mock: any;

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
   * Feedback available
   */
  describe('feedback available', () => {
    let openClass = 'solution-center-feedback--opened';
    let closeClass = 'solution-center-feedback--closed';

    it('should show component if feedback is available', () => {
      vm.isAvailable = false;
      sut.$scope.$digest();
      el = getEl();

      expect(el.hasClass(openClass)).toBe(false);

      spyOnServiceMethod('isFeedbackAvailable', mock.isAvailable);
      isAvailable();

      expect(el.hasClass(openClass)).toBe(true);
    });

    // component is hidden by default. that's why both assertions check for `true`.
    // if this test was failing, the second assertion would be failing.
    it('should hide component if feedback is not available', () => {
      vm.isAvailable = false;
      sut.$scope.$digest();
      el = getEl();

      expect(el.hasClass(closeClass)).toBe(true);

      spyOnServiceMethod('isFeedbackAvailable', mock.isNotAvailable);
      isAvailable();

      expect(el.hasClass(closeClass)).toBe(true);
    });

    it('should populate error object if error is encountered', () => {
      expect(vm.error).toBeUndefined();

      spyOnServiceMethod('isFeedbackAvailable');  // mimic error response
      isAvailable();

      expect(vm.error).toBeDefined();
    });

    /////////////////////////

    function isAvailable(): void {
      callMethod('isFeedbackAvailable');
      el = getEl();
    }

    function getEl(): IAugmentedJQuery {
      return getElement(mock.rootCssClass);
    }
  });

  /**
   * Minify and maximize
   */
  describe('minify and maximize', () => {
    let minClass = 'solution-center-feedback--minified';

    it('should minify element', () => {
      vm.isMinified = false;
      sut.$scope.$digest();
      el = getEl();

      expect(el.hasClass(minClass)).toBe(false);

      toggle();

      expect(vm.isMinified).toBe(true);
      expect(el.hasClass(minClass)).toBe(true);
      expect(mock.cookieService.put).toHaveBeenCalledWith(
        mock.COOKIE_NAME,
        vm.isMinified.toString()
      );
    });

    it('should maximize element', () => {
      vm.isMinified = true;
      sut.$scope.$digest();
      el = getEl();

      expect(el.hasClass(minClass)).toBe(true);

      toggle();

      expect(vm.isMinified).toBe(false);
      expect(el.hasClass(minClass)).toBe(false);
      expect(mock.cookieService.put).toHaveBeenCalledWith(
        mock.COOKIE_NAME,
        vm.isMinified.toString()
      );
    });

    /////////////////////////

    function toggle(): void {
      callMethod('toggle');
      el = getEl();
    }

    function getEl(): IAugmentedJQuery {
      return getElement(mock.rootCssClass);
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

    it('should not submit feedback if error is encountered', () => {
      expect(vm.submitted).toBe(false);
      expect(getEl().length).toBe(0);

      spyOnServiceMethod('submitFeedback');   // mimic error response
      callMethod('submit');

      expect(vm.submitted).toBe(false);
      expect(getEl().length).toBe(0);
    });

    it('should populate error object if error is encountered', () => {
      expect(vm.error).toBeUndefined();

      spyOnServiceMethod('submitFeedback');   // mimic error response
      callMethod('submit');

      expect(vm.error).toBeDefined();
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
    let button: IAugmentedJQuery;
    let scoreSelector = '.feedback__rating__score';

    beforeEach(() => {
      stars = getElement('.feedback__rating__star');
    });

    it('should set rating when a star is clicked', () => {
      rating = getEl(scoreSelector);
      expect(rating.text()).toEqual(jasmine.stringMatching('0'));
      expect(vm.rating.actual).toBe(0);

      trigger(2, 'click');

      expect(rating.text()).toEqual(jasmine.stringMatching('3'));
      expect(vm.rating.actual).toBe(3);
    });

    it('should set hover value to passed value on mouse enter', () => {
      rating = getEl(scoreSelector);
      expect(vm.rating.hover).toEqual(0);
      trigger(2, 'mouseenter');
      expect(vm.rating.hover).toEqual(3);
    });

    it('should set hover value to zero on mouse leave', () => {
      rating = getEl(scoreSelector);
      expect(vm.rating.hover).toEqual(0);
      trigger(3, 'mouseenter');
      expect(vm.rating.hover).toEqual(2);
      trigger(3, 'mouseleave');
      expect(vm.rating.hover).toEqual(0);
    });

    it('should disable submit button if no rating has been given', () => {
      rate(2);
      expect(button.hasClass('dc-btn--disabled')).toBe(false);
      rate(0);
      expect(button.hasClass('dc-btn--disabled')).toBe(true);
    });

    it('should enable submit button if a rating has been given', () => {
      rate(0);
      expect(button.hasClass('dc-btn--primary')).toBe(false);
      rate(2);
      expect(button.hasClass('dc-btn--primary')).toBe(true);
    });

    /////////////////////////

    function trigger(index: number, type: string): void {
      angular.element(stars.get(index)).triggerHandler(type);
      sut.$scope.$digest();
      rating = getEl(scoreSelector);
    }

    function rate(r: number): void {
      vm.rating.actual = r;
      sut.$scope.$digest();
      button = getEl('.dc-btn');
    }

    function getEl(selector: string): IAugmentedJQuery {
      return getElement(selector);
    }
  });

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    injectors();
    spies();
    components();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback.app', ($provide: any) => {
      $provide.value('$cookies', mock.cookieService);
      $provide.value('ScFeedbackService', mock.feedbackService);
    });
  }

  function injectors(): void {
    angular.mock.inject(($injector: IInjectorService) => {
      $q = $injector.get('$q');
    });
  }

  function spies(): void {
    spyOnServiceMethod('isFeedbackAvailable', mock.isAvailable);
    spyOnCookieMethod('get', false);
  }

  function spyOnServiceMethod(method: string, value?: any): void {
    let response = (value && $q.when(value)) || $q.reject({ code: 401, msg: 'Error'});
    mock.feedbackService[method].and.returnValue(response);
  }

  function spyOnCookieMethod(method: string, value: boolean): void {
    mock.cookieService[method].and.returnValue(value.toString());
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
      },
      isAvailable: {
        data: {
          feedbackAvailable: true
        }
      },
      isNotAvailable: {
        data: {
          feedbackAvailable: false
        }
      },
      feedbackService: jasmine.createSpyObj('ScFeedbackService', [
        'isFeedbackAvailable',
        'submitFeedback'
      ]),
      COOKIE_NAME: 'SC_FEEDBACK',
      cookieService: jasmine.createSpyObj('mock.cookieService', ['get', 'put']),
      rootCssClass: '.solution-center-feedback'
    };
  }

  function newComponent(): ComponentTest<ScFeedbackController> {
    return new ComponentTest<ScFeedbackController>(
      '<sc-feedback module-id="module.id" module-name="module.name"></sc-feedback>',
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
