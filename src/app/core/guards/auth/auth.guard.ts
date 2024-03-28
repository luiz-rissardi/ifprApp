import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { getUserNameStorage } from '../../storage/sessionStorage';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router(); 
  const userExists = getUserNameStorage();
  if(userExists){
    return true
  }else{
    router.navigate(['/auth']);
    return false;
  }
};
