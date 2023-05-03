import { Component, OnInit } from '@angular/core';
import { TableColumnModel } from 'src/app/shared/components/models/table-column.model';
import { Perfil } from '../../interfaces/perfil';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfigModel } from 'src/app/shared/components/models/table-config.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ConfirmService } from 'src/app/shared/components/services/confirm.service';
import { PerfilesService } from '../../services/perfiles.service';
import { DialogPerfilComponent } from '../../dialogs/dialog-perfil/dialog-perfil.component';
import { TableActionsModel } from 'src/app/shared/components/models/table-actions.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/TABLE_ACTION.enum';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit{
  nombreBoton : string = 'Agregar';
  tableColumns: TableColumnModel[] = [];
  dataInicio: Perfil[] = [];
  dataListPerfil = new MatTableDataSource(this.dataInicio);

  tableConfig: TableConfigModel = {
    isPaginable: true,
    showActions: true,
  };

  setTableColumns() {
    this.tableColumns = [
      { label: 'id', def: 'id', datakey: 'id'},
      { label: 'Descripción', def: 'descripcion', datakey: 'descripcion' },
    ];
  }

  constructor( public _dialog: MatDialog, 
    private _utilidadServicio: SnackbarService,
    private _confirmServicio: ConfirmService,
    private _perfilServicio: PerfilesService){}

    ngOnInit(): void {
      this.mostrarPerfiles();
      this.setTableColumns();
    }

    mostrarPerfiles(){
      this._perfilServicio.lista().subscribe({
        next: (resp) => {
          if(resp.status){
            this.dataListPerfil.data = resp.data;
          } else {
            this._utilidadServicio.mostrarAlerta('No se encontraron registros', '')
          }
        },
        error:(e) =>{}
      })
    }

    agregarPerfil(){
      this._dialog.open(
        DialogPerfilComponent, {
          disableClose:true,
        }
      ).afterClosed().subscribe(
        (resultado) => {
          if(resultado === 'true'){
            this.mostrarPerfiles();
          }
        }
      )
    }

    editarPerfil(perfil: Perfil){
      this._dialog.open(
        DialogPerfilComponent, {
          disableClose:true,
          data: perfil
        }
      ).afterClosed().subscribe(
        (resultado) => {
          if(resultado === 'true'){
            this.mostrarPerfiles();
          }
        }
      )
    }

    eliminarPerfil(perfil: Perfil){
      this._confirmServicio
      .confirmDialog({
        title: '¿Está usted seguro?',
        message: 'Se eliminará el perfil: ',
        datos: perfil.descripcion,
        confirmText: 'Si, eliminar',
        cancelText: 'No, volver',
      })
      .subscribe((resultado) => {
        if(resultado) {
          this._perfilServicio
          .eliminar(perfil.id)
          .subscribe(() => {
            this._utilidadServicio.mostrarAlerta('El usuario fue eliminado','')
            this.mostrarPerfiles();
          })
        } else {
          this._utilidadServicio.mostrarAlerta(
              'El perfil no fue eliminado',
              ''
            );
        }
      })
    }

    onTableAction(tableAction: TableActionsModel) {
      switch (tableAction.action) {
        case TABLE_ACTION.EDIT:
          this.editarPerfil(tableAction.element);
          break;
        case TABLE_ACTION.DELETE:
          this.eliminarPerfil(tableAction.element);
          break;
      }
    }

    aplicarFiltroTabla(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataListPerfil.filter = filterValue.trim().toLocaleLowerCase();
    }


}
