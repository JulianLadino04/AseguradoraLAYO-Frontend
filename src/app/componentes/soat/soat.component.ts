import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearSoatDTO } from '../../dto/SoatDTOs/CrearSoatDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { TipoVehiculo } from '../../dto/Enums/TipoVehiculo';

@Component({
  selector: 'app-cotizacion-soat',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './soat.component.html',
  styleUrls: ['./soat.component.css']
})
export class SoatComponent {
  cotizacionSoatForm!: FormGroup;
  aseguradoras: Aseguradora[] = [];
  tiposVehiculo: TipoVehiculo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.crearFormulario();
    this.cargarEnums();
  }

  private cargarEnums(): void {
    this.clienteService.obtenerEnumsAseguradora().subscribe((response) => {
      this.aseguradoras = response.respuesta;
    });
    this.clienteService.obtenerEnumsTipoVehiculo().subscribe((response) => {
      this.tiposVehiculo = response.respuesta;
    });
  }

  private crearFormulario(): void {
    this.cotizacionSoatForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      tipo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[A-Za-z0-9]*$')]],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  public crearCotizacionSoat(): void {
    const cotizacionData = this.cotizacionSoatForm.value as CrearSoatDTO;

    for (let control in this.cotizacionSoatForm.controls) {
      if (this.cotizacionSoatForm.controls[control].value == null || this.cotizacionSoatForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    this.clienteService.crearCotizacionSoat(cotizacionData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización de SOAT creada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/seguros']); 
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta || 'Ocurrió un error inesperado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  public campoEsValido(campo: string): boolean {
    return this.cotizacionSoatForm.controls[campo].valid && this.cotizacionSoatForm.controls[campo].touched;
  }

  volver(): void {
    this.router.navigate(['/seguros']);
  }
}