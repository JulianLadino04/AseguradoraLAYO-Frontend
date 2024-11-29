import { Routes } from '@angular/router';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';
import { EnviarCodigoComponent } from './componentes/enviar-codigo/enviar-codigo.component';
import { CotizacionesAdminComponent } from './componentes/cotizaciones-admin/cotizaciones-admin.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
export const routes: Routes = [

{ path: '', component: LoginComponent },
{ path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },

{ path: 'activar-cuenta', component: ActivarCuentaComponent },
{ path: 'enviar-codigo', component: EnviarCodigoComponent },
{ path: 'cambiar-password', component: CambiarPasswordComponent },

{ path: 'pagina-principal', component: PaginaPrincipalComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },

{ path: 'cotizaciones-admin', component: CotizacionesAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: "**", pathMatch: "full", redirectTo: "" }
];
