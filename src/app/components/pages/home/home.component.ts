import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ResponseApi } from 'src/app/shared/interfaces/response-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listaMenus: Menu[] = [];
  usuario: string = '';
  perfilUsuario: string = '';

  constructor(
    private router: Router,
    private _menuServicio: MenuService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {

    this._menuServicio.getMenu().subscribe({
      next: (resp) =>{
        if(resp.status){
          this.listaMenus = resp.data.map((item: Menu) => {
            return {
              menu: item.menu,
              pagina: `/home/${item.pagina}`
            }
          })
        }
      },
      error:(e)=>{
        console.log('Error al obtener el menú:', e);
      }
    })
  }

  cerrarSesion() {
    this._snackbar.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }
}
