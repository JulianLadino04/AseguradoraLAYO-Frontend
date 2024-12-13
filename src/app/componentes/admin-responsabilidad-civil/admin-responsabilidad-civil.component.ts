import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-responsabilidad-civil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-responsabilidad-civil.component.html',
  styleUrls: ['./admin-responsabilidad-civil.component.css']
})
export class AdminResponsabilidadCivilComponent implements OnInit {
  responsabilidadCiviles: any[] = [];
  selectedResponsabilidadId: string = "";

  constructor(
    private administradorService: AdministradorService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerResponsabilidades();
  }

  // Método para listar las responsabilidades civiles
  public obtenerResponsabilidades(): void {
    this.administradorService.listarResponsabilidadCivil().subscribe({
      next: (data) => {
        this.responsabilidadCiviles = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar las responsabilidades civiles:', err);
      }
    });
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(responsabilidadId: string): void {
    this.selectedResponsabilidadId = responsabilidadId;
  }

  // Método para eliminar una responsabilidad civil
  public eliminarResponsabilidadCivil(responsabilidadId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta responsabilidad civil!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarResponsabilidadCivil(responsabilidadId).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminada!',
              'La responsabilidad civil ha sido eliminada.',
              'success'
            );
            this.obtenerResponsabilidades();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar la responsabilidad civil.',
              'error'
            );
            console.error('Error al eliminar la responsabilidad civil:', err);
          }
        });
      }
    });
  }
}
