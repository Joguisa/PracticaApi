import { Component, OnInit } from '@angular/core';
import { TableColumnModel } from 'src/app/shared/components/models/table-column.model';
import { Usuario } from '../../interfaces/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfigModel } from 'src/app/shared/components/models/table-config.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TableActionsModel } from 'src/app/shared/components/models/table-actions.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/TABLE_ACTION.enum';
import { ConfirmService } from 'src/app/shared/components/services/confirm.service';
import { UsuariosService } from '../../services/usuarios.service';
import { DialogUsuarioComponent } from '../../dialogs/dialog-usuario/dialog-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  nombreBoton : string = 'Agregar';
  tableColumns: TableColumnModel[] = [];
  dataInicio: Usuario[] = [];
  dataListUsuario = new MatTableDataSource(this.dataInicio);

  tableConfig: TableConfigModel = {
    isPaginable: true,
    showActions: true,
  };

  setTableColumns() {
    this.tableColumns = [
      { label: 'id', def: 'id', datakey: 'id'},
      { label: 'Nombres', def: 'nombre', datakey: 'nombre' },
      { label: 'Apellidos', def: 'apellido', datakey: 'apellido' },
      { label: 'Usuario', def: 'usuario', datakey: 'usuario' },
      { label: 'Correo', def: 'correo', datakey: 'correo' },
      { label: 'Clave', def: 'clave', datakey: 'clave' },
    ];
  }

  constructor( public _dialog: MatDialog, 
    private _utilidadServicio: SnackbarService,
    private _confirmServicio: ConfirmService,
    private _usuarioServicio: UsuariosService){}

  ngOnInit(): void {
    this.mostrarUsuarios();
    this.setTableColumns();
  }

    mostrarUsuarios(){
      this._usuarioServicio.lista().subscribe({
        next: (resp) => {
          if(resp.status){
            this.dataListUsuario.data = resp.data;
          } else {
            this._utilidadServicio.mostrarAlerta('No se encontraron registros', '')
          }
        },
        error:(e) =>{}
      })
    }

    agregarUsuario(){
      this._dialog.open(
        DialogUsuarioComponent, {
          disableClose: true,
        }
      ).afterClosed().subscribe(
        (resultado) => {
          if(resultado === 'true'){
            this.mostrarUsuarios();
          }
        }
      )
    }

    editarUsuario(usuario:Usuario){
      this._dialog
      .open(DialogUsuarioComponent, {
        disableClose: true,
        data: usuario,
      })
      .afterClosed()
      .subscribe(resultado => {
        if(resultado === "true"){
          this.mostrarUsuarios();
        }
      })
    }

    eliminarUsuario(usuario:Usuario){
      this._confirmServicio
      .confirmDialog({
        title: '¿Está usted seguro?',
        message: 'Se eliminará el usuario: ',
        datos: usuario.nombre,
        confirmText: 'Si, eliminar',
        cancelText: 'No, volver',
      })
      .subscribe((resultado) => {
        if(resultado) {
          this._usuarioServicio
          .eliminar(usuario.id)
          .subscribe(()=> {
            this._utilidadServicio.mostrarAlerta('El usuario fue eliminado','')
            this.mostrarUsuarios();
          })
        } else {
          this._utilidadServicio.mostrarAlerta(
              'El paciente no fue eliminado',
              ''
            );
        }
      })
    }

    onTableAction(tableAction: TableActionsModel) {
      switch (tableAction.action) {
        case TABLE_ACTION.EDIT:
          this.editarUsuario(tableAction.element);
          break;
        case TABLE_ACTION.DELETE:
          this.eliminarUsuario(tableAction.element);
          break;
      }
    }

    aplicarFiltroTabla(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataListUsuario.filter = filterValue.trim().toLocaleLowerCase();
    }

}
