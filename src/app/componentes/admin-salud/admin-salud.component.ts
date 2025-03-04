import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerSaluds();
  }

  // Método para listar los seguros de salud
  public obtenerSaluds(): void {
    this.administradorService.listarSalud().subscribe({
      next: (data) => {
        this.saluds = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar los seguros de salud:', err);
      }
    });
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(saludId: string): void {
    this.selectedSaludId = saludId;
  }

  // Método para eliminar un seguro de salud
  public eliminarSalud(saludId: string): void {
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
        this.administradorService.eliminarSalud(saludId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El seguro de salud ha sido eliminado.',
              'success'
            );
            this.obtenerSaluds();
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
      }
    });
  }
}
