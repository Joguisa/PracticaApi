import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DialogUsuarioComponent } from './dialogs/dialog-usuario/dialog-usuario.component';
import { DialogPerfilComponent } from './dialogs/dialog-perfil/dialog-perfil.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsfatherModule } from '../shared/components/componentsfather.module';

@NgModule({
  declarations: [
    PerfilesComponent,
    UsuariosComponent,
    DialogUsuarioComponent,
    DialogPerfilComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MaterialModule,
    SharedModule,
    ComponentsfatherModule
  ],
})
export class ComponentsModule {}
