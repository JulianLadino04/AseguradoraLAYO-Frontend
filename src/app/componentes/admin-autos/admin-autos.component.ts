import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-autos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-autos.component.html',
  styleUrls: ['./admin-autos.component.css']
})
export class AdminAutosComponent implements OnInit {
  autos: any[] = [];
  selectedAutoId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerAutos();
  }

  public getDate(datetime: string) {
    return new Date(datetime).toLocaleDateString();
  }

  public getTime(datetime: string) {
    return new Date(datetime).toLocaleTimeString();
  }
  // Método para listar los autos
  public obtenerAutos(): void {
    if (this.tokenService.isLogged()) {
      this.administradorService.listarAutos(this.tokenService.getToken() || "").subscribe({
        next: (data) => {
          if (!data.error) {
            this.autos = data.respuesta;
          } else {
            this.tokenService.logout("Tu sesión se venció");
          }
        }
      });
    } else {
      this.tokenService.logout("Debes iniciar sesión");
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(autoId: string): void {
    this.selectedAutoId = this.selectedAutoId === autoId ? '' : autoId;
  }

  // Método para eliminar un auto
  public eliminarSeguro(): void {
    if (!this.selectedAutoId) {
      Swal.fire(
        'Error!',
        'Primero selecciona una fila',
        'error'
      );
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este registro de auto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      //this.selectedAutoId
      if (result.isConfirmed) {
        const token = this.tokenService.getToken();
        if (token)
          this.administradorService.eliminarSeguro(this.selectedAutoId, token).subscribe({
            next: (response) => {
              if (!response.error) {
                Swal.fire(
                  'Eliminado!',
                  'El auto ha sido eliminado.',
                  'success'
                ).then(() => window.location.reload())
              } else {
                Swal.fire(
                  'Error!',
                  response.respuesta || 'Ocurrió un error al eliminar el seguro de auto.',
                  'error'
                );
                console.error('Error al eliminar el auto:', response.respuesta);
              }
            },
            error: (err) => {
              Swal.fire(
                'Error!',
                'Ocurrió un error al eliminar el auto.',
                'error'
              );
              console.error('Error al eliminar el auto:', err);
            }
          });
        else this.tokenService.logout("Debes iniciar sesión");
      }
    });
  }
}
