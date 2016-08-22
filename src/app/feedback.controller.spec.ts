import { ScFeedbackController } from './feedback.controller';
import { ScFeedbackService } from './feedback.service';

describe('ScFeedbackController', () => {
  let scFeedbackCtrl: ScFeedbackController;
  let mock: any;

  beforeEach(setup);

  describe('methods', () => {

    it('should submit feedback', () => {
      scFeedbackCtrl.submit();
      expect(ScFeedbackService.submit).toHaveBeenCalled();
      expect(scFeedbackCtrl.submitted).toBe(true);
    });

    it('should show feedback component', () => {
      scFeedbackCtrl.isMinified = true;
      scFeedbackCtrl.toggle();

      expect(scFeedbackCtrl.isMinified).toBe(false);
      expect(mock.cookieService.put).toHaveBeenCalledWith(
        mock.COOKIE_NAME,
        scFeedbackCtrl.isMinified
      );
    });

    it('should hide feedback component', () => {
      scFeedbackCtrl.isMinified = false;
      scFeedbackCtrl.toggle();

      expect(scFeedbackCtrl.isMinified).toBe(true);
      expect(mock.cookieService.put).toHaveBeenCalledWith(
        mock.COOKIE_NAME,
        scFeedbackCtrl.isMinified
      );
    });

  });

  /////////////////////////

  function setup(): void {
    mocks();
    modules();
    spies();
    instantiate();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.feedback', ($provide: any) => {
      $provide.value('$cookies', mock.cookieService);
    });
  }

  function spies(): void {
    spyOn(ScFeedbackService, 'submit').and.callThrough();
  }

  function instantiate(): void {
    scFeedbackCtrl = new ScFeedbackController(mock.cookieService);
  }

  function mocks(): void {
    mock = {
      COOKIE_NAME: 'SC_FEEDBACK',
      cookieService: jasmine.createSpyObj('mock.cookieService', ['get', 'put'])
    };
  }

});
