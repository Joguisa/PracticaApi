import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from '../interfaces/login';
import { LoginService } from '../services/login.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _loginServicio: LoginService,
    private _snackBar: SnackbarService
  ) {
    this.formularioLogin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  iniciarSesion() {
    this.mostrarLoading = true;
    const { usuario, clave } = this.formularioLogin.value;

    this._loginServicio.iniciarSesion(usuario, clave).subscribe({
      next: (resp) => {
        if(resp.status === 200) {
          this.router.navigate(['/home']);
        } else 
        this._snackBar.mostrarAlerta(
          'No se encontraron coincidencias',
          '!'
        );
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._snackBar.mostrarAlerta(
          'Hubo un error de autenticación',
          '!'
        );
      },
    })
  }
}
