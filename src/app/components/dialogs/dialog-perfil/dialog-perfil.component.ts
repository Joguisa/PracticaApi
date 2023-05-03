import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Perfil } from '../../interfaces/perfil';
import { PerfilesService } from '../../services/perfiles.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-dialog-perfil',
  templateUrl: './dialog-perfil.component.html',
  styleUrls: ['./dialog-perfil.component.css']
})
export class DialogPerfilComponent implements OnInit {
  formularioPerfil:FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  

  constructor(private dialog: MatDialogRef<DialogPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public datosPerfil: Perfil,
    private fb: FormBuilder,
    private _perfilServicio: PerfilesService,
    private _utilidadServicio: SnackbarService
    ){
      this.formularioPerfil = this.fb.group({
        descripcion: ['', Validators.required],
      });
      if(this.datosPerfil != null){

        this.tituloAccion = "Editar";
        this.botonAccion = "Actualizar";
      }
    }

    ngOnInit(): void {
      if(this.datosPerfil != null){
        this.formularioPerfil.patchValue({
          descripcion: this.datosPerfil.descripcion
        })
      }
    }

    guardarEditarPerfil(){
      const _perfil : Perfil = {
        id : this.datosPerfil == null ? 0 : this.datosPerfil.id,
        descripcion : this.formularioPerfil.value.descripcion
      }

      if(this.datosPerfil == null){
        this._perfilServicio.guardar(_perfil).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta('El perfil fue registrado', '');
              this.dialog.close("true")
            }else 
              this._utilidadServicio.mostrarAlerta('El perfil fue registrado', 'Error');
          },
          error: (e) => {}
        })
      } else {
        this._perfilServicio.editar(_perfil, _perfil.id).subscribe({
          next: (data) =>{
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El perfil fue editado","Exito");
              this.dialog.close("true")
            }else
              this._utilidadServicio.mostrarAlerta("No se pudo editar el perfil","Error")
          },
          error:(e) => {}
        })
      }
    }


}
