import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { MensajeDTO } from '../../dto/TokenDTOs/MensajeDTO';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerHogares();
  }

  // Método para listar los hogares
  public obtenerHogares(): void {
    this.administradorService.listarHogar().subscribe({
      next: (data) => {
        this.hogares = data.respuesta;
      },
      error: (err) => {
        console.error('Error al cargar los hogares:', err);
      }
    });
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
