import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Local } from '../local';
import { LocaisService } from 'src/app/locais.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-locais-form',
  templateUrl: './locais-form.component.html',
  styleUrls: ['./locais-form.component.css']
})
export class LocaisFormComponent implements OnInit {

  local: Local;
  success: boolean = false;
  errors: String[];
  id: string;
  semImagemBase64: any = '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'

  constructor(
    private service: LocaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.local = new Local();
  }

  ngOnInit(): void {

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getLocalById(this.id)
          .subscribe(
            response => this.local = response,
            errorResponse => this.local = new Local(),
          )
      }
    });

    /*if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getLocalById(this.id)
      .subscribe( response => this.local = response,
        errorReponse => this.errors = ["Local n??o encontrado!"]
        );
    }*/
  }

  onSubmit() {

    if (this.validarLocal()) {
      if (this.id) {
        this.service
          .atualizar(this.local)
          .subscribe(response => {
            this.errors = null;
            this.success = true;
          }, errorResponse => {
            this.success = false;
            this.errors = ['Erro ao atualizar local.'];
          })
      } else {

        this.service
          .salvar(this.local)
          .subscribe(response => {
            this.errors = null;
            this.success = true;
            this.local = response;
          }, errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors
          });

      }
    }

  }

  cancelarCadastro() {
    this.router.navigate(['/locais/lista']);
  }

  async uploadFoto(event, item) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      (await this.service
        .upload(item, formData))
        .subscribe(response => this.ngOnInit());
      this.success = true;
    }
    //this.router.navigate(['/locais-form/'+this.local.id])
    //this.ngOnInit();
  }

  validarLocal() : boolean {

    this.errors = [];

    if (this.local.descricao === undefined) {
      this.errors.push("?? obrigat??rio informar a Descri????o");
    }
    if (this.local.razaoSocial === undefined) {
      this.local.razaoSocial = '';
    }
    if (this.local.telefone === undefined) {
      this.local.telefone = '';
    }
    if (this.local.telefoneFixo === undefined) {
      this.local.telefoneFixo = '';
    }
    if (this.local.email === undefined) {
      this.errors.push("?? obrigat??rio informar o Email");
    }
    if (this.local.observacao === undefined) {
      this.local.observacao = '';
    }
    if (this.local.coordenadaGps === undefined) {
      this.local.coordenadaGps = '';
    }
    if (this.local.pais === undefined) {
      this.local.pais = "Brasil";
    }
    if (this.local.estado === undefined) {
      this.errors.push("?? obrigat??rio informar o Estado")
    }
    if (this.local.municipio === undefined) {
      this.errors.push("?? obrigat??rio informar o Munic??pio")
    }
    if (this.local.bairro === undefined) {
      this.local.bairro = '';
    }
    if (this.local.tipologradouro === undefined) {
      this.local.tipologradouro = '';
    }
    if (this.local.logradouro === undefined) {
      this.local.logradouro = '';
    }
    if (this.local.numeroLogradouro === undefined) {
      this.local.numeroLogradouro = '';
    }
    if (this.local.complementoLogradouro === undefined) {
      this.local.complementoLogradouro = '';
    }
    if (this.local.cep === undefined) {
      this.local.cep = '';
    }

    if(this.errors.length > 0){
      return false;
    }
    return true;

  }
}
