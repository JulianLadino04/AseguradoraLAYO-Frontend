import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-peticion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-peticion.component.html',
  styleUrls: ['./admin-peticion.component.css']
})
export class AdminPeticionComponent implements OnInit {
  peticiones: any[] = [];
  selectedPeticionId: string = "";

  constructor(
    private administradorService: AdministradorService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPeticiones();
  }

  // Método para listar las peticiones
  public obtenerPeticiones(): void {
    this.administradorService.listarPeticiones().subscribe({
      next: (data) => {
        this.peticiones = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar las peticiones:', err);
      }
    });
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(peticionId: string): void {
    this.selectedPeticionId = peticionId;
  }

  // Método para eliminar una petición
  public eliminarPeticion(peticionId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta petición!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarPeticion(peticionId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminada!',
              'La petición ha sido eliminada.',
              'success'
            );
            this.obtenerPeticiones();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar la petición.',
              'error'
            );
            console.error('Error al eliminar la petición:', err);
          }
        });
      }
    });
  }
}
