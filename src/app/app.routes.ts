import { Routes } from '@angular/router';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import {
    LoginComponent, RegistroComponent, CotizacionesAdminComponent,
    PaginaPrincipalComponent, ContactenosComponent, NosotrosComponent,
    AlianzasComponent, SegurosComponent, AutosComponent,
    HogarComponent, ProteccionCreditoComponent, PymeComponent,
    ResponsabilidadCivilComponent, SaludComponent, SoatComponent,
    VidaComponent, PerfilComponent, AdminAutosComponent,
    AdminHogarComponent, AdminProteccionCreditoComponent, AdminPymeComponent,
    AdminResponsabilidadCivilComponent, AdminSaludComponent, AdminSoatComponent,
    AdminVidaComponent, AdminPeticionComponent, AdminAfiliacionesComponent,
    AfiliacionesTrasladosComponent
} from './componentes'

export const routes: Routes = [

    //Publico
    { path: '', component: PaginaPrincipalComponent },
    { path: 'signin', component: LoginComponent, canActivate: [LoginGuard]  },
    { path: 'signup', component: RegistroComponent, canActivate: [LoginGuard] },

    //Cliente
    { path: 'seguros', component: SegurosComponent},
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'alianzas', component: AlianzasComponent },
    { path: 'contactenos', component: ContactenosComponent},
    { path: 'autos', component: AutosComponent},
    { path: 'hogar', component: HogarComponent},
    { path: 'proteccion-credito', component: ProteccionCreditoComponent},
    { path: 'pyme', component: PymeComponent},
    { path: 'salud', component: SaludComponent},
    { path: 'responsabilidad-civil', component: ResponsabilidadCivilComponent},
    { path: 'soat', component: SoatComponent},
    { path: 'vida', component: VidaComponent},
    { path: 'perfil', component: PerfilComponent, canActivate: [RolesGuard] },
    { path: 'afiliaciones-traslados', component: AfiliacionesTrasladosComponent, canActivate: [RolesGuard] },

    //Administrador
    { path: 'cotizaciones-admin', component: CotizacionesAdminComponent, canActivate: [RolesGuard] },
    { path: 'admin-hogar', component: AdminHogarComponent, canActivate: [RolesGuard] },
    { path: 'admin-proteccion-credito', component: AdminProteccionCreditoComponent, canActivate: [RolesGuard] },
    { path: 'admin-pyme', component: AdminPymeComponent, canActivate: [RolesGuard] },
    { path: 'admin-responsabilidad-civil', component: AdminResponsabilidadCivilComponent, canActivate: [RolesGuard] },
    { path: 'admin-vida', component: AdminVidaComponent, canActivate: [RolesGuard] },
    { path: 'admin-salud', component: AdminSaludComponent, canActivate: [RolesGuard] },
    { path: 'admin-soat', component: AdminSoatComponent, canActivate: [RolesGuard] },
    { path: 'admin-peticion', component: AdminPeticionComponent, canActivate: [RolesGuard] },
    { path: 'admin-afiliaciones', component: AdminAfiliacionesComponent, canActivate: [RolesGuard] },


    { path: "**", pathMatch: "full", redirectTo: "" }
];
