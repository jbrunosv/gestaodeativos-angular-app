import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario;
  retorno: Usuario;
  loginError: string[] = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.usuario = new Usuario();
    this.retorno = new Usuario();
  }

  onSubmit() {

    /*if (!(this.usuario.nomeUsuarioLogin === null || this.usuario.senha === null || this.usuario.nomeUsuarioLogin === undefined || this.usuario.senha === undefined)) {
      */this.loginService.realizarLogin(this.usuario)
        .subscribe(
          response => {
            this.usuario = response,
              localStorage.setItem('id', response.id),
              localStorage.setItem('username', response.nomeUsuarioLogin),
              localStorage.setItem('nome', response.nomeCompleto),
              localStorage.setItem('tipoAcesso', response.tipoAcesso),
              this.router.navigate(['/home'])
          },
          erroResponse => {
            this.loginError = erroResponse.error.message;
            //this.errors = errorResponse.error.errors
          }
        )

      //this.router.navigate(['home'])
    /*}else{
      this.loginError = true;
    }*/
  }
}
