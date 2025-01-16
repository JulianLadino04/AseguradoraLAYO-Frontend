import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionVidaDTO } from '../../dto/VidaDTOs/CrearCotizacionVidaDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';

@Component({
  selector: 'app-cotizacion-vida',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './vida.component.html',
  styleUrls: ['./vida.component.css']
})
export class VidaComponent {
  cotizacionVidaForm!: FormGroup;
  aseguradoras: Aseguradora[] = [];

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
  }

  private crearFormulario(): void {
    this.cotizacionVidaForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      ocupacion: ['', [Validators.required, Validators.maxLength(30)]],
      fechaNacimiento: ['', Validators.required]
    });
  }

  public crearCotizacionVida(): void {
    const cotizacionData = this.cotizacionVidaForm.value as CrearCotizacionVidaDTO;

    for (let control in this.cotizacionVidaForm.controls) {
      if (this.cotizacionVidaForm.controls[control].value == null || this.cotizacionVidaForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    this.clienteService.crearCotizacionVida(cotizacionData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización de seguro de vida creada correctamente',
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
    return this.cotizacionVidaForm.controls[campo].valid && this.cotizacionVidaForm.controls[campo].touched;
  }

  volver(): void {
    this.router.navigate(['/seguros']);
  }
}
