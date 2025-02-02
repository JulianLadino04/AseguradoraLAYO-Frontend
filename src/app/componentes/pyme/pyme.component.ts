import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionPymeDTO } from '../../dto/PymeDTOs/CrearCotizacionPymeDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { TipoInmueble } from '../../dto/Enums/TipoInmueble';

@Component({
  selector: 'app-cotizacion-pyme',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './pyme.component.html',
  styleUrls: ['./pyme.component.css']
})
export class PymeComponent {
  cotizacionPymeForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
  tiposInmuebles: string[] = Object.keys(TipoInmueble);

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.cotizacionPymeForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required],
      valorMercancia: ['', [Validators.required, Validators.min(0)]],
      valorMaquinaria: ['', [Validators.required, Validators.min(0)]],
      valorComercial: ['', [Validators.required, Validators.min(0)]],
      valorElectrico: ['', [Validators.required, Validators.min(0)]],
      valorMuebles: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required]
    });
  }

  public crearCotizacionPyme(): void {
    const cotizacionPymeData = this.cotizacionPymeForm.value as CrearCotizacionPymeDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionPymeForm.controls) {
      if (this.cotizacionPymeForm.controls[control].value == null || this.cotizacionPymeForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return; // Detener la ejecución si algún campo está vacío
      }
    }

    this.clienteService.crearCotizacionPyme(cotizacionPymeData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización Pyme creada correctamente',
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
    return this.cotizacionPymeForm.controls[campo].valid && this.cotizacionPymeForm.controls[campo].touched;
  }

  volver(): void {
    this.router.navigate(['/seguros']);  // Ruta para volver a la página principal de seguros
  }
}
