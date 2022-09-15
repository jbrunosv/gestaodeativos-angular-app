import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const authenticated = this.authService.isAuthenticated(); //Vai verificar no AuthService se o usuário está autenticado e salva o booleano em uma constante

    if (authenticated) { //Se verdadeiro, dá permissão pra acessar a página
      return true;
    } else { //Senão redireciona para a página de login
      this.route.navigate(['/login']);
    }
  }

}
