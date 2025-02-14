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
      tipo: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.maxLength(300)]],
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
    const token = this.tokenService.getToken();

    if (token) {
      this.clienteService.crearAfiliacion(afiliacionData, token).subscribe({
        next: (respuesta) => {
          console.log({ respuesta });
          if (!respuesta.error) {
            Swal.fire({
              title: 'Éxito',
              text: respuesta.respuesta,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/home']); // Redirigir a una página después de crear la afiliación
            });
          } else {
            if (respuesta.respuesta === "Token inválido" || respuesta.respuesta === "Sesión expirada")
              this.tokenService.logout("Tu sesión ha expirado");
            else
              Swal.fire({
                title: 'Error',
                text: respuesta.respuesta || 'Ocurrió un error inesperado',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
          }
        }
      });
    } else {
      Swal.fire({
        title: 'Error de autenticación',
        text: 'Por favor, inicia sesión y vuelve a intentarlo',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
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
