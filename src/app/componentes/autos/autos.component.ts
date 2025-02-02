import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import Swal from 'sweetalert2';
import { CrearCotizacionAutoDTO } from '../../dto/AutoDTOs/CrearCotizacionAutoDTO';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { TipoVehiculo } from '../../dto/Enums/TipoVehiculo';
import { ClienteService } from '../../servicios/cliente.service';
import { AdminAutosComponent } from "../admin-autos/admin-autos.component";

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AdminAutosComponent, CommonModule],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {

  cotizacionAutoForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
  tiposVehiculo: TipoVehiculo[] = [];
  isChecked: boolean = false;
  btnText: string = "Solicitar Cotización";

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router, private location: Location) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.cotizacionAutoForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      placa: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(30)]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      ciudadCirculacion: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  toggleShowing() {
    this.isChecked = !this.isChecked;
    this.btnText = this.isChecked ? "Ocultar" : "Solicitar Cotización";
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
    this.location.back();
  }
}
