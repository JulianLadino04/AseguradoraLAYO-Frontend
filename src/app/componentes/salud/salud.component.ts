import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionSaludDTO } from '../../dto/SaludDTOs/CrearCotizacionSaludDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';

@Component({
  selector: 'app-cotizacion-salud',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.css']
})
export class SaludComponent {
  cotizacionSaludForm!: FormGroup;
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
    this.cotizacionSaludForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required]
    });
  }

  public crearCotizacionSalud(): void {
    const cotizacionData = this.cotizacionSaludForm.value as CrearCotizacionSaludDTO;

    for (let control in this.cotizacionSaludForm.controls) {
      if (this.cotizacionSaludForm.controls[control].value == null || this.cotizacionSaludForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    this.clienteService.crearCotizacionSalud(cotizacionData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización de Salud creada correctamente',
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
    return this.cotizacionSaludForm.controls[campo].valid && this.cotizacionSaludForm.controls[campo].touched;
  }

  volver(): void {
    this.router.navigate(['/seguros']);
  }
}
