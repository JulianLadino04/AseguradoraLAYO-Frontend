import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionHogarDTO } from '../../dto/HogarDTOs/CrearCotizacionHogarDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';

@Component({
  selector: 'app-hogar',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './hogar.component.html',
  styleUrl: './hogar.component.css'
})
export class HogarComponent {
  cotizacionHogarForm!: FormGroup;
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
      this.aseguradoras = response.respuesta;  // Asegúrate de que `respuesta` coincide con tu estructura de datos
    });
  }

  private crearFormulario(): void {
    this.cotizacionHogarForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required],
      valorComercial: ['', [Validators.required, Validators.min(0)]],
      valorElectrico: ['', [Validators.required, Validators.min(0)]],
      valorMuebles: ['', [Validators.required, Validators.min(0)]]
    });
  }

  public crearCotizacionHogar(): void {
    const cotizacionData = this.cotizacionHogarForm.value as CrearCotizacionHogarDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionHogarForm.controls) {
      if (this.cotizacionHogarForm.controls[control].value == null || this.cotizacionHogarForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return; // Detener la ejecución si algún campo está vacío
      }
    }

    this.clienteService.crearCotizacionHogar(cotizacionData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización de hogar creada correctamente',
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
    return this.cotizacionHogarForm.controls[campo].valid && this.cotizacionHogarForm.controls[campo].touched;
  }
  

  volver(): void {
    this.router.navigate(['/seguros']);  // Ruta para volver a la página principal de seguros
  }
}
