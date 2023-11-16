import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const profileGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router)
  if(token){
    return true;
  }
  router.navigate(['auth'])
  return false;
};
