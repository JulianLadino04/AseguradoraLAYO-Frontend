import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-hogar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-hogar.component.html',
  styleUrls: ['./admin-hogar.component.css']
})
export class AdminHogarComponent implements OnInit {
  hogares: any[] = [];
  selectedHogarId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerHogares();
  }

  public getDate(datetime: string) {
    return new Date(datetime).toLocaleDateString();
  }

  public getTime(datetime: string) {
    return new Date(datetime).toLocaleTimeString();
  }

  // Método para listar los hogares
  public obtenerHogares(): void {
    if (this.tokenService.isLogged()) {
      this.administradorService.listarHogar(this.tokenService.getToken() || "").subscribe({
        next: (data) => {
          if (!data.error) {
            this.hogares = data.respuesta;
          } else {
            console.error('Error al cargar los autos:', data.respuesta);
          }
        }
      });
    } else {
      this.router.navigate(["/signin"], { replaceUrl: true });
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(hogarId: string): void {
    this.selectedHogarId = this.selectedHogarId === hogarId ? '' : hogarId;
  }

  // Método para eliminar un hogar
  public eliminarSeguro(): void {
    if (!this.selectedHogarId) {
      Swal.fire(
        'Error!',
        'Primero selecciona una fila',
        'error'
      );
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este registro de hogar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = this.tokenService.getToken();
        if (token)
          this.administradorService.eliminarSeguro(this.selectedHogarId, token).subscribe({
            next: (response) => {
              if (!response.error) {
                Swal.fire(
                  'Eliminado!',
                  'El hogar ha sido eliminado.',
                  'success'
                ).then(() => window.location.reload())
              } else {
                Swal.fire(
                  'Error!',
                  response.respuesta || 'Ocurrió un error al eliminar el hogar.',
                  'error'
                );
                console.error('Error al eliminar el hogar:', response.respuesta);
              }
            },
            error: (err) => {
              Swal.fire(
                'Error!',
                'Ocurrió un error al eliminar el hogar.',
                'error'
              );
              console.error('Error al eliminar el hogar:', err);
            }
          });
        else this.tokenService.logout("Debes iniciar sesión");
      }
    });
  }
}
