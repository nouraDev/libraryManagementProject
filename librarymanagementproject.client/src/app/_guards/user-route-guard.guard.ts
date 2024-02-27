import { CanActivateFn } from '@angular/router';

export const userRouteGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
//je pense 3and mochkil fi providers hit makhadamach bi ngmodule khasni nzid had activate...