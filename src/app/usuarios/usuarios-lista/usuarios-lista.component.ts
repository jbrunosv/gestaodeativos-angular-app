import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/usuarios.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario;
  mensagemSucessoDelecao: string;
  mensagemErro: string;
  usuarioAdministrador: boolean = false;

  constructor(
    private service: UsuariosService,
    private router: Router
     ) { }

  ngOnInit(): void {

    if( !(localStorage.getItem('tipoAcesso') === "Administrador")){
      this.router.navigate(["/home"]);
    }

    this.service
    .getUsuarios()
    .subscribe( resposta => this.usuarios = resposta);
  }

  novoCadastro(){
    this.router.navigate(['/usuarios/form'])
  }

  preparaDelecao(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  deletarUsuario(){    
    this.service
        .deletarUsuarioPorId(this.usuarioSelecionado.id)
        .subscribe( 
          response => {
            this.mensagemSucessoDelecao = 'Usuário deletado com sucesso!',
            this.ngOnInit();
          },
          erro => this.mensagemErro = 'Ocorreu um erro ao deletar Usuário.'
      )
  }

}
