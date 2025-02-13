import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../servicios/token.service';


@Injectable({
  providedIn: 'root'
})
export class RolesService {


  status: string = "";


  constructor(private tokenService: TokenService, private router: Router) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.tokenService.isLogged()) {
      this.router.navigate(["/login"]);
      return false;
    }
    if (this.tokenService.hasExpiredLogin())
      return false;


    return true;
  }


}

export const RolesGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RolesService).canActivate(next, state);
}
