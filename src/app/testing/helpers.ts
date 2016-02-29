import {inject} from "angular2/testing";
import {User} from "app/interfaces";
import {LoginService} from "app/services";

export function signin(user:User = {id: 1, email: 'test@test.com'}) {
  return inject([LoginService], (loginService) => {
    spyOn(loginService, 'isSignedIn').and.returnValue(true);
  });
}
