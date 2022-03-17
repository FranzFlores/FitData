import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    /*
    CanActivate: Es una interfaz que permite determinar si se puede accceder a la ruta. 
    */
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}