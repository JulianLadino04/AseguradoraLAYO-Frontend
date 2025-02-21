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
            const queryParams = { email: this.tokenService.getCorreo(), source: "Tu sesión se venció" };
            this.tokenService.logout();
            this.router.navigate(["/signin"], { replaceUrl: true, queryParams });
          }
        }
      });
    } else {
      this.router.navigate(["/signin"], { replaceUrl: true });
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(autoId: string): void {
    this.selectedAutoId = autoId;
  }

  // Método para eliminar un auto
  public eliminarAuto(autoId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este registro de auto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarAuto(autoId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El auto ha sido eliminado.',
              'success'
            );
            this.obtenerAutos();
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
      }
    });
  }
}
