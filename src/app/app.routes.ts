import { Routes } from '@angular/router';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import {
    LoginComponent, RegistroComponent,
    PaginaPrincipalComponent, ContactenosComponent, NosotrosComponent,
    AlianzasComponent, SegurosComponent, AutosComponent,
    HogarComponent, ProteccionCreditoComponent, PymeComponent,
    ResponsabilidadCivilComponent, SaludComponent, SoatComponent,
    VidaComponent, PerfilComponent, AdminPeticionComponent, AdminAfiliacionesComponent,
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
    { path: 'admin-peticion', component: AdminPeticionComponent, canActivate: [RolesGuard] },
    { path: 'admin-afiliaciones', component: AdminAfiliacionesComponent, canActivate: [RolesGuard] },


    { path: "**", pathMatch: "full", redirectTo: "" }
];
