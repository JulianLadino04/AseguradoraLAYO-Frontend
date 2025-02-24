import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-responsabilidad-civil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-responsabilidad-civil.component.html',
  styleUrls: ['./admin-responsabilidad-civil.component.css']
})
export class AdminResponsabilidadCivilComponent implements OnInit {
  responsabilidadCiviles: any[] = [];
  selectedResponsabilidadId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerResponsabilidades();
  }

  public getDate(datetime: string) {
    return new Date(datetime).toLocaleDateString();
  }

  public getTime(datetime: string) {
    return new Date(datetime).toLocaleTimeString();
  }

  // Método para listar las responsabilidades civiles
  public obtenerResponsabilidades(): void {
    if (this.tokenService.isLogged()) {
      this.administradorService.listarResponsabilidadCivil(this.tokenService.getToken() || "").subscribe({
        next: (data) => {
          if (!data.error) {
            this.responsabilidadCiviles = data.respuesta;
          } else {
            if (data.respuesta === "Sesión expirada" || data.respuesta === "Token inválido") {
              this.tokenService.logout("Debes iniciar sesión");
            } else {
              Swal.fire({
                title: 'Error',
                text: data.respuesta || 'Ocurrió un error inesperado',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        }
      });
    } else {
      this.tokenService.logout("Debes iniciar sesión");
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(responsabilidadId: string): void {
    this.selectedResponsabilidadId = this.selectedResponsabilidadId === responsabilidadId ? '' : responsabilidadId;
  }

  // Método para eliminar una responsabilidad civil
  public eliminarSeguro(): void {
    if (!this.selectedResponsabilidadId) {
      Swal.fire(
        'Error!',
        'Primero selecciona una fila',
        'error'
      );
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta responsabilidad civil!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = this.tokenService.getToken();
        if (token)
          this.administradorService.eliminarSeguro(this.selectedResponsabilidadId, token).subscribe({
            next: (response) => {
              if (!response.error) {
                Swal.fire(
                  'Eliminada!',
                  'La responsabilidad civil ha sido eliminada.',
                  'success'
                ).then(() => window.location.reload());
              } else {
                Swal.fire(
                  'Error!',
                  response.respuesta || 'Ocurrió un error al eliminar la responsabilidad civil.',
                  'error'
                );
              }
            },
            error: () => {
              Swal.fire(
                'Error!',
                'Ocurrió un error al eliminar la responsabilidad civil.',
                'error'
              );
            }
          });
        else this.tokenService.logout("Debes iniciar sesión");
      }
    });
  }
}
