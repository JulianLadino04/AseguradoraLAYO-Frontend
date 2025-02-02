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
      this.router.navigate(["/signin"]);
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(hogarId: string): void {
    this.selectedHogarId = hogarId;
  }

  // Método para eliminar un hogar
  public eliminarHogar(hogarId: string): void {
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
        this.administradorService.eliminarHogar(hogarId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El hogar ha sido eliminado.',
              'success'
            );
            this.obtenerHogares();
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
      }
    });
  }
}
