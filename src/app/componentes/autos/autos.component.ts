import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionAutoDTO } from '../../dto/AutoDTOs/CrearCotizacionAutoDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Importa el Router
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { TipoVehiculo } from '../../dto/Enums/TipoVehiculo';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {

  cotizacionAutoForm!: FormGroup;
  aseguradoras: Aseguradora[] = [];
  tiposVehiculo: TipoVehiculo[] = [];

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router) {
    this.crearFormulario();
    this.cargarEnums();
  }

  private cargarEnums(): void {
    this.clienteService.obtenerEnumsAseguradora().subscribe((response) => {
      this.aseguradoras = response.respuesta;  // Accede a la propiedad `data`
    });
  
    this.clienteService.obtenerEnumsTipoVehiculo().subscribe((response) => {
      this.tiposVehiculo = response.respuesta;  // Accede a la propiedad `data`
    });
  }

  private crearFormulario() {
    this.cotizacionAutoForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      placa: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(30)]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      ciudadCirculacion: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }
  

  public crearCotizacionAuto() {
    const cotizacionData = this.cotizacionAutoForm.value as CrearCotizacionAutoDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionAutoForm.controls) {
      if (this.cotizacionAutoForm.controls[control].value == null || this.cotizacionAutoForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return; // Detener la ejecución si algún campo está vacío
      }
    }
  
    this.clienteService.crearCotizacionAuto(cotizacionData).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Cotización creada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/seguros']); // Reemplaza con tu ruta específica
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  public campoEsValido(campo: string): boolean {
    return this.cotizacionAutoForm.controls[campo].valid && this.cotizacionAutoForm.controls[campo].touched;
  }

  volver() {
    // Redirige a la página de seguros
    this.router.navigate(['/seguros']);
  }
}
