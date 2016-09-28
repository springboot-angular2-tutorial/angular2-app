import {inject, ComponentFixture, tick} from "@angular/core/testing";
import {LoginService} from "../../app/core/services/login.service";

export function login() {
  return inject([LoginService], (loginService) => {
    spyOn(loginService, 'isSignedIn').and.returnValue(true);
  });
}

export function advance(fixture:ComponentFixture<any>):void {
  tick();
  fixture.detectChanges();
}

