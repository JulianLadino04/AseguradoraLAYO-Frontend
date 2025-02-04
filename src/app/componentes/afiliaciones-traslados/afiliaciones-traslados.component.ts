import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service'; // Asegúrate de tener el servicio en la ruta correcta
import { CrearAfiliacionDTO } from '../../dto/AfiliacionesDTOs/CrearAfiliacionDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-afiliaciones-traslados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './afiliaciones-traslados.component.html',
  styleUrls: ['./afiliaciones-traslados.component.css']
})
export class AfiliacionesTrasladosComponent {
  afiliacionForm!: FormGroup;
  email: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.afiliacionForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      type: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(300)]],
    });

  }

  ngOnInit() {
    this.tokenService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.email = isLoggedIn ? this.tokenService.getCorreo() : "";
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
