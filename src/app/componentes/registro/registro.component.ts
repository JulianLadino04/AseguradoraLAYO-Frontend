import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { CrearCuentaDTO } from '../../dto/CuentaDTOs/CrearCuentaDTO';
import Swal from 'sweetalert2';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] // Cambiado styleUrl a styleUrls
})
export class RegistroComponent {
  @Input() mostrarElementos: boolean = true;
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private publicoService: PublicoService, private route: ActivatedRoute, private location: Location) {
    this.crearFormulario();
    this.cargarEmailUrl();
  }

  private cargarEmailUrl() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.registroForm.patchValue({ email: params['email'] });
      }
    });
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(35)]],
      birthDate: ['', [Validators.required]] // Agrega el campo para confirmar contraseña
    });
  }

  public registrar() {
    const crearCuenta = this.registroForm.value as CrearCuentaDTO;

    this.publicoService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        if (!data.error) {
          Swal.fire({
            title: 'Cuenta creada',
            text: 'La cuenta se ha creado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/signin']);
        } else {
          Swal.fire({
            title: 'Error',
            text: data.respuesta,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    });
  }

  public volver() {
    this.location.back();
  }

  get labels() {
    return this.mostrarElementos ? {} : { 'color': '#fff' }; // Ejemplo
  }
  get rootComp() {
    return this.mostrarElementos ? {} : { 'background-color': '#000', 'padding': '20px' }; // Ejemplo
  }
}
