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

  usuariosPaginados: Usuario[] = [];
  totalPages = 0;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];
  voltarPagina: boolean;

  nomeCompleto: string;
  nomeUsuarioLogin: string;

  constructor(
    private service: UsuariosService,
    private router: Router
     ) { }

  ngOnInit(): void {
    /*this.service
    .getUsuarios()
    .subscribe( resposta => this.usuarios = resposta);*/

    this.listarUsuarios(this.pagina, this.tamanho);
    if (this.pagina === 0) {
      this.voltarPagina = false;
    }
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

  listarUsuarios(pagina = 0, tamanho = 10) {
    this.service.getUsuariosPaginado(pagina, tamanho)
      .subscribe(
        response => {
          this.totalPages = response.totalPages;
          this.usuariosPaginados = response.content;
          this.totalElementos = response.totalElements;
          this.pagina = response.number;
        }
      )
  }

  proximaPagina() {
    if ((this.totalPages - 1) > this.pagina) {
      this.pagina += 1;
      this.voltarPagina = true;
      this.ngOnInit();
    }
  }

  paginaAnterior() {
    if (this.pagina > 0) {
      this.pagina -= 1;
      this.ngOnInit();
    }
  }

  buscaPaginada(pagina = 0, tamanho = 10) {
    this.service.getBuscaUsuariosPaginado(pagina, tamanho, this.nomeCompleto, this.nomeUsuarioLogin)
      .subscribe(
        response => {
          this.totalPages = response.totalPages;
          this.usuariosPaginados = response.content;
          this.totalElementos = response.totalElements;
          this.pagina = response.number;
        }
      )

    this.nomeCompleto = '';
    this.nomeUsuarioLogin = '';
  }

}
