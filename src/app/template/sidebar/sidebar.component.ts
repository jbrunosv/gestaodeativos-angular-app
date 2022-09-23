import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioAdministrador: boolean = false;

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('tipoAcesso') === "Administrador"){
      this.usuarioAdministrador = true;
    }
  }
  sair(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
