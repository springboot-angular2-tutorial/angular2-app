import {Directive, ElementRef, DynamicComponentLoader} from "angular2/core";
import {Router, RouterOutlet, ComponentInstruction} from "angular2/router";
import {makeDecorator} from "angular2/src/core/util/decorators";
import {reflector} from "angular2/src/core/reflection/reflection";
import {LoginService} from "app/services";

@Directive({
  selector: 'router-outlet',
})
export class SecurityRouterOutlet extends RouterOutlet {

  private parentRouter;

  constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
              _parentRouter:Router, nameAttr:string,
              private loginService:LoginService) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.parentRouter = _parentRouter;
  }

  activate(next:ComponentInstruction):Promise<any> {
    const publicPageMeta = reflector.annotations(next.componentType)
      .filter(a => a instanceof PublicPageMetadata)[0];
    if (publicPageMeta) {
      if (!this.loginService.currentUser()) return super.activate(next);
      if (!publicPageMeta.whenSignedIn) return super.activate(next);
      publicPageMeta.whenSignedIn(this.parentRouter);
      return super.activate(next);
    }

    const privatePageMeta = reflector.annotations(next.componentType)
      .filter(a => a instanceof PrivatePageMetadata)[0];
    if (privatePageMeta) {
      if (this.loginService.currentUser()) return super.activate(next);
      privatePageMeta.whenNotSignedIn(this.parentRouter);
      return;
    }

    return super.activate(next);
  }
}

class PublicPageMetadata {

  whenSignedIn:(router:Router) => void;

  constructor({whenSignedIn}:{whenSignedIn?:(router:Router) => void} = {}) {
    this.whenSignedIn = whenSignedIn;
  }

}
export const PublicPage = makeDecorator(PublicPageMetadata);

class PrivatePageMetadata {

  whenNotSignedIn:(router:Router) => void;

  constructor({whenNotSignedIn}:{whenNotSignedIn?:(router:Router) => void} = {
    whenNotSignedIn: (r) => {
      r.navigate(['/Login']);
    }
  }) {
    this.whenNotSignedIn = whenNotSignedIn;
  }
}
export const PrivatePage = makeDecorator(PrivatePageMetadata);
