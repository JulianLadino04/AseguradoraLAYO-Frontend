import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { MensajeDTO } from '../../dto/TokenDTOs/MensajeDTO';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerAutos();
  }

  // Método para listar los autos
  public obtenerAutos(): void {
    this.administradorService.listarAutos().subscribe({
      next: (data) => {
        this.autos = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar los autos:', err);
      }
    });
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
