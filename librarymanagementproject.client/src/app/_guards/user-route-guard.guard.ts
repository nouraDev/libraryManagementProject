import { CanActivateFn } from '@angular/router';

export const userRouteGuardGuard: CanActivateFn = (route, state) => {
  return true;
};