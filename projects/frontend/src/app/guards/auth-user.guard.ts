import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLibService } from 'auth-lib';
import { catchError, map, of } from 'rxjs';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthLibService)
  const router = inject(Router)

  return authService.verifyLogin().pipe(
    map((respuesta) => {
      return true
    }),
    catchError((error) => {
      router.navigate([''])
      return of(false)
    })
  );
};
