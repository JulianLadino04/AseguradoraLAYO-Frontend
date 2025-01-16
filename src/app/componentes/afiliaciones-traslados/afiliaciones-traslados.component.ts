import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service'; // Asegúrate de tener el servicio en la ruta correcta
import { CrearAfiliacionDTO } from '../../dto/AfiliacionesDTOs/CrearAfiliacionDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afiliaciones-traslados',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './afiliaciones-traslados.component.html',
  styleUrls: ['./afiliaciones-traslados.component.css']
})
export class AfiliacionesTrasladosComponent {
  afiliacionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.afiliacionForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  // Método para crear una nueva afiliación
  public crearAfiliacion(): void {
    if (this.afiliacionForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Obligatorios',
        text: 'Por favor, complete todos los campos correctamente.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const afiliacionData: CrearAfiliacionDTO = this.afiliacionForm.value;

    this.clienteService.crearAfiliacion(afiliacionData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Afiliación creada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/home']); // Redirigir a una página después de crear la afiliación
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

  // Método para verificar si un campo es válido
  public campoEsValido(campo: string): boolean {
    return this.afiliacionForm.controls[campo].valid && this.afiliacionForm.controls[campo].touched;
  }

  // Método para volver a la página principal
  public volver(): void {
    this.router.navigate(['/pagina-principal']); // Redirigir a la página principal
  }
}
