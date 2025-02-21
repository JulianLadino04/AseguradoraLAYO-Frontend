import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-vida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-vida.component.html',
  styleUrls: ['./admin-vida.component.css']
})
export class AdminVidaComponent implements OnInit {
  vidas: any[] = [];
  selectedVidaId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerVidas();
  }

  public getDate(datetime: string) {
    return new Date(datetime).toLocaleDateString();
  }

  public getTime(datetime: string) {
    return new Date(datetime).toLocaleTimeString();
  }

  // Método para listar los seguros de vida
  public obtenerVidas(): void {
    if (this.tokenService.isLogged()) {
      this.administradorService.listarVida(this.tokenService.getToken() || "").subscribe({
        next: (data) => {
          if (!data.error) {
            this.vidas = data.respuesta;
          } else {
            console.error('Error al cargar los seguros de vida:', data.respuesta);
          }
        }
      });
    } else {
      this.tokenService.logout("Debes iniciar sesión");
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(vidaId: string): void {
    this.selectedVidaId = vidaId;
  }

  // Método para eliminar un seguro de vida
  public eliminarVida(vidaId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este seguro de vida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarVida(vidaId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El seguro de vida ha sido eliminado.',
              'success'
            );
            this.obtenerVidas();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar el seguro de vida.',
              'error'
            );
            console.error('Error al eliminar el seguro de vida:', err);
          }
        });
      }
    });
  }
}
