/*
import { ScFeedbackController } from './feedback.controller';
// import { ScFeedbackService } from './feedback.service';

describe('ScFeedbackController', () => {
  let $ctrl: ScFeedbackController;
  let scFeedbackService: any;
  let mock: any;

  beforeEach(setup);

  /!**
   * Show/hide module
   *!/
  describe('show/hide', () => {

    it('should show feedback component', () => {
      $ctrl.isMinified = true;
      $ctrl.toggle();

      expect($ctrl.isMinified).toBe(false);
      expect(mock.cookieService.put).toHaveBeenCalledWith(
        mock.COOKIE_NAME,
        $ctrl.isMinified.toString()
      );
    });

    it('should hide feedback component', () => {
      $ctrl.isMinified = false;
      $ctrl.toggle();

      expect($ctrl.isMinified).toBe(true);
      expect(mock.cookieService.put).toHaveBeenCalledWith(
        mock.COOKIE_NAME,
        $ctrl.isMinified.toString()
      );
    });

  });

  /!**
   * Rate
   *!/
  describe('rate', () => {

    beforeEach(() => {
      $ctrl.rating.actual = 0;
      $ctrl.rating.hover = 0;
    });

    it('should set actual and hover rating values', () => {
      $ctrl.rate(2);
      expect($ctrl.rating.actual).toBe(2);
      expect($ctrl.rating.hover).toBe(2);
    });

    it('should set hover value to rating value if rating is zero', () => {
      expect($ctrl.rating.hover).toBe(0);

      $ctrl.rating.actual = 4;
      $ctrl.update(0);

      expect($ctrl.rating.hover).toBe(4);
    });

    it('should set hover value to passed value if rating is greater than zero', () => {
      expect($ctrl.rating.hover).toBe(0);
      $ctrl.update(3);
      expect($ctrl.rating.hover).toBe(3);
    });

  });

  /!**
   * Submit
   *!/
  describe('submit', () => {

    it('should submit feedback', () => {
      $ctrl.submit();
      expect(scFeedbackService.submitFeedback).toHaveBeenCalled();
      expect($ctrl.submitted).toBe(true);
    });

  });

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    injectors();
    spies();
    instantiate();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback', ($provide: any) => {
      $provide.value('$cookies', mock.cookieService);
    });
  }

  function injectors(): void {
    inject(
      ($injector: ng.auto.IInjectorService) => {
        scFeedbackService = $injector.get('ScFeedbackService');
      });
  }

  function spies(): void {
    spyOn(scFeedbackService, 'submitFeedback').and.callThrough();
  }

  function instantiate(): void {
    $ctrl = new ScFeedbackController(mock.cookieService, scFeedbackService);
  }

  function mocks(): void {
    mock = {
      COOKIE_NAME: 'SC_FEEDBACK',
      cookieService: jasmine.createSpyObj('mock.cookieService', ['get', 'put'])
    };
  }
});
*/
