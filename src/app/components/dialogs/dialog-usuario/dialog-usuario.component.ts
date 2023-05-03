import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent implements OnInit {
  formularioUsuario:FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";

  constructor(private dialog: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private _usuarioServicio: UsuariosService,
    private _utilidadServicio: SnackbarService
    ){
      this.formularioUsuario = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        usuario: ['', Validators.required],
        correo: ['', Validators.required],
        clave: ['', Validators.required],
      });
      if(this.datosUsuario != null){

        this.tituloAccion = "Editar";
        this.botonAccion = "Actualizar";
      }
    }

    ngOnInit(): void {
      if(this.datosUsuario != null){
        this.formularioUsuario.patchValue({
          nombre: this.datosUsuario.nombre,
          apellido: this.datosUsuario.apellido,
          usuario: this.datosUsuario.usuario,
          correo: this.datosUsuario.correo,
          clave: this.datosUsuario.clave
        })
      }
    }

    guardarEditarUsuario(){
      const _usuario: Usuario = {
        id : this.datosUsuario == null ? 0 : this.datosUsuario.id,
        nombre : this.formularioUsuario.value.nombre,
        apellido : this.formularioUsuario.value.apellido,
        usuario : this.formularioUsuario.value.usuario,
        correo : this.formularioUsuario.value.correo,
        clave : this.formularioUsuario.value.clave
      }

      if(this.datosUsuario == null){
        this._usuarioServicio.guardar(_usuario).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta('El usuario fue registrado', '');
              this.dialog.close("true")
            }else 
              this._utilidadServicio.mostrarAlerta('El usuario fue registrado', 'Error');
          },
          error: (e) => {}
        })
      } else {
        this._usuarioServicio.editar(_usuario, _usuario.id).subscribe({
          next: (data) =>{
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El usuario fue editado","Exito");
              this.dialog.close("true")
            }else
              this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario","Error")
          },
          error:(e) => {}
        })
      }
    }

}
