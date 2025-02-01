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
    AdminVidaComponent, AdminPeticionComponent, AfiliacionesTrasladosComponent,
    AdminAfiliacionesComponent
} from './componentes'

export const routes: Routes = [

    //Publico
    { path: '', component: PaginaPrincipalComponent },
    { path: 'signin', component: LoginComponent, canActivate: [LoginGuard]  },
    { path: 'signup', component: RegistroComponent, canActivate: [LoginGuard] },

    //Cliente
    { path: 'seguros', component: SegurosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'nosotros', component: NosotrosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'alianzas', component: AlianzasComponent },
    { path: 'contactenos', component: ContactenosComponent},
    { path: 'autos', component: AutosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'hogar', component: HogarComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'proteccion-credito', component: ProteccionCreditoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'pyme', component: PymeComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'salud', component: SaludComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'responsabilidad-civil', component: ResponsabilidadCivilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'soat', component: SoatComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'vida', component: VidaComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'perfil', component: PerfilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
    { path: 'afiliaciones-traslados', component: AfiliacionesTrasladosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },



    //Administrador
    { path: 'cotizaciones-admin', component: CotizacionesAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-autos', component: AdminAutosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-hogar', component: AdminHogarComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-proteccion-credito', component: AdminProteccionCreditoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-pyme', component: AdminPymeComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-responsabilidad-civil', component: AdminResponsabilidadCivilComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-vida', component: AdminVidaComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-salud', component: AdminSaludComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-soat', component: AdminSoatComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-peticion', component: AdminPeticionComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
    { path: 'admin-afiliaciones', component: AdminAfiliacionesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },


    { path: "**", pathMatch: "full", redirectTo: "" }
];
