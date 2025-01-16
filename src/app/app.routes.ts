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
import { ResponsabilidadCivilComponent } from './componentes/responsabilidad-civil/responsabilidad-civil.component';
import { SaludComponent } from './componentes/salud/salud.component';
import { SoatComponent } from './componentes/soat/soat.component';
import { VidaComponent } from './componentes/vida/vida.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AdminAutosComponent } from './componentes/admin-autos/admin-autos.component';
import { AdminHogarComponent } from './componentes/admin-hogar/admin-hogar.component';
import { AdminProteccionCreditoComponent } from './componentes/admin-proteccion-credito/admin-proteccion-credito.component';
import { AdminPymeComponent } from './componentes/admin-pyme/admin-pyme.component';
import { AdminResponsabilidadCivilComponent } from './componentes/admin-responsabilidad-civil/admin-responsabilidad-civil.component';
import { AdminSaludComponent } from './componentes/admin-salud/admin-salud.component';
import { AdminSoatComponent } from './componentes/admin-soat/admin-soat.component';
import { AdminVidaComponent } from './componentes/admin-vida/admin-vida.component';
import { AdminPeticionComponent } from './componentes/admin-peticion/admin-peticion.component';
import { AfiliacionesTrasladosComponent } from './componentes/afiliaciones-traslados/afiliaciones-traslados.component';
import { AdminAfiliacionesComponent } from './componentes/admin-afiliaciones/admin-afiliaciones.component';


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
{ path: 'salud', component: SaludComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'responsabilidad-civil', component: ResponsabilidadCivilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'soat', component: SoatComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'vida', component: VidaComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'perfil', component: PerfilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },
{ path: 'afiliaciones-traslados', component: AfiliacionesTrasladosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }  },



//Administrador
{ path: 'cotizaciones-admin', component: CotizacionesAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-autos', component: AdminAutosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-hogar', component: AdminHogarComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-proteccion-credito', component: AdminProteccionCreditoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-pyme', component: AdminPymeComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-responsabilidad-civil', component: AdminResponsabilidadCivilComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-vida', component: AdminVidaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-salud', component: AdminSaludComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-soat', component: AdminSoatComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-peticion', component: AdminPeticionComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
{ path: 'admin-afiliaciones', component: AdminAfiliacionesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },


{ path: "**", pathMatch: "full", redirectTo: "" }
];
