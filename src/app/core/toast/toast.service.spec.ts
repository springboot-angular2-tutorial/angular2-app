import {ToastService} from "./toast.service";
import {TestBed, inject} from "@angular/core/testing";

describe('ToastService', () => {

  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastService,
      ],
    });
  });
  beforeEach(inject([ToastService], (..._) => {
    [toastService] = _;
  }));

  it('can publish success message', (done) => {
    toastService.events.subscribe(toast => {
      expect(toast.message).toEqual('test');
      expect(toast.level).toEqual('success');
      done();
    });
    toastService.success("test");
  });

  it('can publish warning message', (done) => {
    toastService.events.subscribe(toast => {
      expect(toast.message).toEqual('test');
      expect(toast.level).toEqual('warning');
      done();
    });
    toastService.warning("test");
  });

  it('can publish error message', (done) => {
    toastService.events.subscribe(toast => {
      expect(toast.message).toEqual('test');
      expect(toast.level).toEqual('error');
      done();
    });
    toastService.error("test");
  });

});
