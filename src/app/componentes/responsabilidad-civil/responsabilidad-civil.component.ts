import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionResponsabilidadCivilDTO } from '../../dto/ResponsabillidadCivilDTOs/CrearCotizacionResponsabilidadCivilDTO'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';

@Component({
  selector: 'app-cotizacion-responsabilidad-civil',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './responsabilidad-civil.component.html',
  styleUrls: ['./responsabilidad-civil.component.css']
})
export class ResponsabilidadCivilComponent {
  cotizacionResponsabilidadCivilForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.cotizacionResponsabilidadCivilForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required],
      ocupacion: ['', [Validators.required, Validators.maxLength(50)]],
      ciudad: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  public crearCotizacionResponsabilidadCivil(): void {
    const cotizacionData = this.cotizacionResponsabilidadCivilForm.value as CrearCotizacionResponsabilidadCivilDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionResponsabilidadCivilForm.controls) {
      if (this.cotizacionResponsabilidadCivilForm.controls[control].value == null || this.cotizacionResponsabilidadCivilForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return; // Detener la ejecución si algún campo está vacío
      }
    }

    this.clienteService.crearCotizacionResponsabilidadCivil(cotizacionData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización de Responsabilidad Civil creada correctamente',
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
    return this.cotizacionResponsabilidadCivilForm.controls[campo].valid && this.cotizacionResponsabilidadCivilForm.controls[campo].touched;
  }

  volver(): void {
    this.router.navigate(['/seguros']);  // Ruta para volver a la página principal de seguros
  }
} 
