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
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { AlianzasComponent } from './componentes/alianzas/alianzas.component';
import { SegurosComponent } from './componentes/seguros/seguros.component';
import { AutosComponent } from './componentes/autos/autos.component';
import { HogarComponent } from './componentes/hogar/hogar.component';
import { ProteccionCreditoComponent } from './componentes/proteccion-credito/proteccion-credito.component';
import { PymeComponent } from './componentes/pyme/pyme.component';

export const routes: Routes = [

//Publico
{ path: '', component: LoginComponent },
{ path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
{ path: 'activar-cuenta', component: ActivarCuentaComponent },
{ path: 'enviar-codigo', component: EnviarCodigoComponent },
{ path: 'cambiar-password', component: CambiarPasswordComponent },

//Cliente
{ path: 'pagina-principal', component: PaginaPrincipalComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'seguros', component: SegurosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'nosotros', component: NosotrosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'alianzas', component: AlianzasComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'contactenos', component: ContactenosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'autos', component: AutosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'hogar', component: HogarComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'proteccion-credito', component: ProteccionCreditoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'pyme', component: PymeComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },

//Administrador
{ path: 'cotizaciones-admin', component: CotizacionesAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: "**", pathMatch: "full", redirectTo: "" }
];
