import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userRouteGuardGuard } from './user-route-guard.guard';

describe('userRouteGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userRouteGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
