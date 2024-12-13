import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-soat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-soat.component.html',
  styleUrls: ['./admin-soat.component.css']
})
export class AdminSoatComponent implements OnInit {
  soats: any[] = [];
  selectedPlaca: string = "";

  constructor(
    private administradorService: AdministradorService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerSoats();
  }

  // Método para listar los SOAT
  public obtenerSoats(): void {
    this.administradorService.listarSoat().subscribe({
      next: (data) => {
        this.soats = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar los SOAT:', err);
      }
    });
  }

  // Método para seleccionar una fila de la tabla
  public selectRow(placa: string): void {
    this.selectedPlaca = placa;
  }

  // Método para eliminar un SOAT
  public eliminarSoat(placa: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este registro de SOAT!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.administradorService.eliminarSoat(placa).subscribe({
          next: (response) => {
            Swal.fire(
              'Eliminado!',
              'El SOAT ha sido eliminado.',
              'success'
            );
            this.obtenerSoats();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar el SOAT.',
              'error'
            );
            console.error('Error al eliminar el SOAT:', err);
          }
        });
      }
    });
  }
}
