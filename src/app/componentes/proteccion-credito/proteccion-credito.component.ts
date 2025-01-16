import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionProteccionCreditoDTO } from '../../dto/ProteccionCreditoDTOs/CrearCotizacionProteccionCreditoDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';

@Component({
  selector: 'app-proteccion-credito',
  standalone: true,
  imports: [ReactiveFormsModule],  
  templateUrl: './proteccion-credito.component.html',
  styleUrls: ['./proteccion-credito.component.css']
})
export class ProteccionCreditoComponent {
  proteccionCreditoForm!: FormGroup;
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
    this.proteccionCreditoForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaNacimiento: ['', Validators.required],
      valorDeuda: ['', [Validators.required, Validators.min(0)]]
    });
  }

  public crearProteccionCredito(): void {
    const proteccionCreditoData = this.proteccionCreditoForm.value as CrearCotizacionProteccionCreditoDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.proteccionCreditoForm.controls) {
      if (this.proteccionCreditoForm.controls[control].value == null || this.proteccionCreditoForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return; // Detener la ejecución si algún campo está vacío
      }
    }

    this.clienteService.crearCotizacionProteccionCredito(proteccionCreditoData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Protección de crédito creada correctamente',
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
    return this.proteccionCreditoForm.controls[campo].valid && this.proteccionCreditoForm.controls[campo].touched;
  }

  volver(): void {
    this.router.navigate(['/seguros']);  // Ruta para volver a la página principal de seguros
  }
}
