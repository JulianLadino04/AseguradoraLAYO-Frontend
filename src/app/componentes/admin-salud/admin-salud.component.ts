import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-salud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-salud.component.html',
  styleUrls: ['./admin-salud.component.css']
})
export class AdminSaludComponent implements OnInit {
  saluds: any[] = [];
  selectedSaludId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerSaluds();
  }

  public getDate(datetime: string) {
    return new Date(datetime).toLocaleDateString();
  }

  public getTime(datetime: string) {
    return new Date(datetime).toLocaleTimeString();
  }

  // Método para listar los seguros de salud
  public obtenerSaluds(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.administradorService.listarSalud(token).subscribe({
        next: (data) => {
          if (!data.error) {
            this.saluds = data.respuesta;
          } else {
            console.error('Error al cargar los seguros de salud:', data.respuesta);
          }
        }
      });
    } else {
      this.tokenService.logout("Debes iniciar sesión")
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(saludId: string): void {
    this.selectedSaludId = this.selectedSaludId === saludId ? '' : saludId;
  }

  // Método para eliminar un seguro de salud
  public eliminarSeguro(): void {
    if (!this.selectedSaludId) {
      Swal.fire(
        'Error!',
        'Primero selecciona una fila',
        'error'
      );
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este seguro de salud!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = this.tokenService.getToken();
        if (token)
          this.administradorService.eliminarSeguro(this.selectedSaludId, token).subscribe({
            next: (response) => {
              if (!response.error) {
                Swal.fire(
                  'Eliminado!',
                  'El seguro de salud ha sido eliminado.',
                  'success'
                ).then(() => window.location.reload());
              } else {
                Swal.fire(
                  'Error!',
                  response.respuesta || 'Ocurrió un error al eliminar el seguro de salud.',
                  'error'
                );
                console.error('Error al eliminar el seguro de salud:', response.respuesta);
              }
            },
            error: (err) => {
              Swal.fire(
                'Error!',
                'Ocurrió un error al eliminar el seguro de salud.',
                'error'
              );
              console.error('Error al eliminar el seguro de salud:', err);
            }
          });
        else this.tokenService.logout("Debes iniciar sesión");
      }
    });
  }
}
