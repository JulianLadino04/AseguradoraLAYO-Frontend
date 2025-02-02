import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-admin-pyme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pyme.component.html',
  styleUrls: ['./admin-pyme.component.css']
})
export class AdminPymeComponent implements OnInit {
  pymes: any[] = [];
  selectedPymeId: string = "";

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerPymes();
  }

  // Método para listar las pymes
  public obtenerPymes(): void {

    if (this.tokenService.isLogged()) {
      this.administradorService.listarPyme(this.tokenService.getToken() || "").subscribe({
        next: (data) => {
          if (!data.error) {
            this.pymes = data.respuesta;
          } else {
            console.error('Error al cargar las pymes:', data.respuesta);
          }
        }
      });
    } else {
      this.router.navigate(["/signin"]);
    }
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(pymeId: string): void {
    this.selectedPymeId = pymeId;
  }

  // Método para eliminar una pyme
  public eliminarPyme(pymeId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta pyme!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarPyme(pymeId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminada!',
              'La pyme ha sido eliminada.',
              'success'
            );
            this.obtenerPymes();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar la pyme.',
              'error'
            );
            console.error('Error al eliminar la pyme:', err);
          }
        });
      }
    });
  }
}
