import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-afiliaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-afiliaciones.component.html',
  styleUrls: ['./admin-afiliaciones.component.css']
})
export class AdminAfiliacionesComponent implements OnInit {
  afiliaciones: any[] = [];
  selectedAfiliacionId: string = "";

  constructor(
    private administradorService: AdministradorService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerAfiliaciones();
  }

  // Método para listar las afiliaciones
  public obtenerAfiliaciones(): void {
    this.administradorService.listarAfiliaciones().subscribe({
      next: (data) => {
        this.afiliaciones = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar las afiliaciones:', err);
      }
    });
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(afiliacionId: string): void {
    this.selectedAfiliacionId = afiliacionId;
  }

  // Método para eliminar una afiliación
  public eliminarAfiliacion(afiliacionId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta afiliación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarAfiliacion(afiliacionId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminada!',
              'La afiliación ha sido eliminada.',
              'success'
            );
            this.obtenerAfiliaciones();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar la afiliación.',
              'error'
            );
            console.error('Error al eliminar la afiliación:', err);
          }
        });
      }
    });
  }
}
