import {inject} from "@angular/core/testing";
import {Router} from "@angular/router-deprecated";
import {ReflectiveInjector, provide} from "@angular/core";
import {appInjector} from "../../app";
import {LoginService, UserService} from "../services";

export function login() {
  return inject([LoginService], (loginService) => {
    spyOn(loginService, 'isSignedIn').and.returnValue(true);
  });
}

export function prepareAppInjector():Function {
  return inject([UserService, LoginService, Router], (userService, loginService, router) => {
    appInjector(ReflectiveInjector.resolveAndCreate([
      provide(UserService, {useValue: userService}),
      provide(LoginService, {useValue: loginService}),
      provide(Router, {useValue: router}),
    ]));
  });
}
