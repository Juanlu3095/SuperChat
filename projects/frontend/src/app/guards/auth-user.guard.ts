import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLibService } from 'auth-lib';
import { catchError, map, of } from 'rxjs';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthLibService) // Estas const deben ir dentro de la función o de una clase: https://angular.dev/errors/NG0203
  const router = inject(Router)

  return authService.verifyLogin().pipe(
    map((respuesta) => {
      console.log(respuesta)
      return true
    }),
    catchError((error) => {
      router.navigate([''])
      return of(false)
    })
  );
};

export const inverseAuthUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthLibService)
  const router = inject(Router)

  return authService.verifyLogin().pipe(
    map((respuesta) => {
      router.navigate(['/dashboard'])
      return false
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return of(true)
      }
      return of(false)
    })
  )
}
