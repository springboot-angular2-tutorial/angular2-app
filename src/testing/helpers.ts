import {inject, ComponentFixture, tick} from "@angular/core/testing";
import {AuthService} from "../app/core/services/auth.service";

export function login() {
  return inject([AuthService], (authService) => {
    spyOn(authService, 'isSignedIn').and.returnValue(true);
  });
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

