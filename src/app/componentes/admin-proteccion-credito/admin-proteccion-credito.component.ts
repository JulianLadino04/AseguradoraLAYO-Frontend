import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-proteccion-credito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-proteccion-credito.component.html',
  styleUrls: ['./admin-proteccion-credito.component.css']
})
export class AdminProteccionCreditoComponent implements OnInit {
  proteccionesCredito: any[] = [];
  selectedProteccionCreditoId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerProteccionesCredito();
  }

  // Método para listar las protecciones de crédito
  public obtenerProteccionesCredito(): void {
    if (this.tokenService.isLogged()) {
      this.administradorService.listarProteccionCredito(this.tokenService.getToken() || "").subscribe({
        next: (data) => {
          if (!data.error) {
            this.proteccionesCredito = data.respuesta;
          } else {
            console.error('Error al cargar las protecciones de crédito:', data.respuesta);
          }
        }
      });
    } else {
      this.router.navigate(["/signin"], { replaceUrl: true });
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(proteccionCreditoId: string): void {
    this.selectedProteccionCreditoId = proteccionCreditoId;
  }

  // Método para eliminar una protección de crédito
  public eliminarProteccionCredito(proteccionCreditoId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar este registro de protección de crédito!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarProteccionCredito(proteccionCreditoId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminada!',
              'La protección de crédito ha sido eliminada.',
              'success'
            );
            this.obtenerProteccionesCredito();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar la protección de crédito.',
              'error'
            );
            console.error('Error al eliminar la protección de crédito:', err);
          }
        });
      }
    });
  }
}
