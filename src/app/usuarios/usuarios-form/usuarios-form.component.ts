import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Usuario } from '../usuario';
import { UsuariosService } from 'src/app/usuarios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  usuario: Usuario;
  success: boolean = false;
  errors: string[] = [];
  id: string;
  usuarioAdministrador: boolean = false;

  constructor(
     private service : UsuariosService,
     private router : Router,
     private activatedRoute : ActivatedRoute ) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {

    if( !(localStorage.getItem('tipoAcesso') === "Administrador")){
      this.router.navigate(["/home"]);
    }

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.service
        .getUsuarioById(this.id)
        .subscribe(
          response => this.usuario = response,
          errorResponse => this.usuario = new Usuario(),
        )
      }
    });
    
    /*if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getUsuarioById(this.id)
      .subscribe( response => this.usuario = response,
        errorReponse => this.errors = ["Usuario não encontrado!"]
        );
    }*/
  }

  onSubmit(){
    this.errors = [];

    if(this.id){
      this.service
      .atualizar(this.usuario)
      .subscribe( response => {
        this.errors = null;
        this.success = true;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.message;
      })
    }else{
      
      this.service
      .salvar(this.usuario)
      .subscribe( response => {
        this.errors = null;
        this.success = true;
        this.usuario = response;
      }, errorResponse => {
        this.success = false;
        console.log("Erros: "+ errorResponse.error.message);
        this.errors.push(errorResponse.error.message);
      });

    }
    
  }

  cancelarCadastro(){
    this.router.navigate(['/usuarios/lista']);
  }
}
